"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";

interface DateCalendarProps {
  capacity: number;
  date: Date | undefined;
  onDateSelect: (date: Date) => void;
}

export function DateCalendar({ capacity, date, onDateSelect }: DateCalendarProps) {
  const [checking, setChecking] = useState(false);

  const handleSelect = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    setChecking(true);
    try {
      const dateStr = selectedDate.toISOString().split("T")[0];

      const res = await fetch("/api/booking/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateStr, capacity }),
      });

      const data = await res.json();

      if (data.available) {
        onDateSelect(selectedDate);
      } else {
        alert("Fecha no disponible. Por favor selecciona otra.");
      }
    } catch (e) {
      console.error(e);
      alert("Error verificando disponibilidad");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative p-4 rounded-xl bg-black border border-neutral-800 shadow-xl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md"
          classNames={{
            day_selected: "bg-luxury-gold text-black hover:bg-luxury-gold hover:text-black focus:bg-luxury-gold focus:text-black",
            day_today: "bg-neutral-800 text-white",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white rounded-md transition-colors text-neutral-300",
            head_cell: "text-neutral-500 rounded-md w-9 font-normal text-[0.8rem]",
            caption_label: "text-white font-medium text-sm",
            nav_button: "border border-neutral-800 hover:bg-neutral-800 hover:text-white text-neutral-400"
          }}
          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
        />
        {checking && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-xl">
            <Loader2 className="w-8 h-8 animate-spin text-luxury-gold" />
          </div>
        )}
      </div>
      <p className="text-sm text-neutral-500 mt-4 font-medium animate-pulse">
        {date ?
          `Fecha seleccionada: ${date.toLocaleDateString("es-VE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` :
          "Disponibilidad en tiempo real"
        }
      </p>
    </div>
  );
}

