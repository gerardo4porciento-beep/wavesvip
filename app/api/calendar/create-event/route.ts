import { NextRequest, NextResponse } from "next/server";
import { createCalendarEvent } from "@/lib/google-calendar";
import type { Booking, Vessel } from "@/types";

/**
 * POST /api/calendar/create-event
 * Crea un evento en Google Calendar después de confirmar un pago
 * Solo debe ser llamado desde webhooks de pago confirmados o desde el sistema interno
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación/autorización
    const authHeader = request.headers.get("authorization");
    const webhookSecret = process.env.WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret no configurado" },
        { status: 500 }
      );
    }

    // Validar que la petición viene de nuestro sistema (webhook o sistema interno)
    if (authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      booking,
      vessel,
      customerEmail,
      customerName,
    }: {
      booking: Booking;
      vessel: Vessel;
      customerEmail: string;
      customerName?: string;
    } = body;

    // Validar datos requeridos
    if (!booking || !vessel || !customerEmail) {
      return NextResponse.json(
        {
          error: "Datos incompletos",
          required: ["booking", "vessel", "customerEmail"],
        },
        { status: 400 }
      );
    }

    // Solo crear evento si el pago está confirmado
    if (booking.paymentStatus !== "completed") {
      return NextResponse.json(
        {
          error: "El pago no está confirmado",
          paymentStatus: booking.paymentStatus,
        },
        { status: 400 }
      );
    }

    // Crear evento en Google Calendar
    const { eventId, htmlLink } = await createCalendarEvent({
      booking,
      vessel,
      customerEmail,
      customerName,
    });

    return NextResponse.json(
      {
        success: true,
        eventId,
        htmlLink,
        message: "Evento creado exitosamente en Google Calendar",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en /api/calendar/create-event:", error);
    return NextResponse.json(
      {
        error: "Error al crear evento en Google Calendar",
        message:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

