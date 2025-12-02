"use client";

import { motion } from "framer-motion";

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
    description: "Uno de los cayos más grandes y populares del parque, con aproximadamente 35 hectáreas. Cuenta con dos playas principales y un bosque de palmeras que proporciona sombra natural.",
    image: "/cayos/cayo sombrero.png",
    type: "cayo",
    features: ["Playa", "Palmeras", "Agua cristalina"],
  },
  {
    id: "2",
    name: "Cayo Boca Seca",
    description: "Posee una playa semicircular protegida del oleaje por una barrera de coral, lo que la hace ideal para niños. Sus formaciones coralinas son perfectas para el buceo con snorkel.",
    image: "/cayos/cayo boca seca.png",
    type: "cayo",
    features: ["Coral", "Ideal para niños", "Snorkel"],
  },
  {
    id: "3",
    name: "Cayo Pescadores",
    description: "Ideal para la pesca deportiva y disfrutar de la gastronomía local del mar.",
    image: "/cayos/cayo pescadores.png",
    type: "cayo",
    features: ["Pesca", "Gastronomía", "Tradicional"],
  },
  {
    id: "4",
    name: "Cayo Playuelita",
    description: "Cayo con playas protegidas y aguas cristalinas, perfecto para disfrutar en familia.",
    image: "/cayos/cayo playuelita.png",
    type: "cayo",
    features: ["Familiar", "Protegido", "Aguas cristalinas"],
  },
  {
    id: "5",
    name: "Bajo de los Juanes",
    description: "Bajo con arrecifes de coral y gran diversidad de vida marina para explorar.",
    image: "/cayos/bajo los juanes.png",
    type: "bajo",
    features: ["Arrecifes", "Vida marina", "Esnórquel"],
  },
  {
    id: "6",
    name: "Bajo 360",
    description: "Bajo con vistas panorámicas de 360 grados y excelentes condiciones para buceo y esnórquel.",
    image: "/cayos/bajo 360.png",
    type: "bajo",
    features: ["Vistas 360", "Buceo", "Esnórquel"],
  },
];

export default function DestinationsSection() {
  return (
    <section
      id="destinos"
      className="pt-8 pb-24 px-4 bg-[#E0F7E0] text-luxury-light"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-luxury-gold">
            Destinos
          </h2>
          <p className="text-xl text-luxury-light/90 max-w-3xl mx-auto">
            Descubre los increíbles cayos y bajos del Parque Nacional Morrocoy, cada uno con su propia magia y belleza única.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden group hover:shadow-2xl hover:shadow-luxury-gold/20 transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-4 right-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8)' }}>
                    {destination.name}
                  </h3>
                  {/* Features destacados */}
                  <div className="flex flex-wrap gap-2">
                    {destination.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-bold text-white bg-black/70 backdrop-blur-md rounded-full border border-white/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

