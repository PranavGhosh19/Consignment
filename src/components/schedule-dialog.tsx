"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DateTimePicker } from "./ui/datetime-picker";
import { useState } from "react";

interface ScheduleDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    shipmentData: any;
    onConfirm: (data: any) => void;
}

export function ScheduleDialog({ open, setOpen, shipmentData, onConfirm }: ScheduleDialogProps) {
    const [goLiveDate, setGoLiveDate] = useState<Date>();

    const handleConfirm = () => {
        if (goLiveDate) {
            onConfirm({
                ...shipmentData,
                goLiveAt: goLiveDate,
                status: "scheduled",
            });
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Schedule Go-Live Time</AlertDialogTitle>
                    <AlertDialogDescription>
                        Select the exact date and time you want this shipment to go live for bidding.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                    <DateTimePicker
                        date={goLiveDate}
                        setDate={setGoLiveDate}
                        disabledDates={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setGoLiveDate(undefined)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={!goLiveDate}>
                        Confirm Schedule
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
