import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goTo = (index: number) => {
    setCurrentIndex((index + images.length) % images.length);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        <div
          className="relative h-[50vh] md:h-[65vh] overflow-hidden cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${name} - Foto ${currentIndex + 1}`}
              className="h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(currentIndex - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 backdrop-blur-sm p-2 text-foreground hover:bg-gold hover:text-primary-foreground transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goTo(currentIndex + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 backdrop-blur-sm p-2 text-foreground hover:bg-gold hover:text-primary-foreground transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-8 bg-gold" : "w-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-shrink-0 h-16 w-24 rounded overflow-hidden border-2 transition-all ${
                i === currentIndex ? "border-gold" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 rounded-full bg-secondary p-2 text-foreground hover:bg-gold hover:text-primary-foreground transition-all z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <img
              src={images[currentIndex]}
              alt={`${name} - Foto ${currentIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goTo(currentIndex - 1); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-3 text-foreground hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goTo(currentIndex + 1); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-secondary p-3 text-foreground hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
