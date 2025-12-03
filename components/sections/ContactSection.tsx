"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Instagram } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-12 px-4 bg-luxury-gold text-luxury-dark"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-luxury-dark">
            Contáctanos
          </h2>
          <p className="text-xl text-luxury-dark/90 max-w-3xl mx-auto">
            Estamos aquí para hacer de tu experiencia algo inolvidable. Escríbenos
            y te responderemos a la brevedad.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center max-w-5xl mx-auto">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-4"
          >
            <h3 className="text-xl font-display font-bold mb-4 text-luxury-dark">
              Información de Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-luxury-dark/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-luxury-dark" size={16} />
                </div>
                <div>
                  <p className="font-semibold mb-0.5 text-luxury-dark text-xs">Email</p>
                  <a
                    href="mailto:info@wavesvip.com"
                    className="text-luxury-dark/80 hover:text-luxury-dark transition-colors text-xs"
                  >
                    info@wavesvip.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-luxury-dark/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-luxury-dark" size={16} />
                </div>
                <div>
                  <p className="font-semibold mb-0.5 text-luxury-dark text-xs">Teléfono</p>
                  <a
                    href="tel:+584127316397"
                    className="text-luxury-dark/80 hover:text-luxury-dark transition-colors text-xs"
                  >
                    +58 412 731 6397
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-luxury-dark/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-luxury-dark" size={16} />
                </div>
                <div>
                  <p className="font-semibold mb-0.5 text-luxury-dark text-xs">Ubicación</p>
                  <p className="text-luxury-dark/80 text-xs">
                    Parque Nacional Morrocoy
                    <br />
                    Estado Falcón, Venezuela
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Botones de redes sociales */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full lg:w-auto"
          >
            <h3 className="text-xl font-display font-bold mb-4 text-luxury-dark">
              Redes Sociales
            </h3>
            <div className="space-y-3">
              {/* WhatsApp Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="https://wa.me/584127316397?text=Hola%2C%20vengo%20de%20la%20web%20de%20Waves%2C%20estoy%20interesado%20en%20alquilar%20una%20lancha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-[#25D366] rounded-xl p-3 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-white" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-base font-bold text-white mb-0.5">WhatsApp</h3>
                    <p className="text-white/90 text-xs">Escríbenos directamente</p>
                  </div>
                  <div className="text-white/80 group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </Link>
              </motion.div>

              {/* Instagram Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="https://www.instagram.com/wavesvip.ve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl p-3 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="text-white" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-base font-bold text-white mb-0.5">Instagram</h3>
                    <p className="text-white/90 text-xs">Síguenos y conoce más</p>
                  </div>
                  <div className="text-white/80 group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

