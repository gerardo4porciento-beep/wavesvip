
"use client";

import { BOATS } from "@/lib/config/boats";
import { cn } from "@/lib/utils";
import { Ship, Users } from "lucide-react";
import { motion } from "framer-motion";

interface CapacitySelectorProps {
  selectedCapacity: number | null;
  onSelect: (capacity: number) => void;
}

export function CapacitySelector({ selectedCapacity, onSelect }: CapacitySelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {BOATS.map((boat) => (
        <motion.div
          key={boat.capacity}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(boat.capacity)}
          className={cn(
            "cursor-pointer rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden group h-full flex flex-col justify-between",
            selectedCapacity === boat.capacity
              ? "border-luxury-gold bg-zinc-950 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
              : "border-neutral-800 bg-neutral-900/40 hover:border-luxury-gold/50 hover:bg-neutral-900/60"
          )}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between text-neutral-400 group-hover:text-luxury-gold transition-colors">
              <Ship className="w-8 h-8" />
              <span className="text-xs uppercase tracking-widest font-bold">WAVES VIP</span>
            </div>

            <div>
              <h3 className="text-3xl font-display font-bold text-white mb-1">
                {boat.capacity} <span className="text-lg text-neutral-500 font-normal">Pasajeros</span>
              </h3>
              <p className="text-sm text-neutral-400 font-medium">{boat.name}</p>
            </div>

            <div className="h-px bg-neutral-800 w-full group-hover:bg-luxury-gold/30 transition-colors" />

            <p className="text-xs text-neutral-500 leading-relaxed min-h-[3rem]">
              {boat.description}
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-neutral-800 group-hover:border-luxury-gold/20 transition-colors">
            <div className="text-luxury-gold font-bold text-xl flex items-center justify-end gap-2">
              <span className="text-xs text-neutral-500 font-normal uppercase">Desde</span>
              ${boat.price}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
