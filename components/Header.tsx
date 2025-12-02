"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="container mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo width={100} height={32} showText={false} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/#destinos"
              className="text-white uppercase text-sm font-medium tracking-wide hover:text-luxury-gold transition-colors"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              Destinos
            </Link>
            <Link
              href="/#experiencia"
              className="text-white uppercase text-sm font-medium tracking-wide hover:text-luxury-gold transition-colors"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              Experiencia
            </Link>
            <Link
              href="/#galeria"
              className="text-white uppercase text-sm font-medium tracking-wide hover:text-luxury-gold transition-colors"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              Galería
            </Link>
            <Link
              href="/#contacto"
              className="text-white uppercase text-sm font-medium tracking-wide hover:text-luxury-gold transition-colors"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
            >
              Contacto
            </Link>
            <a
              href="https://wa.me/584127316397"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-luxury-gold transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="https://www.instagram.com/wavesvip.ve"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-luxury-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <Link href="/reservar">
              <Button
                className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark font-semibold uppercase text-sm px-6 py-2 tracking-wide border-0"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                Reservar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-luxury-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6 pb-4 space-y-4 bg-black/20 backdrop-blur-md rounded-lg p-4"
            >
              <Link
                href="/#destinos"
                className="block text-white uppercase text-sm font-medium tracking-wide hover:text-luxury-gold transition-colors"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Destinos
              </Link>
              <Link
                href="/#experiencia"
                className="block text-white uppercase text-sm font-medium tracking-wide hover:text-luxury-gold transition-colors"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experiencia
              </Link>
              <Link
                href="/#galeria"
                className="block text-white uppercase text-sm font-medium tracking-wide hover:text-luxury-gold transition-colors"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Galería
              </Link>
              <Link
                href="/#contacto"
                className="block text-white uppercase text-sm font-medium tracking-wide hover:text-luxury-gold transition-colors"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://wa.me/584127316397"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-luxury-gold transition-colors"
                  aria-label="WhatsApp"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageCircle size={24} />
                </a>
                <a
                  href="https://www.instagram.com/wavesvip.ve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-luxury-gold transition-colors"
                  aria-label="Instagram"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Instagram size={24} />
                </a>
              </div>
              <Link href="/reservar" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  className="w-full bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark font-semibold uppercase text-sm py-2 tracking-wide"
                  style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                >
                  Reservar
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

