"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";

interface DateCalendarProps {
  capacity: number;
  date: Date | undefined;
  onDateSelect: (date: Date) => void;
}

export function DateCalendar({ capacity, date, onDateSelect }: DateCalendarProps) {
  const [checking, setChecking] = useState(false);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);

  useEffect(() => {
    let active = true;
    async function fetchBlockedDates() {
      if (!capacity) return;
      try {
        const res = await fetch(`/api/booking/blocked-dates?capacity=${capacity}`);
        const data = await res.json();
        if (data.blockedDates && active) {
          const dates = data.blockedDates.map((dateStr: string) => {
            const [y, m, d] = dateStr.split("-").map(Number);
            return new Date(y, m - 1, d);
          });
          setBlockedDates(dates);
        }
      } catch (e) {
        console.error("Error fetching blocked dates", e);
      }
    }
    fetchBlockedDates();
    return () => { active = false; };
  }, [capacity]);

  const handleSelect = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    // Double check availability (concurrency)
    setChecking(true);
    try {
      const dateStr = selectedDate.toISOString().split("T")[0];
      const res = await fetch("/api/booking/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateStr, capacity }),
      });

      const data = await res.json();

      if (data.error) {
        alert(`Error del Sistema: ${data.error}`);
        return;
      }

      if (data.available) {
        onDateSelect(selectedDate);
      } else {
        alert("Esta fecha ya está reservada para día completo.");
      }
    } catch (e) {
      console.error(e);
      alert("Error verificando disponibilidad");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-md mx-auto">
        <style jsx global>{`
          .rdp { --rdp-cell-size: 45px; --rdp-accent-color: #D4AF37; --rdp-background-color: #D4AF37; margin: 0; }
          .rdp-day_selected:not([disabled]) { 
            background-color: #D4AF37; 
            color: black; 
            font-weight: bold;
            box-shadow: 0 0 15px rgba(212,175,55,0.4);
          }
          .rdp-day_selected:hover:not([disabled]) { background-color: #F8D568; }
          .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: rgba(255,255,255,0.1); }
        `}</style>

        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-xl w-full flex justify-center p-0"
          classNames={{
            months: "flex flex-col space-y-4",
            month: "space-y-4 w-full",
            caption: "flex justify-center pt-2 relative items-center mb-4",
            caption_label: "text-luxury-gold font-display text-2xl tracking-wide",
            nav: "space-x-1 flex items-center absolute w-full justify-between px-2",
            nav_button: "h-9 w-9 bg-black/20 text-white hover:bg-luxury-gold hover:text-black rounded-full transition-all border border-white/10 shadow-lg",
            nav_button_previous: "left-0",
            nav_button_next: "right-0",
            table: "w-full border-collapse",
            head_row: "flex justify-between mb-2",
            head_cell: "text-neutral-500 rounded-md w-10 font-normal text-[0.8rem] uppercase tracking-widest",
            row: "flex w-full mt-2 justify-between",
            cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
            day: "h-10 w-10 p-0 font-medium aria-selected:opacity-100 rounded-full transition-all text-neutral-300",
            day_today: "bg-white/10 text-white border border-white/20",
            day_outside: "text-neutral-700 opacity-30",
            day_disabled: "text-neutral-800 opacity-20 decoration-slice",
            day_hidden: "invisible",
          }}
          disabled={[
            (d) => d < new Date(new Date().setHours(0, 0, 0, 0)),
            ...blockedDates
          ]}
        />
        {checking && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl transition-all animate-in fade-in">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-10 h-10 animate-spin text-luxury-gold" />
              <span className="text-luxury-gold text-sm font-medium tracking-widest uppercase">Verificando...</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        {date ? (
          <div className="animate-in slide-in-from-bottom-2 fade-in duration-500">
            <span className="text-neutral-400 text-sm uppercase tracking-widest">Reserva para el</span>
            <p className="text-2xl text-white font-display">
              {date.toLocaleDateString("es-VE", { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        ) : (
          <p className="text-neutral-500 text-sm font-medium animate-pulse uppercase tracking-widest">
            Selecciona una fecha disponible
          </p>
        )}
      </div>
    </div>
  );
}
