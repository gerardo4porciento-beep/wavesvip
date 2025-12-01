"use client";

import { useState, useEffect } from "react";
import { Calendar, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { CalendarAvailability as CalendarAvailabilityType } from "@/types";

interface CalendarAvailabilityProps {
  startDate: string;
  endDate: string;
  onDateSelect?: (date: string) => void;
}

/**
 * Componente para mostrar y consultar la disponibilidad del calendario
 * en tiempo real desde Google Calendar
 */
export default function CalendarAvailability({
  startDate,
  endDate,
  onDateSelect,
}: CalendarAvailabilityProps) {
  const [availability, setAvailability] = useState<
    CalendarAvailabilityType[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailability();
  }, [startDate, endDate]);

  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/calendar/availability?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener disponibilidad");
      }

      const data = await response.json();
      setAvailability(data.availability || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error fetching availability:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date: string, available: boolean) => {
    if (available && onDateSelect) {
      onDateSelect(date);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-luxury-gold" />
        <span className="ml-2 text-luxury-light">Cargando disponibilidad...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p className="text-red-400">Error: {error}</p>
        <button
          onClick={fetchAvailability}
          className="mt-2 text-sm text-luxury-gold hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-luxury-gold" />
        <h3 className="text-xl font-semibold text-luxury-light">
          Disponibilidad
        </h3>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Headers de días */}
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-luxury-light/60 py-2"
          >
            {day}
          </div>
        ))}

        {/* Días del calendario */}
        {availability.map((item) => {
          const date = new Date(item.date);
          const dayNumber = date.getDate();
          const isAvailable = item.available;

          return (
            <button
              key={item.date}
              onClick={() => handleDateClick(item.date, isAvailable)}
              disabled={!isAvailable}
              className={`
                aspect-square flex flex-col items-center justify-center
                rounded-lg text-sm font-medium transition-all
                ${
                  isAvailable
                    ? "bg-white border border-gray-200 hover:bg-luxury-gold/20 text-luxury-light cursor-pointer hover:scale-105"
                    : "bg-gray-100 border border-gray-200 text-luxury-light/30 cursor-not-allowed"
                }
              `}
            >
              <span>{dayNumber}</span>
              {isAvailable ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500/50 mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-4 mt-4 text-sm text-luxury-light/60">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-500/50" />
          <span>No disponible</span>
        </div>
      </div>
    </div>
  );
}

