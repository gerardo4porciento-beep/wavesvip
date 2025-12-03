"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TYPEWRITER_PHRASES = [
  "ALQUILER DE EMBARCACION PARA 8 PERSONAS",
  "LANCHAS DEPORTIVAS EN TUCACAS",
  "RESERVA PARA FIN DE SEMANA",
  "EXCURSION AL CAYO SOMBRERO"
];

const destinations = [
  {
    id: "1",
    name: "Cayo Sombrero",
    image: "/cayos/cayo sombrero.png",
    features: ["Playa", "Palmeras", "Agua cristalina"],
  },
  {
    id: "2",
    name: "Cayo Boca Seca",
    image: "/cayos/cayo boca seca.png",
    features: ["Coral", "Ideal para niños", "Snorkel"],
  },
  {
    id: "3",
    name: "Cayo Pescadores",
    image: "/cayos/cayo pescadores.png",
    features: ["Pesca", "Gastronomía", "Tradicional"],
  },
  {
    id: "4",
    name: "Cayo Playuelita",
    image: "/cayos/cayo playuelita.png",
    features: ["Familiar", "Protegido", "Aguas cristalinas"],
  },
  {
    id: "5",
    name: "Bajo de los Juanes",
    image: "/cayos/bajo los juanes.png",
    features: ["Arrecifes", "Vida marina", "Esnórquel"],
  },
  {
    id: "6",
    name: "Bajo 360",
    image: "/cayos/bajo 360.png",
    features: ["Vistas 360", "Buceo", "Esnórquel"],
  },
];

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
  const [videoKey, setVideoKey] = useState(0); // Key para forzar recarga del video
  
  // Typewriter effect para la barra de búsqueda
  const [typewriterText, setTypewriterText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  // Agregar cache-busting a la URL del video
  const addCacheBuster = (url: string): string => {
    if (!url) return url;
    // Si ya tiene parámetros, agregar &, si no, agregar ?
    const separator = url.includes('?') ? '&' : '?';
    // Usar timestamp para forzar recarga
    return `${url}${separator}t=${Date.now()}`;
  };

  // Detectar soporte de formatos y seleccionar el mejor
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkSupport = () => {
      // Preferir WebM para mejor compresión, fallback a MP4
      const webmSupported = video.canPlayType('video/webm; codecs="vp9"') !== "";
      const mp4Supported = video.canPlayType('video/mp4; codecs="avc1.42E01E"') !== "";

      let sourceUrl = videoUrl;
      
      if (webmSupported && videoUrl.includes(".webm")) {
        sourceUrl = videoUrl.replace(".mp4", ".webm");
      } else if (mp4Supported) {
        sourceUrl = videoUrl.replace(".webm", ".mp4");
      }

      // Agregar cache-busting solo si la URL no es de Cloudinary con versión
      // (Cloudinary ya maneja versiones con /v1/, /v2/, etc.)
      if (!sourceUrl.match(/\/v\d+\//)) {
        sourceUrl = addCacheBuster(sourceUrl);
      }

      setCurrentSource(sourceUrl);
      // Forzar recarga cambiando la key del video
      setVideoKey(prev => prev + 1);
      setIsVideoLoaded(false);
      setIsLoading(true);
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

  // Forzar recarga del video cuando cambia la URL
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentSource) return;

    // Limpiar y recargar el video cuando cambia la fuente
    video.load();
    setIsVideoLoaded(false);
    setIsLoading(true);

    // Esperar a que el video se cargue
    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      setIsLoading(false);
    };

    video.addEventListener('canplay', handleCanPlay, { once: true });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentSource, videoKey]);

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

  // Efecto typewriter para la barra de búsqueda
  useEffect(() => {
    if (isLoading || isSearchMenuOpen) {
      setTypewriterText("");
      return;
    }

    const currentPhrase = TYPEWRITER_PHRASES[currentPhraseIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout | null = null;

    const type = () => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        // Escribiendo
        setTypewriterText(currentPhrase.slice(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(type, 100); // Velocidad de escritura
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        // Esperar antes de borrar
        isDeleting = true;
        timeout = setTimeout(type, 3000); // Esperar 3 segundos con el texto completo
      } else if (isDeleting && charIndex > 0) {
        // Borrando
        setTypewriterText(currentPhrase.slice(0, charIndex - 1));
        charIndex--;
        timeout = setTimeout(type, 50); // Velocidad de borrado (más rápida)
      } else if (isDeleting && charIndex === 0) {
        // Cambiar a la siguiente frase
        setTypewriterText("");
        setCurrentPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        isDeleting = false;
        timeout = setTimeout(type, 500); // Esperar antes de empezar la siguiente frase
      }
    };

    type();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentPhraseIndex, isLoading, isSearchMenuOpen]);


  if (hasError && fallbackImage) {
    return (
      <div
        className={cn(
          "relative w-full h-screen bg-cover bg-center bg-black",
          className
        )}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      >
      </div>
    );
  }

  return (
    <div 
      className={cn("relative w-full bg-black", className)}
      style={{
        height: '100dvh',
        minHeight: '-webkit-fill-available',
        marginTop: 'calc(-1 * env(safe-area-inset-top, 0px))',
        marginLeft: 'calc(-1 * env(safe-area-inset-left, 0px))',
        marginRight: 'calc(-1 * env(safe-area-inset-right, 0px))',
        width: 'calc(100vw + env(safe-area-inset-left, 0px) + env(safe-area-inset-right, 0px))',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      {/* Video Element */}
      <video
        key={videoKey}
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
            <source key={`webm-${videoKey}`} src={currentSource.replace(".mp4", ".webm")} type="video/webm" />
            {/* Fallback a MP4 */}
            <source key={`mp4-${videoKey}`} src={currentSource.replace(".webm", ".mp4")} type="video/mp4" />
            {/* Fallback final */}
            <source key={`final-${videoKey}`} src={currentSource} type="video/mp4" />
          </>
        )}
        Tu navegador no soporta videos HTML5.
      </video>


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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-0"
            style={{ 
              fontFamily: 'var(--font-meta-headline), "FF Meta Headline Compressed Bold", "FF Meta Headline", "Meta", Arial, sans-serif',
              letterSpacing: '-0.02em',
              fontWeight: 700,
              fontStretch: 'condensed'
            }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white uppercase tracking-tight text-center">
              VIVE LA
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white uppercase tracking-tight text-center">
              EXPERIENCIA
            </h1>
          </motion.div>
        </div>
      )}

      {/* Barra de búsqueda - Parte inferior */}
      {!isLoading && (
        <div className="absolute bottom-32 md:bottom-20 left-0 right-0 flex items-center justify-center z-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="group w-full max-w-4xl flex items-center gap-0 bg-transparent border-4 border-luxury-gold rounded-full p-1 shadow-2xl transition-colors duration-300 cursor-pointer"
            onClick={() => setIsSearchMenuOpen(true)}
          >
            <Search className="w-6 h-6 text-luxury-gold ml-2 transition-colors duration-300" />
            <div className="flex-1 relative">
              <Input
                type="text"
                value=""
                placeholder=""
                className="flex-1 border-0 focus:ring-0 bg-transparent text-white text-lg transition-colors duration-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchMenuOpen(true);
                }}
                readOnly
              />
              <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
                <span className="text-white/90 text-lg ml-3 truncate font-bold uppercase">
                  {typewriterText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
            </div>
            <Button 
              className="hidden md:flex bg-luxury-gold text-luxury-dark border-2 border-luxury-gold hover:bg-luxury-gold/90 uppercase font-bold px-8 py-3 text-base rounded-full transition-colors duration-300"
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

            {/* Contenido del menú - Destinos en cuadrícula */}
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-xl font-bold text-luxury-dark uppercase mb-6 text-center">Destinos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {destinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                    onClick={() => {
                      setIsSearchMenuOpen(false);
                      // Scroll a la sección de destinos
                      const destinosSection = document.getElementById('destinos');
                      if (destinosSection) {
                        destinosSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {/* Imagen */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-sm md:text-base font-bold text-white mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {destination.name}
                        </h4>
                        {/* Features destacados */}
                        <div className="flex flex-wrap gap-1">
                          {destination.features.slice(0, 2).map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-[10px] font-bold text-white bg-black/70 backdrop-blur-md rounded-full border border-white/30"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
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

