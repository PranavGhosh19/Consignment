
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { headers } from "next/headers";

export async function POST(request: Request) {
    try {
        const { amount, currency, notes } = await request.json();
        
        if (!amount || !currency) {
            return NextResponse.json({ error: "Amount and currency are required" }, { status: 400 });
        }

        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "rzp_test_U2RWuFM2YZo2RJ";
        const key_secret = process.env.RAZORPAY_KEY_SECRET || "mec9DCJ4kReQw9a1O6BLJqPm";

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

    } catch (error: any) {
        // Detailed server-side logging that handles both Error instances and Razorpay API error objects
        console.error("Error creating Razorpay order:", error);
        
        const errorMessage = error?.error?.description || error?.message || (typeof error === 'string' ? error : JSON.stringify(error));

        return NextResponse.json(
            { 
                error: "Failed to create Razorpay order", 
                details: errorMessage 
            }, 
            { status: error?.statusCode || 500 }
        );
    }
}
