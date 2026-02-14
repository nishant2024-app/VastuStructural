import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const PLANS = {
    basic: { name: "Basic Plan", amount: 299900 }, // Amount in paise
    standard: { name: "Standard Plan", amount: 999900 },
    premium: { name: "Premium Plan", amount: 2499900 },
};

// Initialize Razorpay lazily to avoid build-time errors
let razorpay: Razorpay | null = null;

function getRazorpay() {
    if (!razorpay) {
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        if (!keyId || !keySecret) {
            throw new Error("Razorpay keys not configured");
        }

        razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });
    }
    return razorpay;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { planId, customerName, customerPhone, customerEmail, referralCode } = body;

        // Validate plan
        if (!planId || !PLANS[planId as keyof typeof PLANS]) {
            return NextResponse.json(
                { error: "Invalid plan selected" },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!customerName || !customerPhone) {
            return NextResponse.json(
                { error: "Name and phone number are required" },
                { status: 400 }
            );
        }

        const plan = PLANS[planId as keyof typeof PLANS];

        // Get Razorpay instance
        let razorpayInstance;
        try {
            razorpayInstance = getRazorpay();
        } catch {
            return NextResponse.json(
                { error: "Payment system not configured. Please contact support." },
                { status: 503 }
            );
        }

        // Create Razorpay order
        const order = await razorpayInstance.orders.create({
            amount: plan.amount,
            currency: "INR",
            receipt: `order_${Date.now()}`,
            notes: {
                plan_id: planId,
                customer_name: customerName,
                customer_phone: customerPhone,
                customer_email: customerEmail || "",
                referral_code: referralCode || "",
            },
        });

        return NextResponse.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            planName: plan.name,
        });
    } catch (error) {
        console.error("Razorpay order creation error:", error);
        return NextResponse.json(
            { error: "Failed to create order. Please try again." },
            { status: 500 }
        );
    }
}
