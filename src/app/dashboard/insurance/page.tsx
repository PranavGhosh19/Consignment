
"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Skeleton } from "@/components/ui/skeleton";
import { ShieldCheck, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function InsurancePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form State
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data()?.userType === 'employee') {
            setUser(currentUser);
            setLoading(false);
        } else {
            router.push('/dashboard');
        }
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const resetForm = () => {
    setCompanyName("");
    setContactPerson("");
    setEmail("");
    setPhone("");
  };

  const handleSave = () => {
    if (!companyName || !contactPerson || !email) {
        toast({
            title: "Missing Information",
            description: "Please fill out all required fields.",
            variant: "destructive"
        });
        return;
    }
    // TODO: Implement Firestore save logic here
    console.log("Saving company:", { companyName, contactPerson, email, phone });

    toast({
        title: "Company Saved",
        description: `${companyName} has been added to the list of insurance partners.`
    });
    
    resetForm();
    setIsDialogOpen(false);
  };

  if (loading) {
    return (
        <div className="container py-6 md:py-10">
            <Skeleton className="h-8 w-48 mb-8" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }

  return (
    <div className="container py-6 md:py-10">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Insurance Management</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Company
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Insurance Partner</DialogTitle>
                        <DialogDescription>
                            Enter the details of the new insurance company.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="company-name">Company Name</Label>
                            <Input id="company-name" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g., Global Assurance Inc." />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="contact-person">Contact Person</Label>
                            <Input id="contact-person" value={contactPerson} onChange={e => setContactPerson(e.target.value)} placeholder="e.g., Jane Smith" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g., contact@globalassurance.com" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g., +1-202-555-0125" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Company</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

        <div className="border rounded-lg p-12 text-center bg-card dark:bg-card">
            <div className="flex justify-center mb-4">
                <ShieldCheck className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Insurance Dashboard Coming Soon</h2>
            <p className="text-muted-foreground">This section will contain tools for managing insurance partners and policies. Use the button above to add new partners.</p>
        </div>
    </div>
  );
}
