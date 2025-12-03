import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/payment/create-paypal-order
 * Crea una orden de PayPal para procesar el pago
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = "USD", metadata = {} } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "El monto es requerido y debe ser mayor a 0" },
        { status: 400 }
      );
    }

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "PayPal no está configurado correctamente" },
        { status: 500 }
      );
    }

    // Obtener access token de PayPal
    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenResponse.ok) {
      throw new Error("Error obteniendo token de PayPal");
    }

    const { access_token } = await tokenResponse.json();

    // Crear orden de PayPal
    const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
            description: `Reserva WAVES VIP - ${metadata.guests || ""} personas`,
            custom_id: metadata.bookingId || "",
          },
        ],
        application_context: {
          brand_name: "WAVES VIP",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reservar?payment=success`,
          cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reservar?payment=cancelled`,
        },
      }),
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(errorData.message || "Error creando orden de PayPal");
    }

    const orderData = await orderResponse.json();

    return NextResponse.json(
      {
        orderId: orderData.id,
        approvalUrl: orderData.links?.find((link: any) => link.rel === "approve")?.href,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creando orden de PayPal:", error);
    return NextResponse.json(
      {
        error: "Error al crear el pago",
        message:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

