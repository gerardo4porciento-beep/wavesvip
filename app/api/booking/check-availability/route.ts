
import { NextRequest, NextResponse } from "next/server";

/**
 * Temporal: siempre retorna disponible para evitar dependencias de Google Calendar.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, capacity } = body;

    if (!date || !capacity) {
      return NextResponse.json({ error: "Missing date or capacity" }, { status: 400 });
    }

    // Validación básica de fecha
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    // Siempre disponible
    return NextResponse.json({ available: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
