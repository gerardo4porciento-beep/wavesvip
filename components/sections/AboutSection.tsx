"use client";

import { motion } from "framer-motion";
import { Anchor, Waves, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="experiencia"
      className="py-24 px-4 bg-luxury-dark text-luxury-light"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
            La Experiencia Waves VIP
          </h2>
          <p className="text-xl text-luxury-light/80 max-w-3xl mx-auto">
            Descubre el paraíso de Morrocoy a bordo de nuestras embarcaciones de
            lujo, donde cada detalle está diseñado para brindarte una experiencia
            inolvidable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              icon: Anchor,
              title: "Embarcaciones de Élite",
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
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold/20 text-luxury-gold mb-6">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">
                {feature.title}
              </h3>
              <p className="text-luxury-light/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

