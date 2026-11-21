"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Anchor, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GeneralSignupPage() {
    const router = useRouter();

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-[#13285A] min-h-[calc(100vh-160px)] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF5A12]/15 blur-[120px] rounded-full" />
      
      <Card className="mx-auto w-full max-w-md border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-2xl rounded-2xl relative z-10">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-extrabold font-headline text-[#13285A]">
            Create an Account
          </CardTitle>
          <CardDescription className="text-sm font-medium text-[#13285A]/75">
            Join ShipCargo as an Exporter or a Carrier.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pt-2">
            <Button 
              variant="outline" 
              size="lg" 
              className="h-20 text-lg font-bold rounded-xl border-2 border-[#13285A]/20 bg-white text-[#13285A] hover:bg-[#FF5A12] hover:text-white hover:border-[#FF5A12] shadow-md transition-all duration-200 cursor-pointer" 
              onClick={() => router.push('/signup/exporter')}
            >
                <Anchor className="mr-4 h-8 w-8 text-[#FF5A12]" />
                Sign up as Exporter
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-20 text-lg font-bold rounded-xl border-2 border-[#13285A]/20 bg-white text-[#13285A] hover:bg-[#FF5A12] hover:text-white hover:border-[#FF5A12] shadow-md transition-all duration-200 cursor-pointer" 
              onClick={() => router.push('/signup/carrier')}
            >
                <Truck className="mr-4 h-8 w-8 text-[#FF5A12]" />
                Sign up as Carrier
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
