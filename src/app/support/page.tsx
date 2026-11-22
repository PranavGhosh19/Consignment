"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Phone, MessageCircle, ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        question: "How do I post a shipment request as an exporter?",
        answer: "Navigate to your Exporter Dashboard and click the 'New Shipment Request' button. Fill in all the required details about your cargo, origin, destination, and desired timelines. You can save it as a draft or schedule it to go live for bidding."
    },
    {
        question: "How does the bidding process work for carriers?",
        answer: "As a carrier, you can browse available shipments in the 'Find Shipments' section. When a shipment is 'live', you can place a bid. The auction is a reverse auction, meaning the lowest bid is the winning one. You can see the current lowest bid and place a lower one to compete."
    },
    {
        question: "What happens after I accept a bid?",
        answer: "Once an exporter accepts a carrier's bid, the shipment is 'awarded'. Both parties will receive contact information to coordinate the logistics. All communication regarding pickup, delivery, and documentation should happen directly between the exporter and the awarded carrier."
    },
    {
        question: "How do settlements and documentation work?",
        answer: "Our platform facilitates direct connections and transparent bidding. Documentation workflows (such as Bill of Lading, shipping bills, and invoices) are uploaded directly to the platform vault, with direct settlements between exporter and carrier."
    },
    {
        question: "Can I edit a shipment request after it's live?",
        answer: "No, once a shipment is live and accepting bids, it cannot be edited to ensure a fair bidding process for all carriers. If you need to make significant changes, you would need to cancel the current shipment and post a new one. You can edit a shipment at any time while it is in 'draft' or 'scheduled' status."
    }
];

export default function SupportPage() {
    const { toast } = useToast();

    return (
        <div className="min-h-screen bg-[#13285A] text-[#ECE6DC] py-12 md:py-16 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#1C3A7E]/50 via-[#FF5A12]/10 to-transparent blur-[140px] rounded-full -z-10" />

            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <span className="inline-block text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-[#ECE6DC]/25 bg-[#ECE6DC]/10 text-[#ECE6DC] mb-3">
                        Help &amp; Guidance
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold font-headline text-[#ECE6DC]">Support &amp; Advisory Center</h1>
                    <p className="mt-4 text-base sm:text-lg text-[#ECE6DC]/80 max-w-2xl mx-auto leading-relaxed">
                        We&apos;re here to help. Find answers to common questions, or connect directly with our Senior Export Advisor and support team.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold mb-6 font-headline text-[#ECE6DC]">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full space-y-3">
                            {faqs.map((faq, index) => (
                                <AccordionItem 
                                    value={`item-${index}`} 
                                    key={index} 
                                    className="border-2 border-[#ECE6DC] rounded-xl px-5 py-1 bg-[#ECE6DC] text-[#13285A] shadow-md"
                                >
                                    <AccordionTrigger className="text-left font-bold text-base sm:text-lg text-[#13285A] hover:text-[#FF5A12] transition-colors hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm sm:text-base text-[#13285A]/85 leading-relaxed pt-2">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="space-y-6">
                        {/* Advisor Card */}
                        <Card className="border-2 border-[#FF5A12]/50 bg-[#0A1636] text-[#ECE6DC] shadow-2xl rounded-2xl p-2 relative overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#FF5A12] text-white w-fit mb-1">
                                    <UserCheck className="w-3 h-3" />
                                    <span>Dedicated Export Advisor</span>
                                </div>
                                <CardTitle className="font-headline font-extrabold text-xl text-white">Mr. Lijo Augustine</CardTitle>
                                <CardDescription className="text-[#AEB8D6] text-xs">Cross-Border Trade &amp; Logistics Specialist</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-xs">
                                <p className="text-[#ECE6DC]/85 text-xs leading-relaxed">
                                    Direct personal advisory on DGFT compliance, sample testing, and reverse container bidding.
                                </p>
                                <Button asChild className="w-full h-11 text-xs font-bold bg-[#FF5A12] hover:bg-[#E04800] text-white rounded-xl shadow-md cursor-pointer border-none">
                                    <Link href="tel:+918089720725" className="flex items-center justify-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span>Call +91 8089720725</span>
                                    </Link>
                                </Button>
                                <Button asChild className="w-full h-11 text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl shadow-md cursor-pointer border-none">
                                    <Link 
                                      href="https://wa.me/918089720725?text=Hi%20Mr.%20Lijo,%20I%20need%20export%20advisory%20support%20on%20ShipCargo." 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        <span>WhatsApp Mr. Lijo</span>
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* General Desk Card */}
                        <Card className="border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-xl rounded-2xl p-2">
                            <CardHeader className="pb-3">
                                <CardTitle className="font-headline font-extrabold text-lg text-[#13285A]">General Support</CardTitle>
                                <CardDescription className="text-[#13285A]/75 text-xs font-medium">Platform operations &amp; document room help.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                               <Button asChild className="w-full h-10 text-xs font-bold bg-[#13285A] hover:bg-[#1C3A7E] text-white rounded-xl cursor-pointer border-none">
                                    <Link href="mailto:support@shipcargo.in" className="flex items-center justify-center gap-2">
                                        <Mail className="h-3.5 w-3.5" />
                                        <span>Email Support Desk</span>
                                    </Link>
                               </Button>
                               <Button asChild variant="outline" className="w-full h-10 text-xs font-bold border-2 border-[#13285A]/30 text-[#13285A] hover:bg-[#13285A] hover:text-white rounded-xl cursor-pointer">
                                    <Link href="/contact" className="flex items-center justify-center gap-2">
                                        <span>Visit Full Contact Page</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                               </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
