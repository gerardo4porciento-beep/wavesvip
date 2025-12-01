import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createCalendarEvent } from "@/lib/google-calendar";
import type { Booking, Vessel } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
});

/**
 * POST /api/webhooks/stripe
 * Webhook de Stripe para confirmar pagos y crear eventos en Google Calendar
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret no configurado o firma faltante" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verificar la firma del webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Error verificando webhook de Stripe:", err);
    return NextResponse.json(
      { error: "Firma del webhook inválida" },
      { status: 400 }
    );
  }

  // Manejar diferentes tipos de eventos
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Aquí deberías:
      // 1. Obtener la reserva de la base de datos usando paymentIntent.metadata.bookingId
      // 2. Actualizar el estado de pago a "completed"
      // 3. Obtener los datos del vessel y cliente
      // 4. Crear el evento en Google Calendar

      try {
        // Ejemplo de flujo (adaptar según tu esquema de base de datos):
        // const booking = await getBookingFromDatabase(paymentIntent.metadata.bookingId);
        // const vessel = await getVesselFromDatabase(booking.vesselId);
        // const customer = await getCustomerFromDatabase(booking.userId);

        // Actualizar estado de pago en base de datos
        // await updateBookingPaymentStatus(booking.id, "completed", paymentIntent.id);

        // Crear evento en Google Calendar
        // await createCalendarEvent({
        //   booking: { ...booking, paymentStatus: "completed", paymentId: paymentIntent.id },
        //   vessel,
        //   customerEmail: customer.email,
        //   customerName: customer.name,
        // });

        // Llamar a la API interna para crear el evento
        // NOTA: Descomenta y completa cuando tengas la base de datos configurada
        // const webhookSecret = process.env.WEBHOOK_SECRET || "internal-webhook-secret";
        // const calendarResponse = await fetch(
        //   `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/calendar/create-event`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${webhookSecret}`,
        //     },
        //     body: JSON.stringify({
        //       booking: bookingData,
        //       vessel: vesselData,
        //       customerEmail: paymentIntent.receipt_email || "",
        //     },
        //   })
        // );

        return NextResponse.json({ received: true });
      } catch (error) {
        console.error("Error procesando pago de Stripe:", error);
        return NextResponse.json(
          { error: "Error procesando pago" },
          { status: 500 }
        );
      }
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Actualizar estado de pago a "failed" en base de datos
      // await updateBookingPaymentStatus(paymentIntent.metadata.bookingId, "failed");

      return NextResponse.json({ received: true });
    }

    default:
      console.log(`Evento no manejado: ${event.type}`);
      return NextResponse.json({ received: true });
  }
}

