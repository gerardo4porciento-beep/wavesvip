"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroVideoProps {
  videoUrl: string;
  posterUrl?: string;
  fallbackImage?: string;
  title?: string;
  subtitle?: string;
  showControls?: boolean;
  className?: string;
}

export default function HeroVideo({
  videoUrl,
  posterUrl,
  fallbackImage,
  title,
  subtitle,
  showControls = true,
  className,
}: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSource, setCurrentSource] = useState<string | null>(null);

  // Detectar soporte de formatos y seleccionar el mejor
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkSupport = () => {
      // Preferir WebM para mejor compresión, fallback a MP4
      const webmSupported = video.canPlayType('video/webm; codecs="vp9"') !== "";
      const mp4Supported = video.canPlayType('video/mp4; codecs="avc1.42E01E"') !== "";

      if (webmSupported && videoUrl.includes(".webm")) {
        setCurrentSource(videoUrl.replace(".mp4", ".webm"));
      } else if (mp4Supported) {
        setCurrentSource(videoUrl.replace(".webm", ".mp4"));
      } else {
        setCurrentSource(videoUrl);
      }
    };

    checkSupport();
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentSource) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      setIsLoading(false);
      // Autoplay cuando el video esté listo
      if (isPlaying) {
        video.play().catch(() => {
          setIsPlaying(false);
        });
      }
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handlePlaying = () => {
      setIsLoading(false);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    // Configuración optimizada para performance y Safari iOS
    video.preload = "auto"; // Cambiado a "auto" para Safari iOS
    video.playsInline = true;
    video.muted = true; // Siempre muted para Safari iOS (requerido para autoplay)
    video.loop = true;
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("playsinline", "true");
    
    // Detectar iOS y forzar muted
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      video.muted = true;
      setIsMuted(true);
    }

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [currentSource, isMuted, isPlaying]);

  // Intersection Observer para lazy loading real
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && currentSource && !isVideoLoaded) {
            // Cargar video solo cuando esté en viewport
            video.load();
            setIsVideoLoaded(true);
          }
        });
      },
      {
        rootMargin: "50px", // Empezar a cargar 50px antes de entrar en viewport
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [currentSource, isVideoLoaded]);


  if (hasError && fallbackImage) {
    return (
      <div
        className={cn(
          "relative w-full h-screen bg-cover bg-center",
          className
        )}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      >
        <div className="absolute inset-0 bg-luxury-dark/40" />
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-screen overflow-hidden", className)}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="video-container"
        poster={posterUrl}
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        loop
        muted
        preload="auto"
        autoPlay
        onLoadedMetadata={(e) => {
          const video = e.currentTarget;
          // Safari iOS requiere muted para autoplay
          video.muted = true;
          video.play().catch(() => {
            // Ignorar errores de autoplay
          });
        }}
        onCanPlay={(e) => {
          const video = e.currentTarget;
          // Asegurar que está muted para Safari iOS
          if (!video.muted) {
            video.muted = true;
          }
          video.play().catch(() => {
            // Ignorar errores de autoplay
          });
        }}
        aria-label="Video de embarcación de lujo"
      >
        {currentSource && (
          <>
            {/* Preferir WebM para mejor compresión */}
            <source src={currentSource.replace(".mp4", ".webm")} type="video/webm" />
            {/* Fallback a MP4 */}
            <source src={currentSource.replace(".webm", ".mp4")} type="video/mp4" />
            {/* Fallback final */}
            <source src={currentSource} type="video/mp4" />
          </>
        )}
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Overlay oscuro para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark/20 via-transparent to-luxury-dark/60" />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Texto centrado */}
      {!isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white uppercase tracking-tight text-center"
            style={{ 
              fontFamily: 'var(--font-meta-headline), "FF Meta Headline Compressed Bold", "FF Meta Headline", "Meta", Arial, sans-serif',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              fontStretch: 'condensed'
            }}
          >
            True Vibes
          </motion.h1>
        </div>
      )}

      {/* Barra de búsqueda - Parte inferior */}
      {!isLoading && (
        <div className="absolute bottom-32 md:bottom-20 left-0 right-0 flex items-center justify-center z-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="group w-full max-w-4xl flex items-center gap-0 bg-white/98 backdrop-blur-sm border-4 border-luxury-gold rounded-full p-1 shadow-2xl hover:bg-luxury-gold transition-colors duration-300 cursor-pointer"
            onClick={() => setIsSearchMenuOpen(true)}
          >
            <Search className="w-6 h-6 text-gray-400 ml-2 group-hover:text-luxury-dark transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search..."
              className="flex-1 border-0 focus:ring-0 bg-transparent text-luxury-light text-lg placeholder:text-gray-400 group-hover:placeholder:text-luxury-dark group-hover:text-luxury-dark transition-colors duration-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchMenuOpen(true);
              }}
              readOnly
            />
            <Button 
              className="bg-luxury-gold text-luxury-dark border-2 border-luxury-gold hover:bg-black hover:text-white hover:border-black uppercase font-bold px-8 py-3 text-base rounded-full transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchMenuOpen(true);
              }}
            >
              Search
            </Button>
          </motion.div>
        </div>
      )}

      {/* Menú de búsqueda modal */}
      <AnimatePresence>
        {isSearchMenuOpen && (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setIsSearchMenuOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-luxury-gold w-full max-w-5xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header del menú */}
            <div className="flex items-center justify-between p-6 border-b-2 border-luxury-dark/20">
              <h2 className="text-2xl font-bold text-luxury-dark uppercase">Search</h2>
              <button
                onClick={() => setIsSearchMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luxury-dark/10 transition-colors"
              >
                <X className="w-6 h-6 text-luxury-dark" />
              </button>
            </div>

            {/* Barra de búsqueda dentro del menú */}
            <div className="p-6 border-b-2 border-luxury-dark/20">
              <div className="flex items-center gap-3 bg-white rounded-full p-2 border-2 border-luxury-dark/20">
                <Search className="w-5 h-5 text-gray-400 ml-2" />
                <Input
                  type="text"
                  placeholder="Search yachts..."
                  className="flex-1 border-0 focus:ring-0 bg-transparent text-luxury-light text-base"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <select className="bg-transparent border-0 text-luxury-dark text-sm font-semibold cursor-pointer outline-none">
                    <option>SIZE</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                  <select className="bg-transparent border-0 text-luxury-dark text-sm font-semibold cursor-pointer outline-none">
                    <option>PRICE</option>
                    <option>$0-$1000</option>
                    <option>$1000-$5000</option>
                    <option>$5000+</option>
                  </select>
                  <select className="bg-transparent border-0 text-luxury-dark text-sm font-semibold cursor-pointer outline-none">
                    <option>WHEN</option>
                    <option>This Month</option>
                    <option>Next Month</option>
                    <option>Custom</option>
                  </select>
                </div>
                <Button className="bg-luxury-dark text-white hover:bg-luxury-dark/90 uppercase font-bold px-6 py-2 rounded-full">
                  Search
                </Button>
              </div>
            </div>

            {/* Contenido del menú */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Resultados de búsqueda */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-bold text-luxury-dark uppercase mb-4">Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Resultado 1 */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow">
                      <div className="aspect-video bg-gray-200"></div>
                      <div className="p-4">
                        <h4 className="font-bold text-luxury-dark text-lg mb-2">Yacht Name</h4>
                        <p className="text-gray-600 text-sm">Description here</p>
                      </div>
                    </div>
                    {/* Resultado 2 */}
                    <div className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow">
                      <div className="aspect-video bg-gray-200"></div>
                      <div className="p-4">
                        <h4 className="font-bold text-luxury-dark text-lg mb-2">Yacht Name</h4>
                        <p className="text-gray-600 text-sm">Description here</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trending Searches */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-luxury-dark uppercase mb-4">Trending Searches</h3>
                  <div className="space-y-2">
                    {[
                      "Special Offers",
                      "Luxury Yachts",
                      "Bahamas Charter",
                      "Caribbean Yachts",
                      "Where to Go"
                    ].map((item, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-luxury-dark hover:text-white transition-colors text-luxury-dark font-semibold"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Indicador de carga progresiva */}
      {!isVideoLoaded && currentSource && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-30">
          <motion.div
            className="h-full bg-luxury-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      )}
    </div>
  );
}

