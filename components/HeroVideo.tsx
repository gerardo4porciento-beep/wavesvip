"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight text-center"
            style={{ 
              fontFamily: '"Arial Arabic Bold", "Arial Arabic", Arial, sans-serif',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
              letterSpacing: '0.05em'
            }}
          >
            Amazing Awaits
          </motion.h1>
        </div>
      )}

      {/* Barra de búsqueda - Parte inferior */}
      {!isLoading && (
        <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center z-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="group w-full max-w-4xl flex items-center gap-0 bg-white/98 backdrop-blur-sm border-4 border-luxury-gold rounded-full p-1 shadow-2xl hover:bg-luxury-gold transition-colors duration-300"
          >
            <Search className="w-6 h-6 text-gray-400 ml-2 group-hover:text-luxury-dark transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search..."
              className="flex-1 border-0 focus:ring-0 bg-transparent text-luxury-light text-lg placeholder:text-gray-400 group-hover:placeholder:text-luxury-dark group-hover:text-luxury-dark transition-colors duration-300"
            />
            <Button className="bg-luxury-gold text-luxury-dark border-2 border-luxury-gold hover:bg-black hover:text-white hover:border-black uppercase font-bold px-8 py-3 text-base rounded-full transition-colors duration-300">
              Search
            </Button>
          </motion.div>
        </div>
      )}

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

