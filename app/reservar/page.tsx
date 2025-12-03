"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, CreditCard, Users, Check, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import CalendarAvailability from "@/components/CalendarAvailability";

type Step = "guests" | "date" | "summary" | "availability" | "payment";

// Tarifas por cantidad de personas
const PRICING: Record<number, number> = {
  6: 220,
  8: 280,
  10: 320,
  12: 350,
};

const GUEST_OPTIONS = [6, 8, 10, 12] as const;

export default function BookingPage() {
  const [step, setStep] = useState<Step>("guests");
  const [selectedGuests, setSelectedGuests] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availabilityResult, setAvailabilityResult] = useState<{
    available: boolean;
    error?: string;
  } | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const calculateTotal = () => {
    if (!selectedGuests || !selectedDate) return 0;
    return PRICING[selectedGuests] || 0;
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleContinueToSummary = () => {
    if (selectedGuests && selectedDate) {
      setStep("summary");
    }
  };

  const handleAcceptReservation = async () => {
    if (!selectedDate || !selectedGuests) return;

    setIsCheckingAvailability(true);
    setAvailabilityResult(null);

    try {
      // Calcular fecha de fin (asumiendo que es un día completo)
      const startDate = new Date(selectedDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      const response = await fetch("/api/booking/check-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al verificar disponibilidad");
      }

      setAvailabilityResult({
        available: data.available,
      });

      if (data.available) {
        setStep("payment");
      } else {
        setStep("availability");
      }
    } catch (error) {
      console.error("Error verificando disponibilidad:", error);
      setAvailabilityResult({
        available: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      });
      setStep("availability");
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleProcessPayment = async () => {
    if (!selectedPaymentMethod || !selectedGuests || !selectedDate || !total) return;

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      const metadata = {
        guests: selectedGuests.toString(),
        date: selectedDate,
        name: guestInfo.name,
        email: guestInfo.email,
        phone: guestInfo.phone,
      };

      if (selectedPaymentMethod === "stripe") {
        const response = await fetch("/api/payment/create-stripe-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            currency: "USD",
            metadata,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al crear el pago");
        }

        // Redirigir a Stripe Checkout o mostrar formulario de pago
        // Por ahora, mostramos un mensaje de éxito
        alert(`Payment Intent creado: ${data.paymentIntentId}\n\nEn producción, esto redirigiría a Stripe Checkout o mostraría el formulario de pago.`);
      } else if (selectedPaymentMethod === "paypal") {
        const response = await fetch("/api/payment/create-paypal-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            currency: "USD",
            metadata,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al crear el pago");
        }

        // Redirigir a PayPal
        if (data.approvalUrl) {
          window.location.href = data.approvalUrl;
        } else {
          alert(`Orden de PayPal creada: ${data.orderId}\n\nEn producción, esto redirigiría a PayPal.`);
        }
      } else if (selectedPaymentMethod === "binance") {
        const response = await fetch("/api/payment/create-binance-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            currency: "USDT",
            metadata,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al crear el pago");
        }

        // Redirigir a Binance Pay o mostrar QR
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        } else if (data.qrCodeUrl) {
          // Mostrar QR code en un modal o nueva ventana
          window.open(data.qrCodeUrl, "_blank");
        } else {
          alert(`Orden de Binance Pay creada: ${data.orderId}\n\nEn producción, esto mostraría el QR o redirigiría a Binance Pay.`);
        }
      }
    } catch (error) {
      console.error("Error procesando pago:", error);
      setPaymentError(
        error instanceof Error ? error.message : "Error desconocido al procesar el pago"
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const total = calculateTotal();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#B3E5FC] text-luxury-light pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-luxury-light/70 hover:text-luxury-gold transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12 gap-4 md:gap-8">
            {[
              { key: "guests", label: "Personas", icon: Users },
              { key: "date", label: "Fecha", icon: Calendar },
              { key: "summary", label: "Resumen", icon: Check },
              { key: "payment", label: "Pago", icon: CreditCard },
            ].map((s, index) => {
              const stepIndex = ["guests", "date", "summary", "payment"].indexOf(step);
              const isCompleted = index < stepIndex;
              const isCurrent = index === stepIndex;
              const Icon = s.icon;
              return (
                <div key={s.key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-luxury-gold text-luxury-dark"
                          : isCurrent
                          ? "bg-luxury-gold/50 text-white border-2 border-luxury-gold"
                          : "bg-gray-100 text-luxury-light/30"
                      }`}
                    >
                      {isCompleted ? (
                        <Check size={24} />
                      ) : (
                        <Icon size={20} />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm hidden md:block ${
                        isCurrent ? "text-luxury-gold" : "text-luxury-light/50"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`h-1 w-8 md:w-16 mx-2 transition-colors ${
                        isCompleted ? "bg-luxury-gold" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Select Guests */}
              {step === "guests" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selecciona la cantidad de personas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {GUEST_OPTIONS.map((guests) => (
                        <button
                          key={guests}
                          onClick={() => {
                            setSelectedGuests(guests);
                            setStep("date");
                          }}
                          className={`p-6 border-2 rounded-lg transition-all text-center ${
                            selectedGuests === guests
                              ? "border-luxury-gold bg-luxury-gold/10"
                              : "border-gray-200 hover:border-luxury-gold/50 hover:bg-luxury-gold/5"
                          }`}
                        >
                          <Users className="w-8 h-8 mx-auto mb-2 text-luxury-gold" />
                          <div className="text-2xl font-bold">{guests}</div>
                          <div className="text-sm text-luxury-light/70 mt-1">personas</div>
                          <div className="text-lg font-semibold text-luxury-gold mt-2">
                            {formatCurrency(PRICING[guests])}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Select Date */}
              {step === "date" && selectedGuests && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selecciona la fecha</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalendarAvailability
                      startDate={new Date().toISOString().split("T")[0]}
                      endDate={
                        new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split("T")[0]
                      }
                      onDateSelect={handleDateSelect}
                    />
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-2">
                        Fecha seleccionada
                      </label>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep("guests")}
                      >
                        Atrás
                      </Button>
                      <Button
                        onClick={handleContinueToSummary}
                        disabled={!selectedDate}
                        className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark"
                      >
                        Continuar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Summary and Accept */}
              {step === "summary" && selectedGuests && selectedDate && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen de tu reserva</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-luxury-gold/10 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-luxury-light/70">Cantidad de personas</span>
                          <span className="font-bold text-lg">{selectedGuests}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-luxury-light/70">Fecha</span>
                          <span className="font-bold text-lg">{formatDate(selectedDate)}</span>
                        </div>
                        <div className="border-t border-luxury-light/20 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-luxury-light/70">Total</span>
                            <span className="font-bold text-2xl text-luxury-gold">
                              {formatCurrency(total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Nombre Completo
                          </label>
                          <Input
                            value={guestInfo.name}
                            onChange={(e) =>
                              setGuestInfo({ ...guestInfo, name: e.target.value })
                            }
                            placeholder="Juan Pérez"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={guestInfo.email}
                            onChange={(e) =>
                              setGuestInfo({ ...guestInfo, email: e.target.value })
                            }
                            placeholder="juan@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Teléfono
                          </label>
                          <Input
                            type="tel"
                            value={guestInfo.phone}
                            onChange={(e) =>
                              setGuestInfo({ ...guestInfo, phone: e.target.value })
                            }
                            placeholder="+58 412 123 4567"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep("date")}
                      >
                        Atrás
                      </Button>
                      <Button
                        onClick={handleAcceptReservation}
                        disabled={
                          !guestInfo.name || !guestInfo.email || !guestInfo.phone || isCheckingAvailability
                        }
                        className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark"
                      >
                        {isCheckingAvailability ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verificando disponibilidad...
                          </>
                        ) : (
                          "Aceptar y verificar disponibilidad"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Availability Result */}
              {step === "availability" && availabilityResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>Disponibilidad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {availabilityResult.available ? (
                      <div className="text-center py-8">
                        <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">¡Fecha disponible!</h3>
                        <p className="text-luxury-light/70 mb-6">
                          Procede al pago para confirmar tu reserva.
                        </p>
                        <Button
                          onClick={() => setStep("payment")}
                          className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark"
                        >
                          Continuar al pago
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Fecha no disponible</h3>
                        <p className="text-luxury-light/70 mb-6">
                          {availabilityResult.error || "Lo sentimos, esta fecha ya está reservada. Por favor, selecciona otra fecha."}
                        </p>
                        <Button
                          onClick={() => {
                            setStep("date");
                            setSelectedDate("");
                            setAvailabilityResult(null);
                          }}
                          variant="outline"
                        >
                          Seleccionar otra fecha
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 5: Payment */}
              {step === "payment" && availabilityResult?.available && (
                <Card>
                  <CardHeader>
                    <CardTitle>Completar Pago</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-luxury-light/70 mb-6">
                        Selecciona tu método de pago preferido:
                      </p>
                      <div className="grid gap-4">
                        <button
                          onClick={() => setSelectedPaymentMethod("stripe")}
                          className={`p-4 border-2 rounded-lg transition-all text-left ${
                            selectedPaymentMethod === "stripe"
                              ? "border-luxury-gold bg-luxury-gold/10"
                              : "border-luxury-light/10 hover:border-luxury-gold"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold block">Tarjeta de Crédito/Débito</span>
                              <span className="text-sm text-luxury-light/60">Visa, Mastercard, Amex</span>
                            </div>
                            <span className="text-sm text-luxury-light/60">Stripe</span>
                          </div>
                        </button>
                        <button
                          onClick={() => setSelectedPaymentMethod("paypal")}
                          className={`p-4 border-2 rounded-lg transition-all text-left ${
                            selectedPaymentMethod === "paypal"
                              ? "border-luxury-gold bg-luxury-gold/10"
                              : "border-luxury-light/10 hover:border-luxury-gold"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold block">PayPal</span>
                              <span className="text-sm text-luxury-light/60">Paga con tu cuenta PayPal</span>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => setSelectedPaymentMethod("binance")}
                          className={`p-4 border-2 rounded-lg transition-all text-left ${
                            selectedPaymentMethod === "binance"
                              ? "border-luxury-gold bg-luxury-gold/10"
                              : "border-luxury-light/10 hover:border-luxury-gold"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-semibold block">Criptomonedas</span>
                              <span className="text-sm text-luxury-light/60">BTC, ETH, BNB y más</span>
                            </div>
                            <span className="text-sm text-luxury-light/60">Binance Pay</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    {paymentError && (
                      <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-400 text-sm">{paymentError}</p>
                      </div>
                    )}
                    <div className="mt-6 flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep("summary")}
                        disabled={isProcessingPayment}
                      >
                        Atrás
                      </Button>
                      <Button
                        onClick={handleProcessPayment}
                        disabled={!selectedPaymentMethod || isProcessingPayment}
                        className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark"
                      >
                        {isProcessingPayment ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Procesando...
                          </>
                        ) : (
                          <>
                            {selectedPaymentMethod === "stripe" && "Pagar con Stripe"}
                            {selectedPaymentMethod === "paypal" && "Pagar con PayPal"}
                            {selectedPaymentMethod === "binance" && "Pagar con Binance Pay"}
                            {!selectedPaymentMethod && "Selecciona un método de pago"}
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Reservation Summary */}
            {step !== "guests" && selectedGuests && (
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Resumen de Reserva</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-luxury-gold" />
                        <h3 className="font-bold text-lg">{selectedGuests} personas</h3>
                      </div>
                    </div>

                    {selectedDate && (
                      <div className="border-t border-luxury-light/10 pt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-luxury-light/70">Fecha</span>
                          <span>{formatDate(selectedDate)}</span>
                        </div>
                      </div>
                    )}

                    {total > 0 && (
                      <div className="border-t border-luxury-light/10 pt-4 space-y-2">
                        <div className="flex justify-between text-xl font-bold text-luxury-gold pt-4 border-t border-luxury-light/10">
                          <span>Total</span>
                          <span>{formatCurrency(total)}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
