
import { PaymentAdapter, PaymentIntentResult } from "./types";

export class PayPalAdapter implements PaymentAdapter {
    private clientId: string;
    private clientSecret: string;
    private baseUrl: string;

    constructor() {
        this.clientId = process.env.PAYPAL_CLIENT_ID || "";
        this.clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";
        // Sandbox by default
        this.baseUrl = process.env.PAYPAL_MODE === "live"
            ? "https://api-m.paypal.com"
            : "https://api-m.sandbox.paypal.com";
    }

    private async getAccessToken(): Promise<string> {
        // Basic Auth to get Token
        // POST /v1/oauth2/token
        // grant_type=client_credentials
        return "MOCK_ACCESS_TOKEN";
    }

    async createPaymentIntent(
        amount: number,
        currency: string,
        description: string,
        referenceId: string
    ): Promise<PaymentIntentResult> {
        console.log(`[PayPalAdapter] Creating Order: ${amount} ${currency} - Ref: ${referenceId}`);

        // POST /v2/checkout/orders
        /*
        {
          intent: "CAPTURE",
          purchase_units: [{
            reference_id: referenceId,
            amount: { currency_code: currency, value: amount.toFixed(2) }
          }]
        }
        */

        return {
            paymentId: `PAYPAL_${Date.now()}`,
            status: "PENDING",
            redirectUrl: "https://www.sandbox.paypal.com/checkoutnow?token=mock_token",
        };
    }

    async verifyPayment(paymentId: string): Promise<boolean> {
        // GET /v2/checkout/orders/{id}
        return true;
    }
}
