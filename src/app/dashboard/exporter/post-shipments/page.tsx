
"use client";

import { useState } from "react";
import { ShipmentForm } from "@/components/shipment-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PostShipmentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Post a New Shipment</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Shipment Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
             <DialogHeader>
                <DialogTitle className="text-2xl font-headline">New Shipment Request</DialogTitle>
                <DialogDescription>
                  Fill out the form below to create your shipment request.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <ShipmentForm />
              </div>
          </DialogContent>
        </Dialog>
      </div>

       <div className="border rounded-lg p-12 text-center bg-card dark:bg-card">
            <h2 className="text-xl font-semibold mb-2">Manage Your Shipments</h2>
            <p className="text-muted-foreground">Click the "New Shipment Request" button to get started.</p>
        </div>
    </div>
  );
}

    