"use client";

import { useEffect, useRef } from "react";
import { collection, query, where, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

/**
 * Client-side lifecycle sweeper with Millisecond-Precision Timers:
 * 1. Schedules exact one-shot setTimeout timers for shipments going live or closing.
 * 2. Deterministically transitions 'scheduled' -> 'live' on the exact millisecond.
 * 3. Transitions 'live' -> 'reviewing' on the exact closing millisecond.
 * 4. Periodic safety sweep as a fallback.
 */
export function ShipmentLifecycleSweeper() {
  const activeTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    const timers = activeTimersRef.current;

    const clearAllTimers = () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      clearAllTimers();

      if (!user) return;

      const checkAndSweepShipments = async () => {
        try {
          const now = Date.now();

          // 1. Check user's scheduled shipments
          const scheduledQuery = query(
            collection(db, "shipments"),
            where("exporterId", "==", user.uid),
            where("status", "==", "scheduled")
          );

          const scheduledSnap = await getDocs(scheduledQuery);
          for (const docSnap of scheduledSnap.docs) {
            const data = docSnap.data();
            if (data.goLiveAt) {
              const goLiveTime = data.goLiveAt.toDate().getTime();
              const msUntilLive = goLiveTime - now;

              if (msUntilLive <= 0) {
                const biddingCloseAt = data.biddingCloseAt || 
                  Timestamp.fromDate(new Date(goLiveTime + 3 * 60 * 1000));

                await updateDoc(doc(db, "shipments", docSnap.id), {
                  status: "live",
                  goLiveAt: data.goLiveAt,
                  biddingCloseAt: biddingCloseAt,
                });
                console.log(`[LifecycleSweeper] Set shipment ${data.publicId || docSnap.id} to LIVE`);
              } else if (msUntilLive <= 7200000) { // within next 2 hours
                const timerKey = `live_${docSnap.id}`;
                if (!timers.has(timerKey)) {
                  const timer = setTimeout(async () => {
                    timers.delete(timerKey);
                    const biddingCloseAt = data.biddingCloseAt || 
                      Timestamp.fromDate(new Date(goLiveTime + 3 * 60 * 1000));
                    await updateDoc(doc(db, "shipments", docSnap.id), {
                      status: "live",
                      goLiveAt: data.goLiveAt,
                      biddingCloseAt: biddingCloseAt,
                    }).catch(console.error);
                    console.log(`[LifecycleSweeper Precision] Set shipment ${data.publicId || docSnap.id} to LIVE on the second`);
                  }, msUntilLive);
                  timers.set(timerKey, timer);
                }
              }
            }
          }

          // 2. Check user's live shipments
          const liveQuery = query(
            collection(db, "shipments"),
            where("exporterId", "==", user.uid),
            where("status", "==", "live")
          );

          const liveSnap = await getDocs(liveQuery);
          for (const docSnap of liveSnap.docs) {
            const data = docSnap.data();
            if (data.biddingCloseAt) {
              const closeTime = data.biddingCloseAt.toDate().getTime();
              const msUntilClose = closeTime - now;

              if (msUntilClose <= 0) {
                await updateDoc(doc(db, "shipments", docSnap.id), {
                  status: "reviewing",
                });
                console.log(`[LifecycleSweeper] Set shipment ${data.publicId || docSnap.id} to REVIEWING`);
              } else if (msUntilClose <= 7200000) { // within next 2 hours
                const timerKey = `close_${docSnap.id}`;
                if (!timers.has(timerKey)) {
                  const timer = setTimeout(async () => {
                    timers.delete(timerKey);
                    await updateDoc(doc(db, "shipments", docSnap.id), {
                      status: "reviewing",
                    }).catch(console.error);
                    console.log(`[LifecycleSweeper Precision] Set shipment ${data.publicId || docSnap.id} to REVIEWING on the second`);
                  }, msUntilClose);
                  timers.set(timerKey, timer);
                }
              }
            }
          }
        } catch (err) {
          console.debug("[LifecycleSweeper] Check skipped:", err);
        }
      };

      // Run immediately and every 5 seconds as fallback
      checkAndSweepShipments();
      intervalId = setInterval(checkAndSweepShipments, 5000);
    });

    return () => {
      unsubscribe();
      if (intervalId) clearInterval(intervalId);
      clearAllTimers();
    };
  }, []);

  return null;
}
