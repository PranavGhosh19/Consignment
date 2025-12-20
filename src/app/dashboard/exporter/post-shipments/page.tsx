
"use client";

import { useState } from "react";
import { ShipmentForm } from "@/components/shipment-form";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function PostShipmentsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Post a New Shipment</h1>
        </div>
        {!showForm && (
            <Button size="lg" onClick={() => setShowForm(true)}>
                <PlusCircle className="mr-2 h-5 w-5" />
                New Shipment Request
            </Button>
        )}
      </div>
      
      {showForm && <ShipmentForm />}
    </div>
  );
}
