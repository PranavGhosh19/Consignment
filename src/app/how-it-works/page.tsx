"use client";

import { useState } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, ArrowRight, Truck } from "lucide-react";
import { EcosystemWorkflow } from "@/components/ecosystem-workflow";

const exporterSteps = [
    {
        number: 1,
        title: "Post Your Shipment",
        description: "Easily create a new shipment request with container type, cargo gross weight, origin port, and target price in under 2 minutes."
    },
    {
        number: 2,
        title: "Watch Live Competitive Bidding",
        description: "Once your shipment goes live, our network of vetted carriers enters your auction room. Real-time competitive pressure drives prices down automatically."
    },
    {
        number: 3,
        title: "Award to Lowest Bidder (L1)",
        description: "Review the lowest bidder, verified ratings, and transit timetable. Award the shipment with one click and get direct contact details immediately."
    },
    {
        number: 4,
        title: "Track & Complete Delivery",
        description: "Upload digital shipping documents, coordinate milestone updates, and finalize settlements directly with your verified carrier partner."
    }
];

const carrierSteps = [
    {
        number: 1,
        title: "Discover High-Volume Lanes",
        description: "Search verified export shipments across JNPT, Mundra, Chennai, and inland ICDs matching your vessel slots and empty container capacity."
    },
    {
        number: 2,
        title: "Bid With Real-Time Rank Precision",
        description: "Submit live bids during scheduled rounds. Instant sub-second rank feedback shows your position (L1/L2) so you can optimize bids."
    },
    {
        number: 3,
        title: "Win Loads & Build Direct Accounts",
        description: "When awarded, deal directly with genuine corporate exporters. Grow your business with transparent bookings and reliable volume."
    }
];

const Step = ({ number, title, description }: { number: number; title: string; description: string }) => (
    <Card className="p-6 border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-200">
        <CardContent className="flex items-start gap-4 sm:gap-6 p-0">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#FF5A12] text-white text-xl font-bold shadow-md shadow-[#FF5A12]/30">
                {number}
            </div>
            <div>
                <h3 className="text-xl font-bold mb-2 font-headline text-[#13285A]">{title}</h3>
                <p className="text-sm sm:text-base text-[#13285A]/80 leading-relaxed">{description}</p>
            </div>
        </CardContent>
    </Card>
);

export default function HowItWorksPage() {
    const [activeTab, setActiveTab] = useState("exporters");

    return (
        <main className="flex-1 bg-[#13285A] text-[#ECE6DC] relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#1C3A7E]/50 via-[#FF5A12]/10 to-transparent blur-[140px] rounded-full -z-10" />

            <section className="w-full py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center max-w-3xl mx-auto">
                        <span className="inline-block text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-[#ECE6DC]/25 bg-[#ECE6DC]/10 text-[#ECE6DC]">
                            Simple &amp; Transparent
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline text-[#ECE6DC]">
                            How ShipCargo Works
                        </h1>
                        <p className="text-[#ECE6DC]/80 text-base sm:text-lg leading-relaxed">
                            A streamlined, transparent bidding process connecting Indian exporters and verified freight carriers directly.
                        </p>
                    </div>

                    <div className="mx-auto max-w-3xl pt-10">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 h-auto p-1.5 bg-[#ECE6DC] rounded-2xl border-2 border-[#ECE6DC] shadow-lg">
                                <TabsTrigger 
                                    value="exporters" 
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm sm:text-base font-bold transition-all h-12 px-4 sm:px-6 text-[#13285A] data-[state=active]:bg-[#FF5A12] data-[state=active]:text-white shadow-none data-[state=active]:shadow-md cursor-pointer"
                                >
                                    <User className="mr-2 h-5 w-5" /> For Exporters
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="carriers" 
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm sm:text-base font-bold transition-all h-12 px-4 sm:px-6 text-[#13285A] data-[state=active]:bg-[#FF5A12] data-[state=active]:text-white shadow-none data-[state=active]:shadow-md cursor-pointer"
                                >
                                    <Truck className="mr-2 h-5 w-5" /> For Carriers
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="exporters">
                                <div className="space-y-6 pt-8">
                                    {exporterSteps.map(step => (
                                        <Step key={step.number} {...step} />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="carriers">
                                <div className="space-y-6 pt-8">
                                    {carrierSteps.map(step => (
                                        <Step key={step.number} {...step} />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

            {/* End-to-End Trade Lifecycle Ecosystem */}
            <EcosystemWorkflow />

            {/* Closing Call to Action in Pearl Shell */}
            <section className="w-full py-16 md:py-20 border-t border-[#13285A]/15 bg-[#ECE6DC] text-[#13285A]">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-headline text-[#13285A]">
                            Ready to Experience Live Freight Bidding?
                        </h2>
                        <p className="text-base text-[#13285A]/80 leading-relaxed">
                            Join verified shippers and ocean carriers discovering transparent market rates in real time.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                            <Button asChild size="lg" className="h-14 px-8 text-base font-bold bg-[#FF5A12] hover:bg-[#E04800] text-white shadow-xl shadow-[#FF5A12]/30 rounded-2xl transition-all duration-200 border-none cursor-pointer">
                                <Link href="/signup/exporter" className="flex items-center gap-2">
                                    <span>Get Started as Exporter</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base font-bold border-2 border-[#13285A] bg-transparent text-[#13285A] hover:bg-[#13285A] hover:text-[#ECE6DC] rounded-2xl transition-all duration-200 cursor-pointer">
                                <Link href="/signup/carrier">
                                    <span>Register as Carrier</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
