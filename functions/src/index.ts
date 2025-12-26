
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions/v2";
import {
  onDocumentWritten,
  onDocumentCreated,
} from "firebase-functions/v2/firestore";
import {onRequest} from "firebase-functions/v2/https";
import {onSchedule} from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import {CloudTasksClient, protos} from "@google-cloud/tasks";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// -----------------------------------------------------------------------------
// Cloud Tasks Configuration
// -----------------------------------------------------------------------------
const PROJECT_ID = "cargoflow-j35du";
const QUEUE_LOCATION = "us-central1";
const GO_LIVE_QUEUE_ID = "shipment-go-live-queue";
const CLOSE_BIDDING_QUEUE_ID = "shipment-go-live-queue";

// Service account must have Cloud Tasks Enqueuer role
const SERVICE_ACCOUNT_EMAIL =
    `cloud-tasks-invoker@${PROJECT_ID}.iam.gserviceaccount.com`;
const tasksClient = new CloudTasksClient();

// Set default region globally, but onSchedule needs it explicitly.
setGlobalOptions({region: "us-central1", maxInstances: 10});

/**
 * Creates a notification document in Firestore.
 * @param {admin.firestore.DocumentData} notification The notification object.
 */
async function createNotification(notification: admin.firestore.DocumentData) {
  try {
    await db.collection("notifications").add({
      ...notification,
      isRead: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    logger.log(`Notification created for ${notification.recipientId}`);
  } catch (error) {
    logger.error(
      `Error creating notification for ${notification.recipientId}:`,
      error,
    );
  }
}

/**
 * Creates or updates a Cloud Task to trigger a shipment go-live event.
 * This function is triggered whenever a document in the 'shipments'
 * collection is written to.
 */
export const onShipmentWrite = onDocumentWritten("shipments/{shipmentId}",
  async (event) => {
    const shipmentId = event.params.shipmentId;
    const beforeData = event.data?.before.data();
    const afterData = event.data?.after.data();

    // --- Task Deletion Logic ---
    // If a task was scheduled for the previous version, delete it.
    if (beforeData?.goLiveTaskName) {
      logger.log("Deleting previous task:", beforeData.goLiveTaskName);
      await tasksClient.deleteTask({name: beforeData.goLiveTaskName})
        .catch((err) => {
          // 5 = NOT_FOUND - It's okay if the task doesn't exist anymore.
          if (err.code !== 5) {
            logger.error("Failed to delete previous task", err);
          }
        });
    }

    // --- Automatically set biddingCloseAt if goLiveAt exists ---
    if (afterData && afterData.goLiveAt) {
      const goLiveAtDate = afterData.goLiveAt.toDate();
      const needsBiddingCloseUpdate = !afterData.biddingCloseAt ||
        (beforeData?.goLiveAt && beforeData.goLiveAt.toMillis() !== afterData.goLiveAt.toMillis());

      if (needsBiddingCloseUpdate) {
        const biddingCloseAt = new Date(goLiveAtDate.getTime() + 3 * 60 * 1000); // 3 minutes later
        await db.collection("shipments").doc(shipmentId).update({
          biddingCloseAt: admin.firestore.Timestamp.fromDate(biddingCloseAt),
        });
        logger.log(`Auto-updated biddingCloseAt for shipment ${shipmentId}`);
      }
    }


    // --- Status Change Notifications (Awarded) ---
    if (beforeData?.status !== "awarded" && afterData?.status === "awarded") {
      if (afterData.winningCarrierId && afterData.productName) {
        await createNotification({
          recipientId: afterData.winningCarrierId,
          message: "Congratulations! You've won the bid for the " +
              `'${afterData.productName}' shipment.`,
          link: `/dashboard/carrier/registered-shipment/${afterData.publicId}`,
        });
      }
    }


    // --- Task Creation Logic ---
    // If not 'scheduled' or no go-live time, do nothing.
    if (!afterData ||
    afterData.status !== "scheduled" ||
    !afterData.goLiveAt) {
      logger.log(`Shipment ${shipmentId} is not scheduled. No task created.`);
      return;
    }

    const goLiveAt = afterData.goLiveAt.toDate();
    const now = new Date();

    if (goLiveAt <= now) {
      logger.log(
        `Shipment ${shipmentId} goLiveAt is in the past. Skipping task.`,
      );
      return;
    }

    const task: protos.google.cloud.tasks.v2.ITask = {
      httpRequest: {
        httpMethod: "POST",
        url:
        `https://${QUEUE_LOCATION}-${PROJECT_ID}.cloudfunctions.net/` +
        "executeShipmentGoLive",
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
        GO_LIVE_QUEUE_ID,
      );
      const [response] = await tasksClient.createTask({
        parent: queuePath,
        task,
      });
      logger.log(`Created task ${response.name} for shipment ${shipmentId}`);

      await db.collection("shipments").doc(shipmentId).update({
        goLiveTaskName: response.name,
      });
    } catch (error) {
      logger.error(`Error creating task for shipment ${shipmentId}:`, error);
    }
  });

/**
 * Creates a notification when a new bid is placed on a shipment.
 */
export const onBidCreate = onDocumentCreated("shipments/{shipmentId}/bids/{bidId}", async (event) => {
  const shipmentId = event.params.shipmentId;
  const bidData = event.data?.data();

  if (!bidData) {
    logger.log("No bid data found, cannot create notification.");
    return;
  }

  try {
    const shipmentDoc = await db.collection("shipments").doc(shipmentId).get();
    if (shipmentDoc.exists) {
      const shipmentData = shipmentDoc.data();
      if (shipmentData && shipmentData.exporterId) {
        await createNotification({
          recipientId: shipmentData.exporterId,
          message: `You have a new bid of $${bidData.bidAmount} ` +
              `on your '${shipmentData.productName}' shipment.`,
          link: `/dashboard/shipment/${shipmentData.publicId}`,
        });
      }
    }
  } catch (error) {
    logger.error(`Error fetching shipment ${shipmentId} for new bid notification:`, error);
  }
});


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

    const shipmentData = doc.data();
    // Only update if the shipment is still in the 'scheduled' state.
    if (shipmentData?.status === "scheduled") {
      const biddingCloseAt = new Date(Date.now() + 3 * 60 * 1000);
      await shipmentRef.update({
        status: "live",
        biddingCloseAt: admin.firestore.Timestamp.fromDate(biddingCloseAt),
      });
      logger.log("Set shipment", shipmentId, "to 'live' via Cloud Task.");

      // --- Notify Registered Carriers ---
      const registrationsRef = shipmentRef.collection("register");
      const registrationsSnap = await registrationsRef.get();
      if (!registrationsSnap.empty) {
        const notifications = registrationsSnap.docs.map((regDoc) => {
          const carrierId = regDoc.id;
          return createNotification({
            recipientId: carrierId,
            message: `The shipment '${shipmentData.productName}' is ` +
                "now live for bidding!",
            link: `/dashboard/carrier/shipment/${shipmentData.publicId}`,
          });
        });
        await Promise.all(notifications);
        logger.log(`Sent ${notifications.length} go-live notifications for ` +
            `shipment ${shipmentId}.`);
      }

      // --- Schedule Bidding Close Task ---
      const closeTask: protos.google.cloud.tasks.v2.ITask = {
        httpRequest: {
          httpMethod: "POST",
          url: `https://${QUEUE_LOCATION}-${PROJECT_ID}.cloudfunctions.net/closeBiddingAndReview`,
          headers: {"Content-Type": "application/json"},
          body: Buffer.from(JSON.stringify({shipmentId})).toString("base64"),
          oidcToken: {serviceAccountEmail: SERVICE_ACCOUNT_EMAIL},
        },
        scheduleTime: {seconds: Math.floor(biddingCloseAt.getTime() / 1000)},
      };

      const queuePath = tasksClient.queuePath(PROJECT_ID, QUEUE_LOCATION, CLOSE_BIDDING_QUEUE_ID);
      const [response] = await tasksClient.createTask({parent: queuePath, task: closeTask});
      logger.log(`Created bidding close task ${response.name} for shipment ${shipmentId}`);

      res.status(200).send("OK");
    } else {
      logger.log(`Shipment ${shipmentId} not 'scheduled'. No action taken.`);
      res.status(200).send("No action needed.");
    }
  } catch (error) {
    logger.error(`Error executing go-live for shipment ${shipmentId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * A sweeper function that runs every minute as a safety net. It finds any
 * scheduled shipments that should have gone live but were missed by the
 * task queue for any reason.
 */
export const minuteShipmentSweeper =
  onSchedule({region: "us-central1", schedule: "every 1 minutes"},
    async () => {
      logger.log("Running minute shipment sweeper function.");
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

        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          logger.log(
            `Sweeper: Found overdue shipment ${doc.id}. Setting to live.`,
          );
          batch.update(doc.ref, {status: "live"});
        });

        await batch.commit();
        logger.log(`Successfully updated ${snapshot.size} overdue shipments.`);
      } catch (error) {
        logger.error("Error running minute shipment sweeper:", error);
      }
    });

/**
 * The secure HTTP endpoint called by Cloud Tasks to set a shipment to 'reviewing'.
 */
export const closeBiddingAndReview = onRequest(async (req, res) => {
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
      logger.warn(`Shipment ${shipmentId} not found for closing bidding.`);
      res.status(404).send("Not Found");
      return;
    }

    const shipmentData = doc.data();
    if (shipmentData?.status === "live") {
      await shipmentRef.update({status: "reviewing"});
      logger.log(`Set shipment ${shipmentId} to 'reviewing'.`);
      res.status(200).send("OK");
    } else {
      logger.log(`Shipment ${shipmentId} not 'live'. No action taken.`);
      res.status(200).send("No action needed.");
    }
  } catch (error) {
    logger.error(`Error closing bidding for shipment ${shipmentId}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * A sweeper function that runs every minute to close bidding on shipments
 * where the biddingCloseAt time has passed.
 */
export const reviewingSweeper = onSchedule({region: "us-central1", schedule: "every 1 minutes"}, async () => {
  logger.log("Running reviewing sweeper function.");
  const now = admin.firestore.Timestamp.now();

  try {
    const query = db
      .collection("shipments")
      .where("status", "==", "live")
      .where("biddingCloseAt", "<=", now);

    const snapshot = await query.get();

    if (snapshot.empty) {
      logger.log("No overdue live shipments found.");
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      logger.log(`Sweeper: Found overdue live shipment ${doc.id}. Setting to reviewing.`);
      batch.update(doc.ref, {status: "reviewing"});
    });

    await batch.commit();
    logger.log(`Successfully updated ${snapshot.size} overdue live shipments.`);
  } catch (error) {
    logger.error("Error running reviewing sweeper:", error);
  }
});
