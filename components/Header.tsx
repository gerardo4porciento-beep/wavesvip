"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/10 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo width={100} height={32} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/#embarcaciones"
              className="text-luxury-light/80 hover:text-luxury-gold transition-colors"
            >
              Embarcaciones
            </Link>
            <Link
              href="/#experiencia"
              className="text-luxury-light/80 hover:text-luxury-gold transition-colors"
            >
              Experiencia
            </Link>
            <Link
              href="/#galeria"
              className="text-luxury-light/80 hover:text-luxury-gold transition-colors"
            >
              Galería
            </Link>
            <Link
              href="/#contacto"
              className="text-luxury-light/80 hover:text-luxury-gold transition-colors"
            >
              Contacto
            </Link>
            <Link href="/reservar">
              <Button
                variant="outline"
                size="sm"
                className="border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark"
              >
                Reservar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-luxury-light"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              <Link
                href="/#embarcaciones"
                className="block text-luxury-light/80 hover:text-luxury-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Embarcaciones
              </Link>
              <Link
                href="/#experiencia"
                className="block text-luxury-light/80 hover:text-luxury-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Experiencia
              </Link>
              <Link
                href="/#galeria"
                className="block text-luxury-light/80 hover:text-luxury-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Galería
              </Link>
              <Link
                href="/#contacto"
                className="block text-luxury-light/80 hover:text-luxury-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link href="/reservar" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark"
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

