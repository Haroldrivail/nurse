"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface StoryCardProps {
  title: string;
  img: string;
  desc: string;
  cta: string;
}

export default function StoryCard({ title, img, desc, cta }: StoryCardProps) {
  const [open, setOpen] = useState(false);

  // Empêcher le scroll quand la modal est ouverte
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [open]);

  return (
    <>
      {/* --- Card de présentation --- */}
      <motion.div
        whileHover={{ y: -5 }}
        className="group card bg-base-100 shadow-xl border border-base-200 overflow-hidden cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <figure className="relative h-56 w-full overflow-hidden">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
        </figure>
        <div className="card-body p-6">
          <h3 className="card-title text-xl font-bold group-hover:text-primary transition-colors italic">
            &ldquo;{title}&rdquo;
          </h3>
          <p className="text-sm text-base-content/70 line-clamp-3 leading-relaxed">
            {desc}
          </p>
          <div className="card-actions mt-4">
            <span className="text-xs font-black uppercase tracking-widest text-primary border-b-2 border-primary/20 group-hover:border-primary transition-all pb-1">
              {cta}
            </span>
          </div>
        </div>
      </motion.div>

      {/* --- Modal Immersive (AnimatePresence pour la fluidité) --- */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Overlay flouté */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-base-300/80 backdrop-blur-md"
            />

            {/* Conteneur Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-base-100 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
            >
              {/* Bouton Fermer flottant */}
              <button
                className="absolute top-6 right-6 z-50 btn btn-circle btn-sm md:btn-md bg-base-100 shadow-xl border-none hover:bg-primary hover:text-primary-content transition-all"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>

              {/* Section Image (Mobile: haut, Desktop: gauche) */}
              <div className="relative h-64 md:h-auto md:w-3/5 shrink-0">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 md:hidden" />
              </div>

              {/* Section Texte */}
              <div className="flex flex-col p-8 md:p-16 md:w-2/5 overflow-y-auto">
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                  Témoignage Impact
                </span>
                <h3 className="text-3xl md:text-5xl font-black mb-8 leading-tight italic">
                  &ldquo;{title}&rdquo;
                </h3>
                <div className="prose prose-neutral">
                  <p className="text-lg text-base-content/80 leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                    {desc}
                  </p>
                </div>

                <div className="mt-auto pt-10">
                  <button
                    onClick={() => setOpen(false)}
                    className="btn btn-primary btn-outline btn-block rounded-full"
                  >
                    Fermer le récit
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
