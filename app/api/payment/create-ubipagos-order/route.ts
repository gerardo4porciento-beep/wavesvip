import { NextRequest, NextResponse } from "next/server";
import { handlePaymentRequest } from "@/lib/services/paymentFactory";

/**
 * POST /api/payment/create-ubipagos-order
 * Crea una orden de Ubipagos para procesar el pago
 */
export async function POST(request: NextRequest) {
  try {
    const result = await handlePaymentRequest("ubipagos", request);
    return NextResponse.json(
      {
        orderId: result.id,
        redirectUrl: result.redirectUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creando orden de Ubipagos:", error);
    return NextResponse.json(
      {
        error: "Error al crear el pago",
        message: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}



