
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, sendEmailVerification, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MailCheck, Send, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                if (currentUser.emailVerified) {
                    router.push('/dashboard');
                } else {
                    setUser(currentUser);
                    setLoading(false);
                }
            } else {
                router.push('/login');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleResendVerification = async () => {
        if (!user) return;
        setIsSending(true);
        try {
            await sendEmailVerification(user);
            toast({
                title: "Email Sent",
                description: "A new verification email has been sent to your inbox.",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to send verification email. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSending(false);
        }
    };
    
    // Periodically check email verification status
    useEffect(() => {
        if (!user) return;

        const interval = setInterval(async () => {
            await user.reload();
            const freshUser = auth.currentUser;
            if (freshUser && freshUser.emailVerified) {
                router.push('/dashboard');
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [user, router]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    return (
        <div className="flex items-center justify-center py-16 px-4 bg-[#13285A] min-h-[calc(100vh-160px)] relative overflow-hidden">
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF5A12]/15 blur-[120px] rounded-full" />
            <Card className="mx-auto w-full max-w-lg border-2 border-[#ECE6DC] bg-[#ECE6DC] text-[#13285A] shadow-2xl rounded-2xl relative z-10">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center">
                        <MailCheck className="h-16 w-16 text-[#FF5A12]" />
                    </div>
                    <CardTitle className="text-3xl font-extrabold font-headline text-[#13285A]">Verify Your Email</CardTitle>
                    <CardDescription className="text-base text-[#13285A]/80 font-medium">
                        We&apos;ve sent a verification link to <span className="font-bold text-[#13285A]">{user?.email}</span>. Please click the link to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-[#13285A]/75 text-sm mb-6">
                        Once verified, you will be automatically redirected. If you don&apos;t see the email, please check your spam folder.
                    </p>
                    <Button onClick={handleResendVerification} disabled={isSending} className="w-full sm:w-auto h-12 px-6 font-bold bg-[#FF5A12] hover:bg-[#E04800] text-white shadow-xl shadow-[#FF5A12]/30 rounded-xl transition-all duration-200 border-none cursor-pointer">
                        {isSending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Resend Verification Email
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
