"use client";

import HeroVideo from "@/components/HeroVideo";
import Header from "@/components/Header";
import AboutSection from "@/components/sections/AboutSection";
import FleetSection from "@/components/sections/FleetSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  // URLs de video optimizadas (Cloudinary o Mux)
  const heroVideoUrl =
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL ||
    null;
  
  const posterUrl =
    process.env.NEXT_PUBLIC_HERO_POSTER_URL ||
    null;

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative">
          {heroVideoUrl && !heroVideoUrl.includes("your-cloud-name") ? (
            <HeroVideo
              videoUrl={heroVideoUrl}
              posterUrl={posterUrl || undefined}
              title="Waves VIP"
              subtitle="Experiencia de lujo en el paraíso de Morrocoy"
              showControls={true}
            />
          ) : (
            <div className="relative h-screen w-full bg-gradient-to-b from-white via-luxury-dark-secondary to-white flex items-center justify-center overflow-hidden">
              {/* Efecto de olas sutiles */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-luxury-gold/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-luxury-gold/10 to-transparent" />
              </div>

              {/* Contenido Principal */}
              <div className="relative z-10 text-center px-4 max-w-5xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-luxury-light mb-6 text-balance">
                    Waves VIP
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl text-luxury-light/80 mb-12 text-balance">
                    Experiencia de lujo en el paraíso de Morrocoy
                  </p>
                </motion.div>

                {/* Call to Action */}
                <div className="mt-12">
                  <Link href="/reservar">
                    <Button
                      size="lg"
                      className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark font-semibold px-8 py-6 text-lg group"
                    >
                      Reservar Experiencia
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          )}

          {/* Call to Action flotante (si hay video) */}
          {heroVideoUrl && !heroVideoUrl.includes("your-cloud-name") && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
              <Link href="/reservar">
                <Button
                  size="lg"
                  className="bg-luxury-gold hover:bg-luxury-gold/90 text-luxury-dark font-semibold px-8 py-6 text-lg group"
                >
                  Reservar Experiencia
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}

        </section>

        {/* Secciones adicionales */}
        <AboutSection />
        <FleetSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
