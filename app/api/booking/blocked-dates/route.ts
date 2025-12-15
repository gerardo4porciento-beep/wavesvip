
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const capacity = searchParams.get("capacity");
        const month = searchParams.get("month"); // Optional: Filter by month (YYYY-MM) if needed optimization

        if (!capacity) {
            return NextResponse.json({ error: "Missing capacity" }, { status: 400 });
        }

        let query = supabase
            .from("bookings")
            .select("booking_date")
            .eq("capacity", Number(capacity))
            .not("status", "in", "('CANCELLED')");

        if (month) {
            query = query.like("booking_date", `${month}%`);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Error fetching blocked dates:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        // Return array of strings ["YYYY-MM-DD", ...]
        const blockedDates = data.map((b) => b.booking_date);

        return NextResponse.json({ blockedDates });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
