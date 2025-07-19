
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="container py-6 md:py-10">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Analytics</h1>
        </div>

        <div className="border rounded-lg p-12 text-center bg-card dark:bg-card">
            <div className="flex justify-center mb-4">
                <BarChart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Analytics Dashboard Coming Soon</h2>
            <p className="text-muted-foreground">We're working on bringing you powerful insights into your shipping data. Stay tuned!</p>
        </div>
    </div>
  );
}
