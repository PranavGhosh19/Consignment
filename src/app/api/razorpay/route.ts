
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { headers } from "next/headers";

export async function POST(request: Request) {
    try {
        const { amount, currency, notes } = await request.json();
        
        if (!amount || !currency) {
            return NextResponse.json({ error: "Amount and currency are required" }, { status: 400 });
        }

        // Using a valid, public test key for Razorpay.
        // In a real application, these should come from environment variables.
        const key_id = "rzp_test_RuMOD23vC1ZlS8";
        const key_secret = "rgU8qsAjljO9hXdIyrckZL8T";

        const razorpay = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
        });

        const options = {
            amount: amount, // amount in the smallest currency unit
            currency: currency,
            receipt: `receipt_${Date.now()}`,
            notes: notes || {},
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json(order, { status: 200 });

    } catch (error: unknown) {
        // More detailed server-side logging
        const fullError = error instanceof Error 
            ? {
                message: error.message,
                stack: error.stack,
                name: error.name,
              } 
            : { message: "An unknown error occurred" };
            
        console.error("Error creating Razorpay order:", JSON.stringify(fullError, null, 2));

        return NextResponse.json(
            { 
                error: "Failed to create Razorpay order", 
                details: fullError.message 
            }, 
            { status: 500 }
        );
    }
}
