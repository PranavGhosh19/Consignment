
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Ship, CheckCircle, Anchor, Truck, TrendingDown, Clock, Globe, Shield, Search, FileText, BarChart, BadgeCent } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthRedirect } from '@/components/auth-redirect';

const FeatureCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="flex flex-col items-center text-center space-y-3">
        <div className="bg-primary text-primary-foreground rounded-full p-3">
            <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold font-headline">{title}</h3>
        <p className="text-muted-foreground text-sm">{children}</p>
    </div>
);

const HowItWorksStep = ({ number, title, description }: { number: number, title: string, description: string }) => (
    <li className="flex items-start gap-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{number}</div>
        <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </li>
);

export default function Home() {
  return (
    <>
      <AuthRedirect />
      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="w-full py-20 md:py-28 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                  <h1 className="pb-2 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
                    Get the Best Freight Rates Through Competitive Bidding
                  </h1>
                  <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl">
                    A marketplace where exporters post shipments and verified carriers bid in real time.
                  </p>
                  <p className="font-semibold text-foreground">
                    No middlemen • Transparent pricing • Faster deals
                  </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                  <Button asChild size="lg" className="group bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform hover:scale-105">
                      <Link href="/signup/exporter">
                          Post a Shipment
                          <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="shadow-lg transition-transform hover:scale-105">
                      <Link href="/signup/carrier">Bid on Shipments</Link>
                  </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Social Proof */}
        <section className="w-full pb-20 md:pb-28">
            <div className="container text-center">
                <p className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">Trusted by a growing network of exporters & logistics partners</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-4 gap-x-8 items-center">
                    <p className="text-lg font-bold text-muted-foreground/60">ShipCo</p>
                    <p className="text-lg font-bold text-muted-foreground/60">Global Exports</p>
                    <p className="text-lg font-bold text-muted-foreground/60">Apex Logistics</p>
                    <p className="text-lg font-bold text-muted-foreground/60">Quantum Freight</p>
                    <p className="text-lg font-bold text-muted-foreground/60">Trans-World</p>
                    <p className="text-lg font-bold text-muted-foreground/60">EcoHaul</p>
                </div>
                 <p className="mt-8 text-sm text-muted-foreground">Currently onboarding verified exporters & carriers.</p>
            </div>
        </section>

        {/* 3. How It Works */}
        <section className="w-full py-20 md:py-28 bg-secondary">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                        How It Works
                    </h2>
                </div>
                <div className="grid gap-12 md:grid-cols-2">
                    <div>
                        <h3 className="text-2xl font-bold font-headline mb-6 flex items-center gap-3"><Anchor className="text-primary"/> For Exporters</h3>
                        <ul className="space-y-6">
                            <HowItWorksStep number={1} title="Post Shipment Details" description="Fill out a simple form with your cargo and route details in minutes." />
                            <HowItWorksStep number={2} title="Receive Competitive Bids" description="Verified carriers bid for your shipment, driving down your costs." />
                            <HowItWorksStep number={3} title="Choose the Best Offer" description="Select the best bid based on price, carrier rating, and transit time." />
                            <HowItWorksStep number={4} title="Track & Close" description="Manage documents and track your shipment until successful delivery." />
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-2xl font-bold font-headline mb-6 flex items-center gap-3"><Truck className="text-primary"/> For Carriers</h3>
                         <ul className="space-y-6">
                            <HowItWorksStep number={1} title="Browse Live Shipments" description="Find shipments that match your available routes and capacity." />
                            <HowItWorksStep number={2} title="Place Bids Instantly" description="Submit your best price and compete fairly in a transparent marketplace." />
                            <HowItWorksStep number={3} title="Win Deals" description="Get notified instantly when your bid is awarded by the exporter." />
                            <HowItWorksStep number={4} title="Get Paid Faster" description="Complete the delivery and ensure timely payment through a verified process." />
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. Core Value Propositions */}
        <section className="w-full py-20 md:py-28">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                        Why ShipCargo?
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-lg">
                        An ecosystem built on fairness, transparency, and efficiency — unlike emails, WhatsApp, or traditional brokers.
                    </p>
                </div>
                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <FeatureCard icon={BadgeCent} title="Lower Costs">
                        Our competitive bidding system naturally drives down freight costs, ensuring you get the best market rate for every shipment.
                    </FeatureCard>
                    <FeatureCard icon={Search} title="Full Transparency">
                        See all bids, carrier profiles, and shipment details in one place. No hidden fees or backroom deals.
                    </FeatureCard>
                     <FeatureCard icon={Zap} title="Faster Closures">
                        No more endless phone calls and email chains. Post, receive bids, and award shipments in a fraction of the time.
                    </FeatureCard>
                    <FeatureCard icon={Shield} title="Verified Vendors">
                        We verify every carrier on our platform, reducing your risk and ensuring your cargo is in safe hands.
                    </FeatureCard>
                     <FeatureCard icon={BarChart} title="Data & History">
                        Access a complete history of your shipments, bids, and rates to make smarter logistics decisions over time.
                    </FeatureCard>
                     <FeatureCard icon={FileText} title="Streamlined Documents">
                        Manage all necessary shipping documents within the platform for awarded shipments, keeping everything organized.
                    </FeatureCard>
                </div>
            </div>
        </section>
        
        {/* 5. Final Call to Action */}
        <section className="w-full py-20 md:py-28 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
                Ready to Revolutionize Your Logistics?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                Join ShipCargo today and experience a smarter way to ship. It takes less than 2 minutes to get started.
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center pt-4">
                  <Button asChild size="lg" className="group">
                      <Link href="/signup/exporter">Post Your First Shipment — Free</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                      <Link href="/signup/carrier">Register as a Carrier</Link>
                  </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
