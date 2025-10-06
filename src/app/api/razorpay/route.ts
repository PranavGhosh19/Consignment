
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
    try {
        const { amount, currency, notes } = await request.json();
        
        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!key_id || !key_secret) {
            console.error("Razorpay API keys are not configured in environment variables.");
            return NextResponse.json(
                { error: "Payment gateway is not configured. Please contact support." }, 
                { status: 500 }
            );
        }

        const instance = new Razorpay({
            key_id,
            key_secret,
        });

        const options = {
            amount: amount,
            currency: currency,
            receipt: `receipt_order_${new Date().getTime()}`,
            notes: notes,
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return NextResponse.json(
                { error: "Could not create Razorpay order." }, 
                { status: 500 }
            );
        }
        
        return NextResponse.json(order);

    } catch (error: any) {
        console.error("Razorpay API Error:", error);

        // Check if it's a Razorpay-specific error with a description
        if (error.error && error.error.description) {
             return NextResponse.json(
                { error: error.error.description }, 
                { status: error.statusCode || 500 }
            );
        }
        
        // Fallback for other types of errors
        return NextResponse.json(
            { error: error.message || "An unknown Razorpay integration error occurred" }, 
            { status: 500 }
        );
    }
}
