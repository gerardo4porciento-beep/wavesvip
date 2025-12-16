
"use client";

import { BOATS } from "@/lib/config/boats";
import { cn } from "@/lib/utils";
import { Ship } from "lucide-react";
import { motion } from "framer-motion";

interface CapacitySelectorProps {
    selectedCapacity: number | null;
    onSelect: (capacity: number) => void;
}

export function CapacitySelector({ selectedCapacity, onSelect }: CapacitySelectorProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {BOATS.map((boat) => (
                <motion.div
                    key={boat.capacity}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(boat.capacity)}
                    className={cn(
                        "cursor-pointer rounded-xl md:rounded-2xl p-3 md:p-6 border transition-all duration-300 relative overflow-hidden group h-full flex flex-col justify-between",
                        selectedCapacity === boat.capacity
                            ? "border-luxury-gold bg-zinc-950 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            : "border-neutral-800 bg-neutral-900/40 hover:border-luxury-gold/50 hover:bg-neutral-900/60"
                    )}
                >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 space-y-2 md:space-y-4">
                        <div className="flex items-center justify-between text-neutral-400 group-hover:text-luxury-gold transition-colors">
                            <Ship className="w-5 h-5 md:w-8 md:h-8" />
                            <span className="hidden md:block text-xs uppercase tracking-widest font-bold">WAVES VIP</span>
                        </div>

                        <div>
                            <h3 className="text-xl md:text-3xl font-display font-bold text-white mb-0 md:mb-1">
                                {boat.capacity} <span className="text-xs md:text-lg text-neutral-500 font-normal">Pax</span>
                            </h3>
                            <p className="text-[10px] md:text-sm text-neutral-400 font-medium truncate">{boat.name}</p>
                        </div>

                        <div className="h-px bg-neutral-800 w-full group-hover:bg-luxury-gold/30 transition-colors hidden md:block" />

                        <p className="text-xs text-neutral-500 leading-relaxed min-h-[3rem] hidden md:block">
                            {boat.description}
                        </p>
                    </div>

                    <div className="relative z-10 mt-2 md:mt-6 pt-2 md:pt-4 border-t border-neutral-800 group-hover:border-luxury-gold/20 transition-colors">
                        <div className="text-luxury-gold font-bold text-sm md:text-xl flex items-center justify-end gap-1 md:gap-2">
                            <span className="text-[10px] md:text-xs text-neutral-500 font-normal uppercase hidden md:inline">Desde</span>
                            ${boat.price}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
