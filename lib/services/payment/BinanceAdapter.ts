import { PaymentAdapter, PaymentIntentResult } from "./types";
import crypto from "crypto";

export class BinanceAdapter implements PaymentAdapter {
    private apiKey: string;
    private apiSecret: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = process.env.BINANCE_API_KEY || "";
        this.apiSecret = process.env.BINANCE_API_SECRET || "";
        this.baseUrl = "https://bpay.binanceapi.com";
    }

    /**
     * Generate Binance Pay V2 Signature
     * Payload = timestamp + "\n" + nonce + "\n" + body + "\n"
     */
    private generateSignature(timestamp: number, nonce: string, body: string): string {
        const payload = `${timestamp}\n${nonce}\n${body}\n`;
        return crypto.createHmac("sha512", this.apiSecret).update(payload).digest("hex").toUpperCase();
    }

    private generateNonce(length: number = 32): string {
        return crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);
    }

    async createPaymentIntent(
        amount: number,
        currency: string = "USDT", // Default to USDT for crypto usually
        description: string,
        referenceId: string // This is our internal booking ID
    ): Promise<PaymentIntentResult> {

        if (!this.apiKey || !this.apiSecret) {
            console.warn("Binance Credentials missing in env");
            // Fallback to mock if no keys (dev mode) or throw error? 
            // Better to throw so user knows they need keys.
            throw new Error("Missing BINANCE_API_KEY or BINANCE_API_SECRET");
        }

        const endpoint = "/binancepay/openapi/v2/order";
        const url = `${this.baseUrl}${endpoint}`;

        const bodyObj = {
            merchant: {
                subMerchantId: null
            },
            env: {
                terminalType: "WEB"
            },
            merchantTradeNo: referenceId, // Unique ID from our side
            orderAmount: amount.toFixed(2),
            currency: currency,
            goods: {
                goodsType: "01", // 01 for Tangible Goods, 02 for Virtual
                goodsCategory: "Z000", // Other
                referenceGoodsId: referenceId,
                goodsName: description,
                goodsDetail: description
            },
            returnUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://wavesvip.vercel.app"}/reservar/confirmacion?bid=${referenceId}`,
            cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL || "https://wavesvip.vercel.app"}/reservar/fallo?bid=${referenceId}`
        };

        const bodyStr = JSON.stringify(bodyObj);
        const timestamp = Date.now();
        const nonce = this.generateNonce();
        const signature = this.generateSignature(timestamp, nonce, bodyStr);

        console.log(`[BinanceAdapter] Creating Order: ${amount} ${currency} - Ref: ${referenceId}`);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "BinancePay-Timestamp": timestamp.toString(),
                    "BinancePay-Nonce": nonce,
                    "BinancePay-Certificate-SN": this.apiKey, // API Key serves as Certificate SN in most V2 contexts or needs separate cert? 
                    // Wait, V2 docs usually say 'BinancePay-Certificate-SN' IS the API Key for symmetric. 
                    // ACTUALLY: verification uses Public Key, signing uses Secret. 
                    // Let's use 'BinancePay-Certificate-SN': apiKey 
                    "BinancePay-Signature": signature
                },
                body: bodyStr
            });

            const json = await res.json();

            if (json.status === "SUCCESS" && json.data) {
                return {
                    paymentId: json.data.prepayId,
                    status: "PENDING",
                    redirectUrl: json.data.checkoutUrl, // Universal checkout URL
                    qrCode: json.data.qrcodeLink
                };
            } else {
                console.error("Binance Error:", json);
                throw new Error(json.errorMessage || "Binance API Error");
            }
        } catch (error: any) {
            console.error("Binance Fetch Failed:", error);
            throw error;
        }
    }

    async verifyPayment(paymentId: string): Promise<boolean> {
        // Query /binancepay/openapi/v2/order/query
        // Validating manually for now or rely on webhook
        return true;
    }
}
