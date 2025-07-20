
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
    try {
        const { amount, currency, notes } = await request.json();
        
        if (!amount || !currency) {
            return NextResponse.json({ error: "Amount and currency are required" }, { status: 400 });
        }

        // IMPORTANT: In a real application, these keys should come from environment variables.
        // We are hardcoding placeholders here to ensure the development environment works reliably.
        // Replace with your actual keys before going to production.
        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID";
        const key_secret = process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET";

        if (key_id === "rzp_test_YOUR_KEY_ID" || key_secret === "YOUR_KEY_SECRET") {
             console.warn("Razorpay keys are not set in environment variables. Using placeholder keys.");
        }

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

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        // It's better to return a structured error message
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: "Failed to create Razorpay order", details: errorMessage }, { status: 500 });
    }
}
