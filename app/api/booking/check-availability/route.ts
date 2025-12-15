
import { NextRequest, NextResponse } from "next/server";
import { getCalendarAvailability } from "@/lib/google-calendar";
import { getBoatByCapacity } from "@/lib/config/boats";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, capacity } = body;

    if (!date || !capacity) {
      return NextResponse.json({ error: "Missing date or capacity" }, { status: 400 });
    }

    const boat = getBoatByCapacity(Number(capacity));
    if (!boat) {
      return NextResponse.json({ error: "Invalid capacity" }, { status: 400 });
    }

    // Pass the specific calendar ID for this boat
    // Note: getCalendarAvailability needs to be updated to accept calendarId!
    // I previously updated getGoogleCalendarAuth in step 2.
    // I ALSO need to update getCalendarAvailability signature in google-calendar.ts (I only updated Auth).
    // Wait, I only updated `getGoogleCalendarAuth`. `getCalendarAvailability` uses `getGoogleCalendarAuth`,
    // so I need to pass the ID through.

    // !!! CRITICAL FIX: I need to update `lib/google-calendar.ts` again to make sure `getCalendarAvailability` 
    // accepts and passes the ID. For now I will assume I will fix it in next step or now. 
    // Actually, I can do it right now by calling `getGoogleCalendarAuth(boat.calendarId)` inside the function if I modify it.

    // Let's modify `getCalendarAvailability` in `lib/google-calendar.ts` first? 
    // Or I can just import `getGoogleCalendarAuth` here and do the logic manually? 
    // Better to use the helper.

    // I will write this file assuming the helper `getCalendarAvailability` accepts an optional third argument `calendarId`.
    // I will Apply that fix to `lib/google-calendar.ts` in the next turn if I missed it.
    // Looking back at my `replace_file_content` call, I only updated `getGoogleCalendarAuth`.
    // The `getCalendarAvailability` function calls `getGoogleCalendarAuth()`.
    // I need to update `getCalendarAvailability` to accept `calendarId` and pass it to `auth`.

    // TEMPORARY: I will use a local implementation or just reference the updated function which I WILL UPDATE shortly.
    // Let's write this code assuming the update happens.

    const availability = await getCalendarAvailability({
      startDate: date,
      endDate: date, // Check just that day
      calendarId: boat.calendarId
    });

    const isAvailable = availability.length > 0 && availability[0].available;

    return NextResponse.json({ available: isAvailable });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
