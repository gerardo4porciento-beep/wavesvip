"use client";

import { motion } from "framer-motion";
import { Anchor, Waves, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="experiencia"
      className="py-24 px-4 bg-gradient-to-b from-luxury-dark-secondary via-luxury-dark to-luxury-dark-secondary text-luxury-light relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-luxury-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-luxury-gold">
            La Experiencia Waves VIP
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
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
              className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-300 hover:bg-white/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-luxury-gold text-luxury-dark mb-6 shadow-lg">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-luxury-gold">
                {feature.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

