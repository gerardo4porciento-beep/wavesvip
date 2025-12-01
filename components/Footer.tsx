import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo width={140} height={50} />
            </div>
            <p className="text-luxury-light/70 mb-4 max-w-md">
              Experiencia de lujo en el paraíso de Morrocoy. Embarcaciones de
              élite para momentos inolvidables.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/wavesvip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-luxury-light/70 hover:text-luxury-gold hover:bg-luxury-gold/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/wavesvip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-luxury-light/70 hover:text-luxury-gold hover:bg-luxury-gold/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/wavesvip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-luxury-light/70 hover:text-luxury-gold hover:bg-luxury-gold/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:info@wavesvip.com"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-luxury-light/70 hover:text-luxury-gold hover:bg-luxury-gold/20 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-light mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#embarcaciones"
                  className="text-luxury-light/70 hover:text-luxury-gold transition-colors"
                >
                  Embarcaciones
                </Link>
              </li>
              <li>
                <Link
                  href="/#experiencia"
                  className="text-luxury-light/70 hover:text-luxury-gold transition-colors"
                >
                  Experiencia
                </Link>
              </li>
              <li>
                <Link
                  href="/#galeria"
                  className="text-luxury-light/70 hover:text-luxury-gold transition-colors"
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link
                  href="/reservar"
                  className="text-luxury-light/70 hover:text-luxury-gold transition-colors"
                >
                  Reservar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold text-luxury-light mb-4">Contacto</h4>
            <ul className="space-y-2 text-luxury-light/70">
              <li>
                <a
                  href="mailto:info@wavesvip.com"
                  className="hover:text-luxury-gold transition-colors"
                >
                  info@wavesvip.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+584123456789"
                  className="hover:text-luxury-gold transition-colors"
                >
                  +58 412 345 6789
                </a>
              </li>
              <li className="text-sm">
                Parque Nacional Morrocoy
                <br />
                Estado Falcón, Venezuela
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-luxury-light/10 pt-8 text-center text-luxury-light/60 text-sm">
          <p>
            © {currentYear} Waves VIP. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

