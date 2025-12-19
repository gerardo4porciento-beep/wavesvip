"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  type: "cayo" | "bajo";
  features: string[];
}

const destinations: Destination[] = [
  {
    id: "1",
    name: "Cayo Sombrero",
    description: "Un paraíso de 35 hectáreas con bosques de palmeras y aguas cristalinas.",
    image: "/cayos/cayo sombrero.png",
    type: "cayo",
    features: ["Playa", "Palmeras", "Agua cristalina"],
  },
  {
    id: "2",
    name: "Cayo Boca Seca",
    description: "Playa protegida por barrera de coral, perfecta para snorkeling.",
    image: "/cayos/cayo boca seca.png",
    type: "cayo",
    features: ["Coral", "Snorkel", "Familiar"],
  },
  {
    id: "3",
    name: "Cayo Pescadores",
    description: "El spot ideal para la pesca deportiva y gastronomía local exclusiva.",
    image: "/cayos/cayo pescadores.png",
    type: "cayo",
    features: ["Pesca", "Gastronomía", "Tradición"],
  },
  {
    id: "4",
    name: "Cayo Playuelita",
    description: "Intimidad y belleza natural en una playa protegida del oleaje.",
    image: "/cayos/cayo playuelita.png",
    type: "cayo",
    features: ["Intimidad", "Relax", "Aguas Calmas"],
  },
  {
    id: "5",
    name: "Bajo de los Juanes",
    description: "La fiesta en el mar. Aguas poco profundas y ambiente vibrante.",
    image: "/cayos/bajo los juanes.png",
    type: "bajo",
    features: ["Social", "Fiesta", "Aguas Bajas"],
  },
  {
    id: "6",
    name: "Bajo 360",
    description: "Vistas panorámicas infinitas para los amantes del buceo.",
    image: "/cayos/bajo 360.png",
    type: "bajo",
    features: ["Vistas 360", "Buceo", "Profundidad"],
  },
];

export default function DestinationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="destinos" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-luxury-gold uppercase tracking-[0.2em] text-sm font-medium mb-4 block">
            Explora Morrocoy
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-luxury-light mb-6 leading-tight">
            Destinos <br />
            <span className="text-luxury-gold italic">Inolvidables</span>
          </h2>
          <p className="text-lg text-neutral-500 max-w-xl font-light">
            Descubre nuestra selección curada de los cayos y bajos más exclusivos.
            Cada destino ofrece una experiencia única diseñada para tus sentidos.
          </p>
        </motion.div>
      </div>

      {/* Mobile: Snap Carousel */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory px-4 gap-4 pb-8 custom-scrollbar">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="snap-center shrink-0 w-[85vw] relative aspect-[3/4] rounded-sm overflow-hidden group"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <span className="text-xs font-medium uppercase tracking-wider text-luxury-gold mb-2 block">
                {dest.type}
              </span>
              <h3 className="text-3xl font-serif mb-2">{dest.name}</h3>
              <p className="text-sm text-white/80 font-light line-clamp-2">
                {dest.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Horizontal Scroll / Elegant Grid */}
      <div className="hidden md:block pl-4 lg:pl-24 overflow-x-auto pb-12 custom-scrollbar hide-scrollbar">
        <div className="flex gap-8 lg:gap-12 w-max">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-[400px] lg:w-[500px] cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm relative mb-6">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                {/* Floating Action Button */}
                <div className="absolute bottom-6 right-6 z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-luxury-light hover:bg-luxury-gold hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between border-b border-neutral-200 pb-4 mb-4 group-hover:border-luxury-gold transition-colors duration-500">
                  <h3 className="text-3xl font-serif text-luxury-light group-hover:text-luxury-gold transition-colors duration-300">
                    {dest.name}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    0{i + 1}
                  </span>
                </div>
                <p className="text-neutral-500 font-light leading-relaxed group-hover:text-neutral-800 transition-colors duration-300">
                  {dest.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {dest.features.map((feature) => (
                    <span key={feature} className="text-[10px] uppercase tracking-wider text-neutral-400 border border-neutral-200 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

