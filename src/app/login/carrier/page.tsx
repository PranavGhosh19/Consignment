
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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

export default function CarrierLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists() && userDoc.data()?.userType === 'carrier') {
        router.push("/dashboard");
      } else if (userDoc.exists() && userDoc.data()?.userType !== 'carrier') {
        await auth.signOut();
        toast({
          title: "Login Failed",
          description: "This account is not registered as a carrier.",
          variant: "destructive",
        });
      } else {
        // This case handles users who signed up but didn't select a type
        router.push("/select-type");
      }

    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
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
            <Truck className="h-10 w-10 text-[#FF5A12]" />
          </div>
          <CardTitle className="text-3xl font-extrabold font-headline text-[#13285A]">Carrier Login</CardTitle>
          <CardDescription className="text-sm font-medium text-[#13285A]/75">
            Enter your credentials to access your carrier dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-bold text-[#13285A] uppercase tracking-wider">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-white text-[#13285A] border-2 border-[#13285A]/15 focus-visible:ring-2 focus-visible:ring-[#FF5A12] rounded-xl h-12"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-xs font-bold text-[#13285A] uppercase tracking-wider">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-xs font-semibold text-[#FF5A12] hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="bg-white text-[#13285A] border-2 border-[#13285A]/15 focus-visible:ring-2 focus-visible:ring-[#FF5A12] rounded-xl h-12"
              />
            </div>
            <Button onClick={handleLogin} disabled={loading} className="w-full h-13 mt-2 text-base font-bold bg-[#FF5A12] hover:bg-[#E04800] text-white shadow-xl shadow-[#FF5A12]/30 rounded-xl transition-all duration-200 border-none cursor-pointer">
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </div>
          <div className="mt-5 text-center text-sm text-[#13285A]/80">
            Don&apos;t have a carrier account?{" "}
            <Link href="/signup/carrier" className="font-bold text-[#FF5A12] hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
