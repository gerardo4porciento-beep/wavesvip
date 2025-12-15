
import { BinanceAdapter } from "./BinanceAdapter";
import { PayPalAdapter } from "./PayPalAdapter";
import { UbipagosAdapter } from "./UbipagosAdapter";
import { PaymentAdapter, PaymentMethod } from "./types";

export class PaymentFactory {
    static getAdapter(method: PaymentMethod): PaymentAdapter {
        switch (method) {
            case PaymentMethod.BINANCE:
                return new BinanceAdapter();
            case PaymentMethod.PAYPAL:
                return new PayPalAdapter();
            case PaymentMethod.UBIPAGOS:
                return new UbipagosAdapter();
            default:
                throw new Error(`Payment method ${method} not supported`);
        }
    }
}
