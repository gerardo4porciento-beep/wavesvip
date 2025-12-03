"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { Vessel } from "@/types";

// Datos de ejemplo - En producción vendrán de Supabase
const sampleVessels: Vessel[] = [
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

export default function FleetSection() {
  return (
    <section
      id="embarcaciones"
      className="py-24 px-4 bg-luxury-dark-secondary text-luxury-light"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Nuestra Flota
          </h2>
          <p className="text-xl text-luxury-light/80 max-w-3xl mx-auto">
            Cada embarcación es seleccionada cuidadosamente para ofrecerte la
            máxima experiencia en el mar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleVessels.map((vessel, index) => (
            <motion.div
              key={vessel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-2xl hover:shadow-luxury-gold/20 transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={vessel.images[0]}
                  alt={vessel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 to-transparent" />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold mb-2">
                  {vessel.name}
                </h3>
                <p className="text-luxury-light/70 mb-4 line-clamp-2">
                  {vessel.description}
                </p>

                {/* Especificaciones */}
                <div className="flex items-center gap-4 mb-4 text-sm text-luxury-light/60">
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{vessel.capacity} personas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{vessel.specifications.length}</span>
                  </div>
                </div>

                {/* Features destacados */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {vessel.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-luxury-gold/20 text-luxury-gold rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Precio y CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-luxury-gold">
                      {formatCurrency(vessel.pricePerDay)}
                    </p>
                    <p className="text-sm text-luxury-light/60">por día</p>
                  </div>
                  <Link href={`/reservar?vessel=${vessel.id}`} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark">
                      Reservar
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/reservar" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark px-8 py-6 text-lg"
            >
              Ver Todas las Embarcaciones
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

