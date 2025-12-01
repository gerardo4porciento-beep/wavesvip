import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waves VIP | Embarcaciones de Lujo en Morrocoy",
  description:
    "Experimenta el lujo en su máxima expresión. Alquila embarcaciones deportivas de élite en el Parque Nacional Morrocoy, Venezuela.",
  keywords: [
    "yates de lujo",
    "alquiler de barcos",
    "Morrocoy",
    "Venezuela",
    "embarcaciones deportivas",
    "experiencia VIP",
  ],
  openGraph: {
    title: "Waves VIP | Embarcaciones de Lujo en Morrocoy",
    description:
      "Experimenta el lujo en su máxima expresión. Alquila embarcaciones deportivas de élite.",
    type: "website",
    locale: "es_VE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}

