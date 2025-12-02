"use client";

import HeroVideo from "@/components/HeroVideo";
import Header from "@/components/Header";
import AboutSection from "@/components/sections/AboutSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import ContactMobileSection from "@/components/SocialButtonsMobile";

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
            <div className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
            </div>
          )}


        </section>

        {/* Secciones adicionales - Orden: Destinos, Experiencia, Galería, Contacto */}
        <DestinationsSection />
        <AboutSection />
        {/* Ocultar en móvil */}
        <div className="hidden md:block">
          <GallerySection />
        </div>
        <div className="hidden md:block">
          <ContactSection />
        </div>

        {/* Sección de contacto móvil - Solo visible en móvil */}
        <ContactMobileSection />
      </main>

      {/* Footer - Solo visible en desktop */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}
