import Link from "next/link";
import { Instagram, Facebook, Youtube, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-gold w-full py-24 md:py-32 relative overflow-x-hidden">
      {/* Letras grandes WAVES que ocupan todo el ancho */}
      <div className="w-screen relative left-1/2 -translate-x-1/2">
        <h1 
          className="text-luxury-dark font-black leading-none select-none text-center"
          style={{ 
            fontFamily: '"Helvetica Neue", "Helvetica", "Arial Black", "Arial", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(14rem, 40vw, 35rem)',
            letterSpacing: '-0.12em',
            fontStretch: 'condensed',
            width: '100vw',
            transform: 'scaleX(1.25)',
            transformOrigin: 'center',
            whiteSpace: 'nowrap',
            overflow: 'visible'
          }}
        >
          WAVES
        </h1>
      </div>

      {/* Enlaces inferiores izquierda */}
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex flex-wrap gap-x-6 md:gap-x-8 gap-y-2 z-10">
        <Link
          href="/#experiencia"
          className="text-luxury-dark text-sm md:text-base font-medium hover:opacity-70 transition-opacity"
        >
          SUSTAINABILITY
        </Link>
        <Link
          href="/cookie-policy"
          className="text-luxury-dark text-sm md:text-base font-medium hover:opacity-70 transition-opacity"
        >
          COOKIE POLICY
        </Link>
        <Link
          href="/privacy-policy"
          className="text-luxury-dark text-sm md:text-base font-medium hover:opacity-70 transition-opacity"
        >
          PRIVACY POLICY
        </Link>
        <span className="text-luxury-dark text-sm md:text-base font-medium">
          BY WAVES VIP
        </span>
      </div>

      {/* Iconos sociales inferiores derecha */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-3 md:gap-4 z-10">
        <a
          href="https://facebook.com/wavesvip"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-luxury-dark flex items-center justify-center text-luxury-gold hover:opacity-80 transition-opacity"
          aria-label="Facebook"
        >
          <span className="text-xl font-bold">f</span>
        </a>
        <a
          href="https://instagram.com/wavesvip.ve"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-luxury-dark flex items-center justify-center text-luxury-gold hover:opacity-80 transition-opacity"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://youtube.com/@wavesvip"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-luxury-dark flex items-center justify-center text-luxury-gold hover:opacity-80 transition-opacity"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </a>
        <a
          href="#"
          className="w-12 h-12 rounded-full bg-luxury-dark flex items-center justify-center text-luxury-gold hover:opacity-80 transition-opacity"
          aria-label="Verified"
        >
          <ShieldCheck size={20} />
        </a>
      </div>
    </footer>
  );
}

