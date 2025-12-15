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
    <div className="min-h-screen bg-[#D4AF37] flex flex-col overflow-hidden">
      {"/* Header Simplificado para Reservas */"}
      <header className="py-4 px-6 md:px-12 flex items-center justify-between shrink-0">
        <Logo width={100} height={32} showText={false} />
        <Link href="/">
          <Button
            variant="ghost"
            className="text-black/80 hover:text-white hover:bg-black/5 gap-2 uppercase text-xs tracking-widest"
          >
            <ArrowLeft size={16} />
            Volver al Inicio
          </Button>
        </Link>
      </header>

      <div className="flex-1 flex items-start justify-center pt-2 md:pt-4 px-4 overflow-y-auto">
        <div className="w-full max-w-5xl">
          <BookingWizard />
        </div>
      </div>
    </div>
  );
}
