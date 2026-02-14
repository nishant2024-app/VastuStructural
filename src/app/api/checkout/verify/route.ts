import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            planId,
            customerName,
            customerPhone,
            customerEmail,
            referralCode,
        } = body;

        // Verify signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(sign)
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            return NextResponse.json(
                { error: "Payment verification failed" },
                { status: 400 }
            );
        }

        // Generate order ID
        const orderId = `VS${Date.now().toString(36).toUpperCase()}`;

        // TODO: Store order in database
        // const order = await db.orders.create({
        //     orderId,
        //     planId,
        //     customerName,
        //     customerPhone,
        //     customerEmail,
        //     razorpayOrderId: razorpay_order_id,
        //     razorpayPaymentId: razorpay_payment_id,
        //     referralCode,
        //     status: 'paid',
        //     paidAt: new Date(),
        // });

        // TODO: Send confirmation email/SMS

        // TODO: If referral code exists, credit partner commission

        return NextResponse.json({
            success: true,
            message: "Payment verified successfully",
            orderId: orderId,
            paymentId: razorpay_payment_id,
        });
    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.json(
            { error: "Payment verification failed" },
            { status: 500 }
        );
    }
}
