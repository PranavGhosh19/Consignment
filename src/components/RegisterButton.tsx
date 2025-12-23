
"use client";

import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Check, Loader2 } from 'lucide-react';
import type { User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface RegisterButtonProps {
  shipmentId: string;
  user: User | null;
  onRegisterSuccess: (shipmentId: string) => void;
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({ shipmentId, user, onRegisterSuccess }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
        setLoading(false);
        return;
    };

    const checkAndFetchData = async () => {
      setLoading(true);
      try {
        // Fetch user data
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            setUserData(userDoc.data());
        }

        // Check registration status
        const registerDocRef = doc(db, 'shipments', shipmentId, 'register', user.uid);
        const registerSnap = await getDoc(registerDocRef);
        setIsRegistered(registerSnap.exists());
      } catch (error) {
        console.error('Error checking registration:', error);
        toast({ title: "Error", description: "Could not verify registration status.", variant: "destructive"});
      } finally {
        setLoading(false);
      }
    };

    checkAndFetchData();
  }, [shipmentId, user, toast]);

  const handleRegister = async (paymentId: string) => {
    if (!user) return;
    
    try {
        const registerDocRef = doc(db, 'shipments', shipmentId, 'register', user.uid);
        await setDoc(registerDocRef, {
            carrierId: user.uid,
            registeredAt: Timestamp.now(),
            paymentId: paymentId,
        });
        setIsRegistered(true);
        toast({ title: "Registration Successful!", description: "You are now registered to bid on this shipment." });
        onRegisterSuccess(shipmentId);
    } catch (error) {
         console.error('Error saving registration:', error);
         toast({ title: "Registration Error", description: "Payment was successful, but failed to save your registration. Please contact support.", variant: "destructive" });
    }
  };

  const initiatePayment = async () => {
    if (!user || !userData) {
        toast({ title: "Error", description: "You must be logged in to register.", variant: "destructive" });
        return;
    }
    
    setIsProcessing(true);
    const amount = 10; // 10 Rupees

    try {
        const res = await fetch('/api/razorpay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: amount * 100, // Amount in paise
                currency: "INR",
                notes: {
                    userId: user.uid,
                    shipmentId: shipmentId,
                    action: "bid-registration"
                }
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.details || 'Failed to create Razorpay order.');
        }
        
        const order = await res.json();

        const options = {
            key: "rzp_test_RuMOD23vC1ZlS8", // Using the same valid, public test key
            amount: order.amount,
            currency: order.currency,
            name: "Shipment Registration Fee",
            description: `Fee to bid on shipment #${shipmentId.substring(0,6)}`,
            order_id: order.id,
            handler: function (response: any) {
                // Payment is successful, now register the user
                handleRegister(response.razorpay_payment_id);
            },
            prefill: {
                name: userData.name,
                email: userData.email,
            },
            theme: {
                color: "#2563EB"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
            toast({
                title: "Payment Failed",
                description: `Error: ${response.error.description}`,
                variant: "destructive"
            });
            // Stop processing indicator on failure
            setIsProcessing(false);
        });
        rzp.open();
        
        // This is important: The processing state should be managed by the callback handlers.
        // But if the user closes the modal without paying, we need to reset the state.
        // Razorpay doesn't have a direct "onClose" that distinguishes between success/fail/close,
        // so we will optimistically stop the loader once the modal opens. The fail handler will catch failures.
        // A more advanced implementation might use a different state management strategy.
        // For now, let's reset it here. If payment fails, it will be reset again.
         setTimeout(() => setIsProcessing(false), 1000); // Give it a moment before resetting.

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        toast({
            title: "Error",
            description: `Could not initiate payment. ${errorMessage}`,
            variant: "destructive",
        });
        setIsProcessing(false);
    }
  };

  if (loading) return <Skeleton className="h-10 w-44" />;

  if (isRegistered) {
      return (
        <Button variant="outline" disabled>
          <Check className="mr-2 h-4 w-4" />
          Registered
        </Button>
      );
  }

  return (
    <Button onClick={initiatePayment} disabled={isProcessing}>
        {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isProcessing ? 'Processing...' : 'Pay ₹10 to Register'}
    </Button>
  );
};
