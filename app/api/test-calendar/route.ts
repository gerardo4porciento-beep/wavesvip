
import { NextResponse } from "next/server";
import { getCalendarAvailability } from "@/lib/google-calendar";

export async function GET() {
    try {
        const today = new Date().toISOString().split("T")[0];
        const availability = await getCalendarAvailability({
            startDate: today,
            endDate: today,
            calendarId: process.env.GOOGLE_CALENDAR_ID
        });

        return NextResponse.json({
            status: "OK",
            env: {
                projectId: process.env.GOOGLE_PROJECT_ID || "N/A",
                email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                calendarId: process.env.GOOGLE_CALENDAR_ID,
                keyPrefix: process.env.GOOGLE_PRIVATE_KEY?.substring(0, 20) + "..."
            },
            availability
        });
    } catch (error: any) {
        return NextResponse.json({
            status: "ERROR",
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
