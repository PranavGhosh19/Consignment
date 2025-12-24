
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { Truck, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

type UserType = "carrier" | "exporter";

const exporterTerms = {
    title: "Terms of Bidding – Exporter Agreement",
    content: (
        <div className="space-y-4 text-sm text-muted-foreground text-left">
            <p>By posting a shipment and accepting bids on this platform, you (the Exporter) agree to the following terms and conditions. These rules are designed to ensure fair usage and protect the interests of all parties using ShipCargo.</p>
            <ol className="list-decimal list-inside space-y-3">
                <li>
                    <span className="font-bold text-foreground">Bid Acceptance is Binding</span>
                    <p>Once you accept a vendor's bid, you are entering into a binding commitment to proceed with the shipment under the agreed terms (price, timeline, delivery conditions). Arbitrary cancellations or ghosting vendors after bid acceptance will be considered a breach of platform policy.</p>
                </li>
                <li>
                    <span className="font-bold text-foreground">Fair Use Policy</span>
                    <p>You must not: Solicit bids only to collect prices and negotiate offline; Accept a bid with no intention of honoring it; Create fake shipments to manipulate or test vendors. Violations may lead to warnings or account restrictions.</p>
                </li>
                <li>
                    <span className="font-bold text-foreground">Cancellation Policy</span>
                    <p>If you must cancel an accepted bid, it must be for a valid reason (shipment canceled, sudden change in delivery terms, force majeure). Frequent or unjustified cancellations may lead to: Temporary restrictions from posting new shipments; Visibility of your cancellation rate to vendors; Platform-imposed penalties if the behavior persists.</p>
                </li>
                 <li>
                    <span className="font-bold text-foreground">Responsiveness</span>
                    <p>Once a bid is accepted, you are expected to: Respond to the selected vendor within 24 hours; Coordinate and share necessary shipment details promptly; Not go unresponsive after bid confirmation.</p>
                </li>
                 <li>
                    <span className="font-bold text-foreground">Platform Integrity</span>
                    <p>Exporters must conduct themselves professionally and maintain the trust of vendors. Any abuse, spam, or attempts to bypass the platform's bidding system will result in account termination.</p>
                </li>
                 <li>
                    <span className="font-bold text-foreground">Dispute Resolution</span>
                    <p>ShipCargo provides mediation in case of disputes. The platform’s decision will be final and binding for both exporter and vendor. For any disagreement post-bid acceptance, both parties are encouraged to resolve amicably or seek ShipCargo’s support.</p>
                </li>
                 <li>
                    <span className="font-bold text-foreground">Payment Terms</span>
                    <p>All payments for shipments must be made exclusively through the platform's integrated payment system. Any off-platform payments (e.g., cash, bank transfers) are a violation of these terms. ShipCargo will not be responsible for any issues, disputes, or losses arising from such transactions.</p>
                </li>
            </ol>
            <p className="font-semibold text-foreground pt-2">By clicking "Agree & Continue", you confirm that you understand and agree to these Terms of Bidding and will conduct business fairly on the ShipCargo platform.</p>
        </div>
    )
};

const carrierTerms = {
    title: "Terms of Bidding Agreement",
    content: (
         <div className="space-y-4 text-sm text-muted-foreground text-left">
            <p>By placing a bid on this platform, you (the Vendor) agree to the following terms and conditions. These terms are binding and form part of your participation in the ShipCargo bidding system.</p>
            <ol className="list-decimal list-inside space-y-3">
                <li>
                    <span className="font-bold text-foreground">Commitment to Honor Bids</span>
                    <p>Once your bid is placed and accepted by an Exporter, you are expected to honor the quoted rate, delivery schedule, and service terms without withdrawal or renegotiation. Backing out of an accepted bid without a valid reason (force majeure or mutual cancellation) may lead to penalties or account suspension.</p>
                </li>
                <li>
                    <span className="font-bold text-foreground">Cancellation Policy</span>
                    <p>Vendors who cancel after their bid is accepted must: Provide a written reason within 24 hours; Understand that repeated cancellations may result in temporary or permanent suspension from the platform.</p>
                </li>
                <li>
                    <span className="font-bold text-foreground">Penalties for Non-Compliance</span>
                    <p>ShipCargo reserves the right to impose any or all of the following for non-compliance: Strike 1: Written warning and flag on your vendor profile; Strike 2: Temporary suspension from bidding (7–30 days); Strike 3: Permanent ban from the platform. ShipCargo also reserves the right to deduct penalty fees (if applicable) from your wallet or deposits held by the platform.</p>
                </li>
                 <li>
                    <span className="font-bold text-foreground">Bid Authenticity</span>
                    <p>All bids placed must be genuine, competitive, and executable. Dummy, speculative, or test bids will be treated as abuse and penalized.</p>
                </li>
                 <li>
                    <span className="font-bold text-foreground">Bid Locking</span>
                    <p>Once a bid is accepted, it is locked and cannot be modified or retracted by the vendor without written approval from the exporter and ShipCargo support.</p>
                </li>
                 <li>
                    <span className="font-bold text-foreground">Dispute Resolution</span>
                    <p>In case of a dispute, ShipCargo will mediate between the exporter and vendor. The decision of the platform in such cases shall be final and binding.</p>
                </li>
                 <li>
                    <span className="font-bold text-foreground">Platform Integrity</span>
                    <p>You agree to maintain professionalism and trust within the community. Abusive behavior, fraud, or manipulation of the bidding process will lead to immediate expulsion from the platform.</p>
                </li>
            </ol>
            <p className="font-semibold text-foreground pt-2">By clicking "Agree & Continue", you acknowledge that you have read, understood, and agreed to these Terms of Bidding.</p>
        </div>
    )
};

const termsData = {
    exporter: exporterTerms,
    carrier: carrierTerms,
};

export default function SelectTypePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check if user already has a type selected
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data()?.userType) {
          router.push("/dashboard");
        } else {
          setLoading(false);
        }
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleShowTerms = () => {
    if (!selectedType) {
      toast({
        title: "Error",
        description: "Please select a user type.",
        variant: "destructive",
      });
      return;
    }
    setIsTermsDialogOpen(true);
  };
  
  const handleAcceptTerms = async () => {
    if (!selectedType || !user) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        userType: selectedType,
      });
      router.push("/gst-verification");
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: "Could not save your user type. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setIsTermsDialogOpen(false);
    }
  };

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary/10 p-4">
            <Skeleton className="h-96 w-full max-w-2xl" />
        </div>
    )
  }
  
  const terms = selectedType ? termsData[selectedType] : { title: "", content: ""};

  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
        <Card className="mx-auto w-full max-w-2xl shadow-2xl">
            <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold font-headline">
                One Last Step!
            </CardTitle>
            <CardDescription className="text-lg">
                Tell us who you are to personalize your experience.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
                <div
                className={cn(
                    "rounded-lg border-2 p-6 text-center cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center h-48",
                    selectedType === "carrier" ? "border-primary bg-primary/5" : "border-border"
                )}
                onClick={() => setSelectedType("carrier")}
                >
                <Truck className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2 font-headline">Carrier Provider</h3>
                <p className="text-muted-foreground">
                    I own/operate vehicles and want to bid on shipments.
                </p>
                </div>
                <div
                className={cn(
                    "rounded-lg border-2 p-6 text-center cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center h-48",
                    selectedType === "exporter" ? "border-primary bg-primary/5" : "border-border"
                )}
                onClick={() => setSelectedType("exporter")}
                >
                <Anchor className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2 font-headline">Exporter</h3>
                <p className="text-muted-foreground">
                    I need to ship goods and want to receive bids.
                </p>
                </div>
            </div>
            </CardContent>
            <CardFooter>
            <Button
                onClick={handleShowTerms}
                disabled={!selectedType || isSubmitting}
                className="w-full h-12 text-lg"
            >
                {isSubmitting ? 'Saving...' : 'Continue'}
            </Button>
            </CardFooter>
        </Card>
        </div>

        <AlertDialog open={isTermsDialogOpen} onOpenChange={setIsTermsDialogOpen}>
            <AlertDialogContent className="max-w-3xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-headline">{terms.title}</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                         <ScrollArea className="max-h-[60vh] pr-6 -mr-6">
                            {terms.content}
                        </ScrollArea>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAcceptTerms} disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "I Agree & Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
  );
}
