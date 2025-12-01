import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * POST /api/webhooks/binance
 * Webhook de Binance Pay para confirmar pagos y crear eventos en Google Calendar
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Binance Pay envía eventos como PAYMENT_SUCCESS, PAYMENT_FAILED, etc.
  const eventType = body.bizType;
  const data = body.data;

  if (!eventType || !data) {
    return NextResponse.json(
      { error: "Formato de webhook inválido" },
      { status: 400 }
    );
  }

  // Validar la firma del webhook de Binance
  const signature = request.headers.get("binancepay-signature");
  const timestamp = request.headers.get("binancepay-timestamp");
  const nonce = request.headers.get("binancepay-nonce");

  if (!signature || !timestamp || !nonce) {
    return NextResponse.json(
      { error: "Headers de Binance faltantes" },
      { status: 400 }
    );
  }

  // Verificar firma (Binance Pay usa SHA256)
  const apiKey = process.env.BINANCE_API_KEY || "";
  const secretKey = process.env.BINANCE_SECRET_KEY || "";

  const payload = `${timestamp}\n${nonce}\n${JSON.stringify(body)}\n`;
  const expectedSignature = crypto
    .createHmac("sha512", secretKey)
    .update(payload)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json(
      { error: "Firma del webhook inválida" },
      { status: 401 }
    );
  }

  switch (eventType) {
    case "PAYMENT_SUCCESS": {
      try {
        const merchantTradeNo = data.merchantTradeNo; // Debería contener el bookingId
        const transactionId = data.transactionId;

        // Aquí deberías:
        // 1. Obtener la reserva de la base de datos usando merchantTradeNo
        // 2. Verificar que el monto coincida
        // 3. Actualizar el estado de pago a "completed"
        // 4. Obtener los datos del vessel y cliente
        // 5. Crear el evento en Google Calendar

        // Ejemplo de flujo:
        // const booking = await getBookingFromDatabase(merchantTradeNo);
        // if (booking.totalPrice !== parseFloat(data.totalFee)) {
        //   return NextResponse.json({ error: "Monto no coincide" }, { status: 400 });
        // }

        // await updateBookingPaymentStatus(booking.id, "completed", transactionId);

        // const vessel = await getVesselFromDatabase(booking.vesselId);
        // const customer = await getCustomerFromDatabase(booking.userId);

        // await createCalendarEvent({
        //   booking: { ...booking, paymentStatus: "completed", paymentId: transactionId },
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
        //       customerEmail: data.buyer?.email || "",
        //     },
        //   })
        // );

        return NextResponse.json({ received: true });
      } catch (error) {
        console.error("Error procesando pago de Binance:", error);
        return NextResponse.json(
          { error: "Error procesando pago" },
          { status: 500 }
        );
      }
    }

    case "PAYMENT_FAILED":
    case "PAYMENT_REFUND": {
      // Actualizar estado de pago en base de datos
      // await updateBookingPaymentStatus(merchantTradeNo, "failed");
      return NextResponse.json({ received: true });
    }

    default:
      console.log(`Evento de Binance no manejado: ${eventType}`);
      return NextResponse.json({ received: true });
  }
}

