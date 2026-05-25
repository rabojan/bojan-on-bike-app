"use client";

import { useState } from "react";

type LightboxGalleryProps = {
  images: string[];
  altPrefix?: string;
};

export default function LightboxGallery({ images, altPrefix = "Galerija" }: LightboxGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  const prev = () => setOpen((i) => (i !== null ? Math.max(0, i - 1) : null));
  const next = () => setOpen((i) => (i !== null ? Math.min(images.length - 1, i + 1) : null));

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setOpen(index)}
            className={`group overflow-hidden rounded-[20px] focus:outline-none ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <img
              src={image}
              alt={`${altPrefix} ${index + 1}`}
              className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110 ${
                index === 0 ? "min-h-[280px] md:min-h-[420px]" : "min-h-[140px] md:min-h-[200px]"
              }`}
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-xl text-white hover:border-white/50"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-bold text-zinc-300">
            {open + 1} / {images.length}
          </div>

          {/* Prev */}
          {open > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-2xl text-white hover:border-[#c58b46]/60"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <img
            src={images[open]}
            alt={`${altPrefix} ${open + 1}`}
            className="max-h-[88vh] max-w-[88vw] rounded-[20px] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {open < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-2xl text-white hover:border-[#c58b46]/60"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
