
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Truck } from "lucide-react";

export default function CarrierSignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        userType: 'carrier',
        verificationStatus: 'unsubmitted',
      });
      
      await sendEmailVerification(user);

      toast({
          title: "Verification Email Sent",
          description: "Please check your inbox to verify your email address."
      });
      
      router.push("/verify-email");

    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-[#13285A] min-h-[calc(100vh-160px)] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF5A12]/15 blur-[120px] rounded-full" />
      <Card className="mx-auto w-full max-w-md border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-2xl rounded-2xl relative z-10">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
                <Truck className="h-10 w-10 text-[#FF5A12]"/>
            </div>
          <CardTitle className="text-3xl font-extrabold font-headline text-[#13285A]">
            Create a Carrier Account
          </CardTitle>
          <CardDescription className="text-sm font-medium text-[#13285A]/75">
            Fill out the form below to start bidding on shipments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-xs font-bold text-[#13285A] uppercase tracking-wider">Company Name</Label>
              <Input id="name" placeholder="e.g. Speedy Logistics" required value={name} onChange={(e) => setName(e.target.value)} disabled={loading} className="bg-white text-[#13285A] border-2 border-[#13285A]/15 focus-visible:ring-2 focus-visible:ring-[#FF5A12] rounded-xl h-12" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-bold text-[#13285A] uppercase tracking-wider">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="bg-white text-[#13285A] border-2 border-[#13285A]/15 focus-visible:ring-2 focus-visible:ring-[#FF5A12] rounded-xl h-12" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-xs font-bold text-[#13285A] uppercase tracking-wider">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} className="bg-white text-[#13285A] border-2 border-[#13285A]/15 focus-visible:ring-2 focus-visible:ring-[#FF5A12] rounded-xl h-12" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password" className="text-xs font-bold text-[#13285A] uppercase tracking-wider">Confirm Password</Label>
              <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} className="bg-white text-[#13285A] border-2 border-[#13285A]/15 focus-visible:ring-2 focus-visible:ring-[#FF5A12] rounded-xl h-12" />
            </div>
            <Button onClick={handleSignUp} disabled={loading} className="w-full h-13 mt-2 text-base font-bold bg-[#FF5A12] hover:bg-[#E04800] text-white shadow-xl shadow-[#FF5A12]/30 rounded-xl transition-all duration-200 border-none cursor-pointer">
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
          <div className="mt-5 text-center text-sm text-[#13285A]/80">
            Already have an account?{" "}
            <Link href="/login/carrier" className="font-bold text-[#FF5A12] hover:underline">
              Log In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
