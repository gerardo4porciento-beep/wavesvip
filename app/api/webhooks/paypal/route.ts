import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhooks/paypal
 * Webhook de PayPal para confirmar pagos y crear eventos en Google Calendar
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  // PayPal envía eventos como PAYMENT.CAPTURE.COMPLETED, PAYMENT.CAPTURE.DENIED, etc.
  const eventType = body.event_type;
  const resource = body.resource;

  if (!eventType || !resource) {
    return NextResponse.json(
      { error: "Formato de webhook inválido" },
      { status: 400 }
    );
  }

  // Validar la firma del webhook (requiere SDK de PayPal)
  // En producción, debes verificar la firma para seguridad
  // const isValid = await verifyPayPalWebhookSignature(request);

  switch (eventType) {
    case "PAYMENT.CAPTURE.COMPLETED": {
      try {
        const captureId = resource.id;
        const customId = resource.custom_id; // Debería contener el bookingId

        // Aquí deberías:
        // 1. Obtener la reserva de la base de datos usando customId
        // 2. Actualizar el estado de pago a "completed"
        // 3. Obtener los datos del vessel y cliente
        // 4. Crear el evento en Google Calendar

        // Ejemplo de flujo:
        // const booking = await getBookingFromDatabase(customId);
        // const vessel = await getVesselFromDatabase(booking.vesselId);
        // const customer = await getCustomerFromDatabase(booking.userId);

        // await updateBookingPaymentStatus(booking.id, "completed", captureId);

        // await createCalendarEvent({
        //   booking: { ...booking, paymentStatus: "completed", paymentId: captureId },
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
        //       customerEmail: resource.payer?.email_address || "",
        //     },
        //   })
        // );

        return NextResponse.json({ received: true });
      } catch (error) {
        console.error("Error procesando pago de PayPal:", error);
        return NextResponse.json(
          { error: "Error procesando pago" },
          { status: 500 }
        );
      }
    }

    case "PAYMENT.CAPTURE.DENIED":
    case "PAYMENT.CAPTURE.REFUNDED": {
      // Actualizar estado de pago en base de datos
      // await updateBookingPaymentStatus(customId, "failed");
      return NextResponse.json({ received: true });
    }

    default:
      console.log(`Evento de PayPal no manejado: ${eventType}`);
      return NextResponse.json({ received: true });
  }
}

