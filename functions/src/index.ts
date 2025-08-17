/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions/v2";
import * as logger from "firebase-functions/logger";
import {onDocumentWritten} from "firebase-functions/v2/firestore";
import {onRequest} from "firebase-functions/v2/https";
import {onSchedule} from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import {CloudTasksClient} from "@google-cloud/tasks";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// -----------------------------------------------------------------------------
// Cloud Tasks Configuration
// -----------------------------------------------------------------------------
const PROJECT_ID = "shipping-battlefield";
const QUEUE_LOCATION = "asia-south1";
const QUEUE_ID = "shipment-go-live-queue";

// This must be a service account with Cloud Tasks Enqueuer role
const SERVICE_ACCOUNT_EMAIL =
    `cloud-tasks-invoker@${PROJECT_ID}.iam.gserviceaccount.com`;

const tasksClient = new CloudTasksClient();

// Limit concurrent container instances
setGlobalOptions({maxInstances: 10});

/**
 * Creates or updates a Cloud Task to trigger a shipment go-live event.
 * This function is triggered whenever a document in the 'shipments'
 * collection is written to (created or updated).
 */
export const onShipmentWrite = onDocumentWritten(
    "shipments/{shipmentId}",
    async (event) => {
      const shipmentId = event.params.shipmentId;
      const beforeData = event.data?.before.data();
      const afterData = event.data?.after.data();

      // If a task was scheduled for the previous version of the document,
      // we need to delete it to prevent it from running.
      if (beforeData?.goLiveTaskName) {
        logger.log("Deleting previous task:", beforeData.goLiveTaskName);
        await tasksClient.deleteTask({name: beforeData.goLiveTaskName})
            .catch((err) => {
            // It's not a critical error if the task is already gone.
              if (err.code !== 5) {
                logger.error("Failed to delete previous task", err);
              }
            });
      }

      // If the shipment is not in a 'scheduled' state or lacks a go-live time,
      // we don't need to create a new task.
      if (!afterData ||
        afterData.status !== "scheduled" ||
        !afterData.goLiveAt) {
        logger.log(
            `Shipment ${shipmentId} is not scheduled. No task created.`);
        return;
      }

      // Firestore Timestamps need to be converted to JS Date objects.
      const goLiveAt = afterData.goLiveAt.toDate();

      // Don't schedule tasks for times in the past.
      const now = new Date();
      if (goLiveAt <= now) {
        logger.log(
            `Shipment ${shipmentId} goLiveAt is in the past. ` +
          "Skipping task creation."
        );
        return;
      }

      // Construct the Cloud Task with OIDC authentication for secure invocation.
      const task = {
        httpRequest: {
          httpMethod: "POST" as const,
          url: `https://${QUEUE_LOCATION}-${PROJECT_ID}.cloudfunctions.net/executeShipmentGoLive`,
          headers: {"Content-Type": "application/json"},
          body: Buffer.from(JSON.stringify({shipmentId})).toString("base64"),
          oidcToken: {
            serviceAccountEmail: SERVICE_ACCOUNT_EMAIL,
          },
        },
        scheduleTime: {
          seconds: Math.floor(goLiveAt.getTime() / 1000),
        },
      };

      try {
        const queuePath = tasksClient.queuePath(
            PROJECT_ID,
            QUEUE_LOCATION,
            QUEUE_ID
        );
        const [response] = await tasksClient.createTask({
          parent: queuePath,
          task,
        });

        logger.log(`Created task ${response.name} for shipment ${shipmentId}`);

        // Store the task name on the shipment document for future management.
        await db.collection("shipments").doc(shipmentId).update({
          goLiveTaskName: response.name,
        });
      } catch (error) {
        logger.error(
            `Error creating task for shipment ${shipmentId}:`,
            error
        );
      }
    },
);

/**
 * The secure HTTP endpoint called by Cloud Tasks to set a shipment to 'live'.
 */
export const executeShipmentGoLive = onRequest(async (req, res) => {
  const {shipmentId} = req.body;

  if (!shipmentId) {
    logger.error("HTTP request missing shipmentId in body");
    res.status(400).send("Bad Request: Missing shipmentId");
    return;
  }

  try {
    const shipmentRef = db.collection("shipments").doc(shipmentId);
    const doc = await shipmentRef.get();

    if (!doc.exists) {
      logger.warn(`Shipment ${shipmentId} not found for go-live execution.`);
      res.status(404).send("Not Found");
      return;
    }

    // Only update if the shipment is still in the 'scheduled' state.
    if (doc.data()?.status === "scheduled") {
      await shipmentRef.update({status: "live"});
      logger.log("Set shipment", shipmentId, "to 'live' via Cloud Task.");
      res.status(200).send("OK");
    } else {
      logger.log(
          `Shipment ${shipmentId} not 'scheduled'. No action taken.`
      );
      res.status(200).send("No action needed.");
    }
  } catch (error) {
    logger.error(
        `Error executing go-live for shipment ${shipmentId}:`,
        error
    );
    res.status(500).send("Internal Server Error");
  }
});

/**
 * A sweeper function that runs every hour as a safety net. It finds any
 * scheduled shipments that should have gone live but were missed by the
 * task queue for any reason.
 */
export const hourlyShipmentSweeper = onSchedule("every 1 hours", async () => {
  logger.log("Running hourly shipment sweeper function.");
  const now = admin.firestore.Timestamp.now();

  try {
    const query = db
        .collection("shipments")
        .where("status", "==", "scheduled")
        .where("goLiveAt", "<=", now);

    const snapshot = await query.get();

    if (snapshot.empty) {
      logger.log("No overdue scheduled shipments found.");
      return;
    }

    // A batch can handle up to 500 operations.
    // Chunking is needed if more than 500 shipments are found.
    const docs = snapshot.docs;
    for (let i = 0; i < docs.length; i += 500) {
      const chunk = docs.slice(i, i + 500);
      const batch = db.batch();
      chunk.forEach((doc) => {
        logger.log(
            `Sweeper: Found overdue shipment ${doc.id}. Setting to live.`);
        batch.update(doc.ref, {status: "live"});
      });
      await batch.commit();
    }

    logger.log(`Successfully updated ${snapshot.size} overdue shipments.`);
  } catch (error) {
    logger.error("Error running hourly shipment sweeper:", error);
  }
});
