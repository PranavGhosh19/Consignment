"use client";

import { ShipmentForm } from "@/components/shipment-form";


export default function PostShipmentsPage() {
  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Post a New Shipment</h1>
            <p className="text-muted-foreground">Fill in the details below to create a new shipment request.</p>
        </div>
      </div>
      
      <ShipmentForm />

    </div>
  );
}
