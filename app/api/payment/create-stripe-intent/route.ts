import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

/**
 * POST /api/payment/create-stripe-intent
 * Crea un Payment Intent de Stripe para procesar el pago
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

    // Crear Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency: currency.toLowerCase(),
      metadata: {
        ...metadata,
        createdAt: new Date().toISOString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creando Payment Intent de Stripe:", error);
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










