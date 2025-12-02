"use client";

import { motion } from "framer-motion";
import { MessageCircle, Instagram } from "lucide-react";
import Link from "next/link";

export default function ContactMobileSection() {
  return (
    <section
      id="contacto-mobile"
      className="md:hidden py-20 px-4 bg-gradient-to-b from-luxury-dark-secondary via-luxury-dark to-luxury-dark text-luxury-light relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-luxury-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-luxury-gold">
            Contacto
          </h2>
          <p className="text-lg text-white/90 max-w-xl mx-auto">
            Contáctanos a través de nuestras redes sociales
          </p>
        </motion.div>

        <div className="space-y-4">
          {/* WhatsApp Button - Barra horizontal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="https://wa.me/584123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-full bg-[#25D366] rounded-2xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="text-white" size={28} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-white mb-1">WhatsApp</h3>
                <p className="text-white/90 text-sm">Escríbenos directamente</p>
              </div>
              <div className="text-white/80 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </Link>
          </motion.div>

          {/* Instagram Button - Barra horizontal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="https://www.instagram.com/wavesvip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Instagram className="text-white" size={28} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-white mb-1">Instagram</h3>
                <p className="text-white/90 text-sm">Síguenos y conoce más</p>
              </div>
              <div className="text-white/80 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

