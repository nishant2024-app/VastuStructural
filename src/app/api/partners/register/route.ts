import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name,
            phone,
            email,
            village,
            taluka,
            district,
            companyName,
            experienceYears,
            specialization,
            aboutWork,
        } = body;

        // Validate required fields
        if (!name || !phone || !village || !taluka || !district) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate phone number
        if (phone.length < 10) {
            return NextResponse.json(
                { error: "Invalid phone number" },
                { status: 400 }
            );
        }

        // Generate unique referral code
        const referralCode = `VS${name.slice(0, 2).toUpperCase()}${Date.now().toString(36).toUpperCase().slice(-4)}`;

        // Generate application ID
        const applicationId = `VSP${Date.now().toString(36).toUpperCase()}`;

        // TODO: Store partner application in database
        // const partner = await db.partners.create({
        //     name,
        //     phone,
        //     email,
        //     village,
        //     taluka,
        //     district,
        //     state: "Maharashtra",
        //     companyName,
        //     experienceYears,
        //     specialization,
        //     aboutWork,
        //     referralCode,
        //     status: "pending",
        //     createdAt: new Date(),
        // });

        // TODO: Send SMS notification to partner
        // await sendSMS(phone, `Thank you for applying to VastuStructural Partner Program. Your application ID: ${applicationId}. We will contact you within 24-48 hours.`);

        // TODO: Notify admin of new application
        // await notifyAdmin("New partner application", { name, phone, village, district });

        console.log("Partner application received:", {
            applicationId,
            name,
            phone,
            village,
            district,
            referralCode,
        });

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully",
            applicationId,
            referralCode,
        });
    } catch (error) {
        console.error("Partner registration error:", error);
        return NextResponse.json(
            { error: "Failed to submit application" },
            { status: 500 }
        );
    }
}
