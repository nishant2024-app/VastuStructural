import { NextResponse } from "next/server";
export async function POST(req: Request) {
    try {
        const { serviceId, packageType, amount } = await req.json();

        // Note: Payment gateway integration (e.g. Stripe or Razorpay) to be added here for production.

        // Mock response for now
        return NextResponse.json({
            success: true,
            orderId: "order_mock_" + Math.random().toString(36).substring(7),
            amount: amount
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Payment initiation failed" }, { status: 500 });
    }
}
