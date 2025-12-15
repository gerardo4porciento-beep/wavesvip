
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservar | Waves VIP",
  description: "Reserva tu embarcación exclusiva en Morrocoy.",
};

export default function ReservarPage() {
  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Reserva tu Experiencia</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona la capacidad que necesitas y verifica la disponibilidad en tiempo real.
          </p>
        </div>

        <BookingWizard />
      </div>
    </div>
  );
}
