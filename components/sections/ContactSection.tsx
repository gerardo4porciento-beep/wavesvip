"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-24 px-4 bg-luxury-gold text-luxury-dark"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-luxury-dark">
            Contáctanos
          </h2>
          <p className="text-xl text-luxury-dark/90 max-w-3xl mx-auto">
            Estamos aquí para hacer de tu experiencia algo inolvidable. Escríbenos
            y te responderemos a la brevedad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-display font-bold mb-6 text-luxury-dark">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-luxury-dark/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-luxury-dark" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-luxury-dark">Email</p>
                    <a
                      href="mailto:info@wavesvip.com"
                      className="text-luxury-dark/80 hover:text-luxury-dark transition-colors"
                    >
                      info@wavesvip.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-luxury-dark/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-luxury-dark" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-luxury-dark">Teléfono</p>
                    <a
                      href="tel:+584127316397"
                      className="text-luxury-dark/80 hover:text-luxury-dark transition-colors"
                    >
                      +58 412 731 6397
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-luxury-dark/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-luxury-dark" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1 text-luxury-dark">Ubicación</p>
                    <p className="text-luxury-dark/80">
                      Parque Nacional Morrocoy
                      <br />
                      Estado Falcón, Venezuela
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de redes sociales */}
            <div className="mt-8">
              <h3 className="text-2xl font-display font-bold mb-6 text-luxury-dark">
                Redes Sociales
              </h3>
              <div className="space-y-4">
                {/* WhatsApp Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link
                    href="https://wa.me/584127316397"
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

                {/* Instagram Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    href="https://www.instagram.com/wavesvip.ve"
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
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-luxury-dark"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-luxury-light focus:outline-none focus:border-luxury-dark transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-luxury-dark"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-luxury-light focus:outline-none focus:border-luxury-dark transition-colors"
                  placeholder="juan@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-luxury-dark"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Cuéntanos sobre tu experiencia deseada..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-luxury-dark hover:bg-luxury-dark/90 text-white font-semibold py-6"
              >
                Enviar Mensaje
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

