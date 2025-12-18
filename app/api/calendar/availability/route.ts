import { NextRequest, NextResponse } from "next/server";
import { getCalendarAvailability } from "@/lib/google-calendar";

export const dynamic = 'force-dynamic';


/**
 * GET /api/calendar/availability
 * Retorna la disponibilidad del calendario para un rango de fechas
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate y endDate son requeridos" },
        { status: 400 }
      );
    }

    // Validar formato de fechas
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: "Formato de fecha inválido" },
        { status: 400 }
      );
    }

    if (start > end) {
      return NextResponse.json(
        { error: "startDate debe ser anterior a endDate" },
        { status: 400 }
      );
    }

    // Límite de rango: máximo 3 meses
    const maxRange = 90 * 24 * 60 * 60 * 1000; // 90 días en milisegundos
    if (end.getTime() - start.getTime() > maxRange) {
      return NextResponse.json(
        { error: "El rango de fechas no puede exceder 90 días" },
        { status: 400 }
      );
    }

    const availability = await getCalendarAvailability({ startDate, endDate });

    return NextResponse.json({ availability }, { status: 200 });
  } catch (error) {
    console.error("Error en /api/calendar/availability:", error);
    return NextResponse.json(
      {
        error: "Error al obtener disponibilidad",
        message:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

