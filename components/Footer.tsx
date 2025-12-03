import Link from "next/link";
import { Instagram, Facebook, Youtube, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FFD700] w-full min-h-screen relative overflow-hidden">
      {/* Letras grandes WAVES VIP */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-[20vw] md:text-[15vw] font-bold leading-none tracking-tight select-none">
          WAVES VIP
        </h1>
      </div>

      {/* Enlaces inferiores izquierda */}
      <div className="absolute bottom-8 left-8 flex flex-wrap gap-x-8 gap-y-2 z-10">
        <Link
          href="/#experiencia"
          className="text-black text-sm md:text-base font-medium hover:opacity-70 transition-opacity"
        >
          SUSTAINABILITY
        </Link>
        <Link
          href="/cookie-policy"
          className="text-black text-sm md:text-base font-medium hover:opacity-70 transition-opacity"
        >
          COOKIE POLICY
        </Link>
        <Link
          href="/privacy-policy"
          className="text-black text-sm md:text-base font-medium hover:opacity-70 transition-opacity"
        >
          PRIVACY POLICY
        </Link>
        <span className="text-black text-sm md:text-base font-medium">
          BY WAVES VIP
        </span>
      </div>

      {/* Iconos sociales inferiores derecha */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-10">
        <a
          href="https://facebook.com/wavesvip"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="Facebook"
        >
          <span className="text-xl font-bold">f</span>
        </a>
        <a
          href="https://instagram.com/wavesvip.ve"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://youtube.com/@wavesvip"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </a>
        <a
          href="#"
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white hover:opacity-80 transition-opacity"
          aria-label="Verified"
        >
          <ShieldCheck size={20} />
        </a>
      </div>
    </footer>
  );
}

