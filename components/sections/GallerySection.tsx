"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

// Imágenes de ejemplo - En producción vendrán de Cloudinary
const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200",
    alt: "Yate en Morrocoy",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200",
    alt: "Aguas turquesas",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
    alt: "Atardecer en el mar",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    alt: "Cayo en Morrocoy",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200",
    alt: "Experiencia VIP",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
    alt: "Diversión en el mar",
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
    <section
      id="galeria"
      className="py-24 px-4 bg-white text-luxury-light"
    >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Galería
            </h2>
            <p className="text-xl text-luxury-light/80 max-w-3xl mx-auto">
              Capturamos momentos únicos de las experiencias más exclusivas en
              el paraíso de Morrocoy.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelectedImage(image.id)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de imagen */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center text-luxury-light hover:bg-luxury-gold hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <img
                src={
                  galleryImages.find((img) => img.id === selectedImage)?.url ||
                  ""
                }
                alt={
                  galleryImages.find((img) => img.id === selectedImage)?.alt ||
                  ""
                }
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

