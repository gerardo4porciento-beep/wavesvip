import { NextRequest, NextResponse } from "next/server";
import { handlePaymentRequest } from "@/lib/services/paymentFactory";

/**
 * POST /api/payment/create-binance-order
 * Crea una orden de Binance Pay para procesar el pago
 */
export async function POST(request: NextRequest) {
  try {
    const result = await handlePaymentRequest("binance", request);
    return NextResponse.json(
      {
        orderId: result.id,
        qrCodeUrl: result.qrCodeUrl,
        checkoutUrl: result.checkoutUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creando orden de Binance Pay:", error);
    return NextResponse.json(
      {
        error: "Error al crear el pago",
        message: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
