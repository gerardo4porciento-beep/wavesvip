"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, CreditCard, User, Check } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils";
import CalendarAvailability from "@/components/CalendarAvailability";
import type { Vessel } from "@/types";

// Datos de ejemplo - En producción vendrán de Supabase
const vessels: Vessel[] = [
  {
    id: "1",
    name: "Yate Premium 50",
    description:
      "Embarcación de lujo de 50 pies, equipada con todas las comodidades para una experiencia inolvidable en Morrocoy.",
    capacity: 12,
    pricePerDay: 1500,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    ],
    features: [
      "Aire acondicionado",
      "Cocina completa",
      "WiFi",
      "Equipo de sonido",
      "Esnórquel incluido",
    ],
    specifications: {
      length: "50 pies",
      year: 2023,
      engine: "Twin Diesel 800hp",
    },
    available: true,
  },
  {
    id: "2",
    name: "Lancha Deportiva Elite",
    description:
      "Velocidad y estilo se combinan en esta embarcación deportiva ideal para grupos pequeños que buscan aventura.",
    capacity: 6,
    pricePerDay: 800,
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800",
    ],
    features: [
      "Velocidad máxima",
      "Sistema de sonido",
      "Equipamiento de pesca",
      "Esnórquel",
    ],
    specifications: {
      length: "32 pies",
      year: 2024,
      engine: "Dual Outboard 400hp",
    },
    available: true,
  },
  {
    id: "3",
    name: "Catamarán de Lujo",
    description:
      "Amplio y estable, perfecto para grupos grandes que desean disfrutar del mar con máximo confort y espacio.",
    capacity: 20,
    pricePerDay: 2500,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    ],
    features: [
      "Amplios espacios",
      "Terraza superior",
      "Bar completo",
      "Cabañas",
      "Sistema de entretenimiento",
    ],
    specifications: {
      length: "65 pies",
      year: 2023,
      engine: "Twin Diesel 1200hp",
    },
    available: true,
  },
];

type Step = "vessel" | "date" | "guest" | "payment";

export default function BookingPage() {
  const [step, setStep] = useState<Step>("vessel");
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Obtener vesselId de la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vesselId = params.get("vessel");
    if (vesselId) {
      const vessel = vessels.find((v) => v.id === vesselId);
      if (vessel) {
        setSelectedVessel(vessel);
        setStep("date");
      }
    }
  }, []);

  const calculateTotal = () => {
    if (!selectedVessel || !startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    return days * selectedVessel.pricePerDay;
  };

  const handleDateSelect = (date: string) => {
    if (!startDate) {
      setStartDate(date);
    } else if (!endDate && date > startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate("");
    }
  };

  const total = calculateTotal();
  const days = startDate && endDate
    ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-luxury-light pt-24 pb-12 px-4">
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
              { key: "vessel", label: "Embarcación", icon: User },
              { key: "date", label: "Fecha", icon: Calendar },
              { key: "guest", label: "Datos", icon: User },
              { key: "payment", label: "Pago", icon: CreditCard },
            ].map((s, index) => {
              const stepIndex = ["vessel", "date", "guest", "payment"].indexOf(step);
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
              {/* Step 1: Select Vessel */}
              {step === "vessel" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selecciona tu Embarcación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vessels.map((vessel) => (
                        <button
                          key={vessel.id}
                          onClick={() => {
                            setSelectedVessel(vessel);
                            setStep("date");
                          }}
                          className="w-full text-left p-4 border border-luxury-light/10 rounded-lg hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all"
                        >
                          <div className="flex gap-4">
                            <img
                              src={vessel.images[0]}
                              alt={vessel.name}
                              className="w-24 h-24 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-1">
                                {vessel.name}
                              </h3>
                              <p className="text-luxury-light/70 text-sm mb-2 line-clamp-2">
                                {vessel.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-luxury-gold font-bold">
                                  {formatCurrency(vessel.pricePerDay)}/día
                                </span>
                                <span className="text-sm text-luxury-light/60">
                                  {vessel.capacity} personas
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Select Date */}
              {step === "date" && selectedVessel && (
                <Card>
                  <CardHeader>
                    <CardTitle>Selecciona tus Fechas</CardTitle>
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
                    <div className="mt-6 flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">
                          Fecha de Inicio
                        </label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2">
                          Fecha de Fin
                        </label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          min={startDate || new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep("vessel")}
                      >
                        Atrás
                      </Button>
                      <Button
                        onClick={() => setStep("guest")}
                        disabled={!startDate || !endDate}
                        className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark"
                      >
                        Continuar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Guest Information */}
              {step === "guest" && selectedVessel && (
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Huésped</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                    <div className="mt-6 flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep("date")}
                      >
                        Atrás
                      </Button>
                      <Button
                        onClick={() => setStep("payment")}
                        disabled={
                          !guestInfo.name || !guestInfo.email || !guestInfo.phone
                        }
                        className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark"
                      >
                        Continuar al Pago
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Payment */}
              {step === "payment" && selectedVessel && (
                <Card>
                  <CardHeader>
                    <CardTitle>Completar Pago</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-luxury-light/70">
                        Selecciona tu método de pago preferido:
                      </p>
                      <div className="grid gap-4">
                        <button className="p-4 border border-luxury-light/10 rounded-lg hover:border-luxury-gold transition-all text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Tarjeta de Crédito/Débito</span>
                            <span className="text-sm text-luxury-light/60">Stripe</span>
                          </div>
                        </button>
                        <button className="p-4 border border-luxury-light/10 rounded-lg hover:border-luxury-gold transition-all text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">PayPal</span>
                          </div>
                        </button>
                        <button className="p-4 border border-luxury-light/10 rounded-lg hover:border-luxury-gold transition-all text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Criptomonedas</span>
                            <span className="text-sm text-luxury-light/60">Binance Pay</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep("guest")}
                      >
                        Atrás
                      </Button>
                      <Button
                        className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark"
                      >
                        Confirmar y Pagar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar - Reservation Summary */}
            {(step !== "vessel") && selectedVessel && (
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Resumen de Reserva</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <img
                        src={selectedVessel.images[0]}
                        alt={selectedVessel.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-bold text-lg">{selectedVessel.name}</h3>
                    </div>

                    {startDate && (
                      <div className="border-t border-luxury-light/10 pt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-luxury-light/70">Check-in</span>
                          <span>{formatDate(startDate)}</span>
                        </div>
                        {endDate && (
                          <>
                            <div className="flex justify-between mb-2">
                              <span className="text-luxury-light/70">Check-out</span>
                              <span>{formatDate(endDate)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-luxury-light/70">Noches</span>
                              <span>{days} {days === 1 ? "día" : "días"}</span>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {total > 0 && (
                      <div className="border-t border-luxury-light/10 pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-luxury-light/70">
                            {formatCurrency(selectedVessel.pricePerDay)} x {days} {days === 1 ? "día" : "días"}
                          </span>
                          <span>{formatCurrency(selectedVessel.pricePerDay * days)}</span>
                        </div>
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

