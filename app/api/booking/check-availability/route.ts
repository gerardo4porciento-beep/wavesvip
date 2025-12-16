import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Checks if a specific date and capacity are available.
 * Uses the native 'bookings' table.
 */
export async function POST(req: NextRequest) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing in environment variables.");
      return NextResponse.json({ error: "Configuration Error: Missing Service Key" }, { status: 500 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();
    const { date, capacity } = body;

    if (!date || !capacity) {
      return NextResponse.json({ error: "Missing date or capacity" }, { status: 400 });
    }

    const bookingDate = date.split("T")[0]; // Use YYYY-MM-DD

    // Check if any booking exists for this capacity on this date
    // that is NOT cancelled or failed.
    // 'status' check: We consider PENDING_PAYMENT, PAID, CONFIRMED as blocking.
    const { data, error } = await supabase
      .from("bookings")
      .select("id")
      .eq("capacity", capacity)
      .eq("booking_date", bookingDate)
      .not("status", "in", "('CANCELLED')") // Exclude cancelled
      .maybeSingle();

    if (error) {
      console.error("Db Check Error", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // If data exists, it IS booked (not available)
    const isAvailable = !data;

    return NextResponse.json({ available: isAvailable });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
