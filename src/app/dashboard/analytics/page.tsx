
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Ship, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

type AnalyticsView = "exporters" | "carriers" | "shipments";

const SidebarNav = ({ activeView, setView }: { activeView: AnalyticsView, setView: (view: AnalyticsView) => void }) => {
    const navItems = [
        { id: "shipments", label: "Shipments", icon: Ship },
        { id: "exporters", label: "Exporters", icon: Anchor },
        { id: "carriers", label: "Carriers", icon: Users },
    ] as const;

    return (
        <nav className="flex flex-col gap-2">
            {navItems.map(item => (
                <Button
                    key={item.id}
                    variant={activeView === item.id ? "secondary" : "ghost"}
                    className="justify-start"
                    onClick={() => setView(item.id)}
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                </Button>
            ))}
        </nav>
    );
}

const AnalyticsContent = ({ view }: { view: AnalyticsView }) => {
    // Placeholder content based on the view
    const contentMap = {
        shipments: {
            title: "Shipment Analytics",
            description: "Insights into shipment volumes, statuses, and routes."
        },
        exporters: {
            title: "Exporter Analytics",
            description: "Data on exporter activity, top users, and growth."
        },
        carriers: {
            title: "Carrier Analytics",
            description: "Metrics on carrier engagement, bidding patterns, and performance."
        }
    }

    const currentContent = contentMap[view];

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>{currentContent.title}</CardTitle>
                <CardDescription>{currentContent.description}</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="border rounded-lg p-12 text-center bg-card dark:bg-card">
                    <div className="flex justify-center mb-4">
                        <BarChart className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Detailed Analytics Coming Soon</h2>
                    <p className="text-muted-foreground">We're working on bringing you powerful insights. Stay tuned!</p>
                </div>
            </CardContent>
        </Card>
    );
};


export default function AnalyticsPage() {
    const [activeView, setActiveView] = useState<AnalyticsView>("shipments");

    return (
        <div className="container py-6 md:py-10">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold font-headline">Platform Analytics</h1>
                <p className="text-muted-foreground">An overview of platform activity and key metrics.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 items-start">
                <div className="md:col-span-1">
                    <SidebarNav activeView={activeView} setView={setActiveView} />
                </div>
                <div className="md:col-span-3">
                    <AnalyticsContent view={activeView} />
                </div>
            </div>
        </div>
    );
}
