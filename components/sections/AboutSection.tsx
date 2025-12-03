"use client";

import { motion } from "framer-motion";
import { Anchor, Waves, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="experiencia"
      className="py-24 px-4 bg-[#B3E5FC] text-luxury-light"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-luxury-light">
            La Experiencia Waves VIP
          </h2>
          <p className="text-base md:text-lg text-luxury-light/90 max-w-2xl mx-auto">
            Descubre el paraíso de Morrocoy a bordo de nuestras embarcaciones de
            lujo, donde cada detalle está diseñado para brindarte una experiencia
            inolvidable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              icon: Anchor,
              title: "Lanchas Deportivas",
              description:
                "Flota moderna de yates y lanchas equipadas con todas las comodidades para garantizar tu confort y seguridad.",
            },
            {
              icon: Waves,
              title: "Morrocoy en su Esplendor",
              description:
                "Navega por los cayos más hermosos de Venezuela, con aguas turquesas y paisajes únicos que te dejarán sin aliento.",
            },
            {
              icon: Sparkles,
              title: "Servicio Excepcional",
              description:
                "Tripulación profesional dedicada a hacer de tu experiencia algo extraordinario, atendiendo cada detalle con excelencia.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-luxury-light mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-3 text-luxury-light">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-luxury-light/85 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

