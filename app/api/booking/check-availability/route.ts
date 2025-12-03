import { NextRequest, NextResponse } from "next/server";
import { getCalendarAvailability } from "@/lib/google-calendar";

/**
 * POST /api/booking/check-availability
 * Verifica si una fecha específica está disponible
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { startDate, endDate } = body;

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

    // Obtener disponibilidad para el rango de fechas
    const availability = await getCalendarAvailability({ startDate, endDate });

    // Verificar si todas las fechas en el rango están disponibles
    const allAvailable = availability.every((item) => item.available);

    return NextResponse.json(
      { 
        available: allAvailable,
        availability 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verificando disponibilidad:", error);
    return NextResponse.json(
      {
        error: "Error al verificar disponibilidad",
        message:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

