
"use client";

import { useState } from "react";
import { CapacitySelector } from "./CapacitySelector";
import { DateCalendar } from "./DateCalendar";
import { PaymentGateways } from "./PaymentGateways";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PaymentMethod } from "@/lib/services/payment/types";

type Step = 1 | 2 | 3 | 4;

export function BookingWizard() {
  const [step, setStep] = useState<Step>(1);

  // State
  const [capacity, setCapacity] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Custom Form Data (Using state for simplicity in this replacement)
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.BINANCE);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  // Handlers
  const handleCapacitySelect = (cap: number) => {
    setCapacity(cap);
    setStep(2);
  };

  const handleDateSelect = (d: Date | undefined) => {
    if (d) setDate(d);
  };

  const handlePayment = async () => {
    if (!capacity || !date || !customerName || !customerEmail) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: customerName, email: customerEmail, phone: customerPhone },
          details: {
            capacity,
            startDate: date.toISOString(),
            endDate: date.toISOString(),
            totalPrice: 1000,
          },
          payment: {
            method: paymentMethod,
            amount: 1000,
            currency: "USD",
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al procesar reserva");

      setPaymentResult(data);
      setStep(4);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-1 md:p-2 h-full flex flex-col justify-center">
      <div className="bg-black/90 backdrop-blur-md border border-neutral-800 rounded-3xl p-4 md:p-8 shadow-2xl relative overflow-hidden mt-0 w-full">
        {/* Progress Indicator (Integrated) - Compact */}
        <div className="flex justify-between mb-4 relative max-w-md mx-auto scale-90">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-neutral-800 -z-10" />
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border-2 transition-all duration-300 bg-black",
                step >= s
                  ? "border-luxury-gold text-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                  : "border-neutral-700 text-neutral-600"
              )}
            >
              {s}
            </div>
          ))}
        </div>
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-4xl md:text-5xl text-center font-display text-white">
              Selecciona tu <span className="text-luxury-gold">Experiencia</span>
            </h2>
            <CapacitySelector selectedCapacity={capacity} onSelect={handleCapacitySelect} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button variant="ghost" onClick={() => setStep(1)} className="text-neutral-400 hover:text-white pl-0">
              <ArrowLeft className="w-5 h-5 mr-2" /> Volver
            </Button>

            <h2 className="text-3xl md:text-4xl text-center font-display text-white mb-8">
              Elige tu <span className="text-luxury-gold">Fecha</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 flex justify-center">
                <DateCalendar
                  date={date}
                  onDateSelect={handleDateSelect}
                  capacity={capacity || 0}
                />
              </div>

              <div className="space-y-8">
                <div className="bg-neutral-900/30 p-8 rounded-2xl border border-neutral-800 space-y-6">
                  <h3 className="text-xl text-luxury-gold font-display">Tus Datos</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-neutral-400 mb-2 block">Nombre Completo</Label>
                      <input
                        placeholder="Tu nombre"
                        className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none transition-colors placeholder:text-neutral-700"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-neutral-400 mb-2 block">Email</Label>
                      <input
                        type="email"
                        placeholder="tucorreo@ejemplo.com"
                        className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none transition-colors placeholder:text-neutral-700"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-neutral-400 mb-2 block">Teléfono</Label>
                      <input
                        placeholder="+58..."
                        className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-luxury-gold focus:outline-none transition-colors placeholder:text-neutral-700"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!customerName || !customerEmail || !date}
                    className="bg-luxury-gold text-black hover:bg-white hover:text-black font-bold text-lg px-8 py-6 rounded-full w-full transition-all duration-300"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button variant="ghost" onClick={() => setStep(2)} className="text-neutral-400 hover:text-white pl-0">
              <ArrowLeft className="w-5 h-5 mr-2" /> Volver
            </Button>

            <h2 className="text-3xl md:text-4xl text-center font-display text-white mb-8">
              Método de <span className="text-luxury-gold">Pago</span>
            </h2>

            <div className="max-w-3xl mx-auto">
              <PaymentGateways
                availableMethods={[PaymentMethod.BINANCE, PaymentMethod.PAYPAL, PaymentMethod.UBIPAGOS]}
                selectedMethod={paymentMethod}
                onSelectMethod={setPaymentMethod}
                onFileUpload={setReceiptUrl}
              />
            </div>

            <div className="flex justify-center mt-12">
              <Button
                onClick={handlePayment}
                disabled={loading}
                className="bg-luxury-gold text-black hover:bg-white hover:text-black font-bold px-12 py-6 text-lg rounded-full min-w-[300px] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500"
              >
                {loading ? "Procesando Reserva..." : "Confirmar y Pagar"}
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-20 animate-in zoom-in duration-500 space-y-8">
            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-5xl font-display text-white">¡Reserva <span className="text-green-500">Confirmada!</span></h2>
            <p className="text-neutral-400 text-xl max-w-lg mx-auto leading-relaxed">
              Hemos enviado los detalles a <b>{customerEmail}</b>.<br />
              Tu aventura VIP está lista para comenzar.
            </p>

            {paymentResult?.payment?.redirectUrl && (
              <Button asChild className="mt-8 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg">
                <a href={paymentResult.payment.redirectUrl} target="_blank" rel="noopener noreferrer">
                  Completar Pago
                </a>
              </Button>
            )}

            <div className="pt-12">
              <Button variant="outline" onClick={() => window.location.reload()} className="border-neutral-700 text-neutral-400 hover:text-white hover:border-white">
                Volver al Inicio
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

