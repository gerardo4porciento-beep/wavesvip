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
  // CAYOS
  {
    id: "1",
    name: "Cayo Sombrero",
    description: "Uno de los cayos más grandes y populares del parque, con aproximadamente 35 hectáreas. Cuenta con dos playas principales y un bosque de palmeras que proporciona sombra natural.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    type: "cayo",
    features: ["Playa", "Palmeras", "Agua cristalina"],
  },
  {
    id: "2",
    name: "Cayo Sal",
    description: "Ideal para la práctica de kitesurf y windsurf debido a sus vientos constantes. Ofrece playas hermosas y aguas cristalinas.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    type: "cayo",
    features: ["Kitesurf", "Windsurf", "Vientos constantes"],
  },
  {
    id: "3",
    name: "Cayo Muerto",
    description: "Destino tranquilo ideal para relajarse y disfrutar de la naturaleza en su estado más puro.",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800",
    type: "cayo",
    features: ["Tranquilo", "Naturaleza", "Relax"],
  },
  {
    id: "4",
    name: "Cayo Borracho",
    description: "La isla más lejana y septentrional del parque, ubicada a 50 minutos de Chichiriviche. Posee abundante vegetación y está rodeada de corales. Refugio y criadero de tortugas marinas.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    type: "cayo",
    features: ["Tortugas", "Corales", "Vegetación"],
  },
  {
    id: "5",
    name: "Cayo Peraza",
    description: "Una de las islas más pequeñas del parque, recomendada para quienes buscan un sitio más privado. Posee abundante vegetación, arenas blancas y aguas tranquilas.",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
    type: "cayo",
    features: ["Privado", "Arenas blancas", "Tranquilo"],
  },
  {
    id: "6",
    name: "Cayo Boca Seca",
    description: "Posee una playa semicircular protegida del oleaje por una barrera de coral, lo que la hace ideal para niños. Sus formaciones coralinas son perfectas para el buceo con snorkel.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
    type: "cayo",
    features: ["Coral", "Ideal para niños", "Snorkel"],
  },
  {
    id: "7",
    name: "Cayo Pescadores",
    description: "Ideal para la pesca deportiva y disfrutar de la gastronomía local del mar.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    type: "cayo",
    features: ["Pesca", "Gastronomía", "Tradicional"],
  },
  {
    id: "8",
    name: "Cayo Paiclás",
    description: "Cayo pequeño y encantador con excelente visibilidad para esnórquel y buceo.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    type: "cayo",
    features: ["Esnórquel", "Buceo", "Vida marina"],
  },
  {
    id: "9",
    name: "Cayo Pelón",
    description: "Cayo con paisajes únicos y aguas profundas ideales para buceo avanzado.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    type: "cayo",
    features: ["Buceo avanzado", "Paisajes únicos", "Aguas profundas"],
  },
  {
    id: "10",
    name: "Cayo Punta Brava",
    description: "Cayo con excelentes condiciones para deportes acuáticos y playas de arena blanca.",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
    type: "cayo",
    features: ["Deportes acuáticos", "Arena blanca", "Aventura"],
  },
  {
    id: "11",
    name: "Cayo Sur",
    description: "Ubicado al sur del parque, ofrece tranquilidad y vistas espectaculares del archipiélago.",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800",
    type: "cayo",
    features: ["Tranquilo", "Vistas", "Remoto"],
  },
  {
    id: "12",
    name: "Cayo Playuelita",
    description: "Cayo con playas protegidas y aguas cristalinas, perfecto para disfrutar en familia.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
    type: "cayo",
    features: ["Familiar", "Protegido", "Aguas cristalinas"],
  },
  {
    id: "13",
    name: "Cayo Mayorquina",
    description: "Cayo pequeño con excelentes condiciones para el esnórquel y observación de vida marina.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    type: "cayo",
    features: ["Esnórquel", "Vida marina", "Observación"],
  },
  {
    id: "14",
    name: "Cayo Norte",
    description: "Ubicado en la zona norte del parque, ofrece playas vírgenes y tranquilidad absoluta.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    type: "cayo",
    features: ["Virgen", "Tranquilidad", "Norte"],
  },
  // BAJOS
  {
    id: "15",
    name: "Bajo de los Juanes",
    description: "Bajo con arrecifes de coral y gran diversidad de vida marina para explorar.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
    type: "bajo",
    features: ["Arrecifes", "Vida marina", "Esnórquel"],
  },
  {
    id: "16",
    name: "Bajo de Caimán",
    description: "Zona ideal para buceo con formaciones coralinas impresionantes y fauna marina abundante.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    type: "bajo",
    features: ["Buceo", "Corales", "Fauna marina"],
  },
  {
    id: "17",
    name: "Bajo de Pescadores",
    description: "Bajo conocido por la pesca deportiva y las excelentes condiciones para actividades náuticas.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    type: "bajo",
    features: ["Pesca deportiva", "Náuticas", "Profundidad"],
  },
];

export default function DestinationsSection() {
  return (
    <section
      id="destinos"
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
            Destinos
          </h2>
          <p className="text-xl text-luxury-light/80 max-w-3xl mx-auto">
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
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white drop-shadow-lg">
                    {destination.name}
                  </h3>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <p className="text-luxury-dark/80 mb-4 line-clamp-3">
                  {destination.description}
                </p>

                {/* Features destacados */}
                <div className="flex flex-wrap gap-2">
                  {destination.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-luxury-gold/20 text-luxury-gold rounded-full"
                    >
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

