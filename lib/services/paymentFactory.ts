import type { NextRequest } from "next/server";

export type PaymentProvider = "binance" | "paypal" | "ubipagos";

export interface PaymentRequest {
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  provider: PaymentProvider;
  id?: string;
  approvalUrl?: string;
  checkoutUrl?: string;
  qrCodeUrl?: string;
  redirectUrl?: string;
}

export interface PaymentAdapter {
  createPayment(payload: PaymentRequest): Promise<PaymentResponse>;
}

class BinanceAdapter implements PaymentAdapter {
  async createPayment(payload: PaymentRequest): Promise<PaymentResponse> {
    const { amount, currency, metadata = {} } = payload;

    if (!amount || amount <= 0) {
      throw new Error("El monto es requerido y debe ser mayor a 0");
    }

    const apiKey = process.env.BINANCE_API_KEY;
    const secretKey = process.env.BINANCE_SECRET_KEY;
    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction
      ? "https://bpay.binanceapi.com"
      : "https://bpay.binanceapi.com";

    if (!apiKey || !secretKey) {
      throw new Error("Binance Pay no está configurado correctamente");
    }

    const crypto = await import("crypto");

    const timestamp = Date.now();
    const nonce = crypto.randomBytes(16).toString("hex");

    const merchantTradeNo =
      (metadata.bookingId as string | undefined) ||
      `WAVES-${timestamp}-${nonce}`;

    const orderData = {
      env: {
        terminalType: "WEB",
      },
      merchantTradeNo,
      orderAmount: amount,
      currency,
      goods: {
        goodsType: "01",
        goodsCategory: "D000",
        referenceGoodsId: metadata.bookingId || "",
        goodsName: `Reserva WAVES VIP - ${metadata.capacity || ""} personas`,
      },
      returnUrl: `${
        process.env.NEXTAUTH_URL || "http://localhost:3000"
      }/reservar?payment=success`,
      cancelUrl: `${
        process.env.NEXTAUTH_URL || "http://localhost:3000"
      }/reservar?payment=cancelled`,
    };

    const payloadString = JSON.stringify(orderData);
    const signature = crypto
      .createHmac("sha512", secretKey)
      .update(payloadString)
      .digest("hex");

    const orderResponse = await fetch(`${baseUrl}/binancepay/openapi/v2/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "BinancePay-Timestamp": timestamp.toString(),
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": apiKey,
        "BinancePay-Signature": signature,
      },
      body: payloadString,
    });

    const orderResult = await orderResponse.json();

    if (!orderResponse.ok || orderResult.status !== "SUCCESS") {
      throw new Error(orderResult.errorMessage || "Error creando orden de Binance Pay");
    }

    return {
      provider: "binance",
      id: orderResult.data?.prepayId,
      qrCodeUrl: orderResult.data?.qrCodeUrl,
      checkoutUrl: orderResult.data?.checkoutUrl,
    };
  }
}

class PaypalAdapter implements PaymentAdapter {
  async createPayment(payload: PaymentRequest): Promise<PaymentResponse> {
    const { amount, currency, metadata = {} } = payload;

    if (!amount || amount <= 0) {
      throw new Error("El monto es requerido y debe ser mayor a 0");
    }

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = isProduction
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";

    if (!clientId || !clientSecret) {
      throw new Error("PayPal no está configurado correctamente");
    }

    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenResponse.ok) {
      throw new Error("Error obteniendo token de PayPal");
    }

    const { access_token } = await tokenResponse.json();

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
            description: `Reserva WAVES VIP - ${metadata.capacity || ""} personas`,
            custom_id: metadata.bookingId || "",
          },
        ],
        application_context: {
          brand_name: "WAVES VIP",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }/reservar?payment=success`,
          cancel_url: `${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }/reservar?payment=cancelled`,
        },
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      throw new Error(orderData.message || "Error creando orden de PayPal");
    }

    return {
      provider: "paypal",
      id: orderData.id,
      approvalUrl: orderData.links?.find((link: any) => link.rel === "approve")
        ?.href,
    };
  }
}

class UbipagosAdapter implements PaymentAdapter {
  async createPayment(payload: PaymentRequest): Promise<PaymentResponse> {
    const { amount, currency, metadata = {} } = payload;

    const baseUrl = process.env.UBIPAGOS_BASE_URL;
    const apiKey = process.env.UBIPAGOS_API_KEY;

    if (!baseUrl || !apiKey) {
      throw new Error("Ubipagos no está configurado correctamente");
    }

    const response = await fetch(`${baseUrl}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        metadata,
        return_url: `${
          process.env.NEXTAUTH_URL || "http://localhost:3000"
        }/reservar?payment=success`,
        cancel_url: `${
          process.env.NEXTAUTH_URL || "http://localhost:3000"
        }/reservar?payment=cancelled`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error creando pago en Ubipagos");
    }

    return {
      provider: "ubipagos",
      id: data.id,
      redirectUrl: data.redirect_url || data.redirectUrl,
    };
  }
}

export function getPaymentAdapter(provider: PaymentProvider): PaymentAdapter {
  switch (provider) {
    case "binance":
      return new BinanceAdapter();
    case "paypal":
      return new PaypalAdapter();
    case "ubipagos":
      return new UbipagosAdapter();
    default:
      throw new Error(`Proveedor de pago no soportado: ${provider satisfies never}`);
  }
}

/**
 * Helper para usar fácilmente en rutas API (Next.js route handlers).
 */
export async function handlePaymentRequest(
  provider: PaymentProvider,
  request: NextRequest
): Promise<PaymentResponse> {
  const body = await request.json();
  const { amount, currency, metadata } = body as PaymentRequest;

  const adapter = getPaymentAdapter(provider);
  return adapter.createPayment({ amount, currency, metadata });
}


