"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-24 px-4 bg-white text-luxury-light"
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
            Contáctanos
          </h2>
          <p className="text-xl text-luxury-light/80 max-w-3xl mx-auto">
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
              <h3 className="text-2xl font-display font-bold mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-luxury-gold" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a
                      href="mailto:info@wavesvip.com"
                      className="text-luxury-light/70 hover:text-luxury-gold transition-colors"
                    >
                      info@wavesvip.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-luxury-gold" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Teléfono</p>
                    <a
                      href="tel:+584123456789"
                      className="text-luxury-light/70 hover:text-luxury-gold transition-colors"
                    >
                      +58 412 345 6789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-luxury-gold" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Ubicación</p>
                    <p className="text-luxury-light/70">
                      Parque Nacional Morrocoy
                      <br />
                      Estado Falcón, Venezuela
                    </p>
                  </div>
                </div>
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
                  className="block text-sm font-medium mb-2"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-luxury-light focus:outline-none focus:border-luxury-gold transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-luxury-light focus:outline-none focus:border-luxury-gold transition-colors"
                  placeholder="juan@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
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
                className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark font-semibold py-6"
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

