import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

/**
 * POST /api/payment/create-binance-order
 * Crea una orden de Binance Pay para procesar el pago
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = "USDT", metadata = {} } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "El monto es requerido y debe ser mayor a 0" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BINANCE_API_KEY;
    const secretKey = process.env.BINANCE_SECRET_KEY;
    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction
      ? "https://bpay.binanceapi.com"
      : "https://bpay.binanceapi.com"; // Binance Pay usa la misma URL para test y producción

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        { error: "Binance Pay no está configurado correctamente" },
        { status: 500 }
      );
    }

    // Generar timestamp y nonce
    const timestamp = Date.now();
    const nonce = crypto.randomBytes(16).toString("hex");

    // Crear payload
    const orderData = {
      env: {
        terminalType: "WEB",
      },
      merchantTradeNo: `WAVES-${timestamp}-${nonce}`,
      orderAmount: amount,
      currency: currency,
      goods: {
        goodsType: "01",
        goodsCategory: "D000",
        referenceGoodsId: metadata.bookingId || "",
        goodsName: `Reserva WAVES VIP - ${metadata.guests || ""} personas`,
      },
      returnUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reservar?payment=success`,
      cancelUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reservar?payment=cancelled`,
    };

    // Crear firma
    const payload = JSON.stringify(orderData);
    const signature = crypto
      .createHmac("sha512", secretKey)
      .update(payload)
      .digest("hex");

    // Crear orden en Binance Pay
    const orderResponse = await fetch(`${baseUrl}/binancepay/openapi/v2/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "BinancePay-Timestamp": timestamp.toString(),
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": apiKey,
        "BinancePay-Signature": signature,
      },
      body: payload,
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(errorData.message || "Error creando orden de Binance Pay");
    }

    const orderResult = await orderResponse.json();

    if (orderResult.status !== "SUCCESS") {
      throw new Error(orderResult.errorMessage || "Error creando orden de Binance Pay");
    }

    return NextResponse.json(
      {
        orderId: orderResult.data?.prepayId,
        qrCodeUrl: orderResult.data?.qrCodeUrl,
        checkoutUrl: orderResult.data?.checkoutUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creando orden de Binance Pay:", error);
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

