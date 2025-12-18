import { BookingWizard } from "@/components/booking/BookingWizard";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";
import { WavesBranding } from "@/components/booking/WavesBranding";

export const metadata: Metadata = {
  title: "Reservar | Waves VIP",
  description: "Reserva tu embarcación exclusiva en Morrocoy.",
};

export default function ReservarPage() {
  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bg-reservar.png" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay for readability */}
      </div>

      <header className="relative z-10 py-2 px-6 md:px-12 flex items-center justify-between shrink-0 h-16">
        <div className="translate-y-[10px]">
          <Logo width={100} height={32} showText />
        </div>
        <Link href="/">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 gap-2 uppercase text-xs tracking-widest"
          >
            <ArrowLeft size={16} />
            Volver al Inicio
          </Button>
        </Link>
      </header>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-between pt-0 px-2 overflow-y-auto pb-0 h-full">
        <div className="w-full max-w-[1400px] flex-1 flex flex-col justify-start mt-[50px] mb-8">
          <BookingWizard />
        </div>
        <WavesBranding />
      </div>
    </div>
  );
}
