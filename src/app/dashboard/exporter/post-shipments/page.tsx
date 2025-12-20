
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Ship } from "lucide-react";
import Link from "next/link";

export default function PostShipmentsPage() {
  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Post Shipments</h1>
            <p className="text-muted-foreground">This is where you will manage your posted shipments.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/exporter?edit=new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Shipment Request
            </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This feature is currently under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg">
                <Ship className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold">Post Shipments Dashboard</h2>
                <p className="text-muted-foreground">Check back later for more updates!</p>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
