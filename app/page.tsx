"use client";

import HeroVideo from "@/components/HeroVideo";
import Header from "@/components/Header";
import AboutSection from "@/components/sections/AboutSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";

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
              showControls={true}
            />
          ) : (
            <div className="relative h-screen w-full bg-gradient-to-b from-white via-luxury-dark-secondary to-white flex items-center justify-center overflow-hidden">
              {/* Efecto de olas sutiles */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-luxury-gold/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-luxury-gold/10 to-transparent" />
              </div>


            </div>
          )}


        </section>

        {/* Secciones adicionales - Orden: Destinos, Experiencia, Galería, Contacto */}
        <DestinationsSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
