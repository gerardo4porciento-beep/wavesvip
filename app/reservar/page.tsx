import { BookingWizard } from "@/components/booking/BookingWizard";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Reservar | Waves VIP",
  description: "Reserva tu embarcación exclusiva en Morrocoy.",
};

export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-[#013220] flex flex-col">
      {/* Header Simplificado para Reservas */}
      <header className="py-6 px-6 md:px-12 flex items-center justify-between">
        <Logo width={120} height={40} showText={false} />
        <Link href="/">
          <Button
            variant="ghost"
            className="text-white/80 hover:text-luxury-gold hover:bg-white/5 gap-2 uppercase text-xs tracking-widest"
          >
            <ArrowLeft size={16} />
            Volver al Inicio
          </Button>
        </Link>
      </header>

      <div className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 font-display">
              Reserva tu Experiencia
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Selecciona la capacidad que necesitas y verifica la disponibilidad en tiempo real.
            </p>
          </div>

          <BookingWizard />
        </div>
      </div>
    </div>
  );
}
