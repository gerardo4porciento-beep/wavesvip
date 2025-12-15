
export enum PaymentMethod {
    BINANCE = "BINANCE",
    PAYPAL = "PAYPAL",
    UBIPAGOS = "UBIPAGOS",
    MANUAL_UPLOAD = "MANUAL_UPLOAD"
}

export interface PaymentIntentResult {
    paymentId: string; // ID from the provider (e.g., PayPal Order ID)
    status: "PENDING" | "PAID" | "FAILED" | "REQUIRES_ACTION";
    redirectUrl?: string; // For PayPal/Ubipagos redirects or Binance Link
    qrCode?: string; // For Binance QR
    metadata?: any;
}

export interface PaymentAdapter {
    createPaymentIntent(amount: number, currency: string, description: string, referenceId: string): Promise<PaymentIntentResult>;
    verifyPayment(paymentId: string): Promise<boolean>;
}
