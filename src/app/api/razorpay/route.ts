
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Initialize genkit to access secrets
genkit({
  plugins: [googleAI()],
});


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
    try {
        const { amount, currency, notes } = await request.json();
        
        if (!amount || !currency) {
            return NextResponse.json({ error: "Amount and currency are required" }, { status: 400, headers: corsHeaders });
        }

        // Correctly access secrets using genkit's config()
        const key_id = genkit.config.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID";
        const key_secret = genkit.config.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET";

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

        return NextResponse.json(order, { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        // It's better to return a structured error message
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: "Failed to create Razorpay order", details: errorMessage }, { status: 500, headers: corsHeaders });
    }
}
