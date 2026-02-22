"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "nhmi_cookie_consent";
const CONSENT_EVENT = "nhmi_cookie_consent_change";

function subscribeToConsent(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener(CONSENT_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(CONSENT_EVENT, handler);
  };
}

function getConsentSnapshot() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

function getConsentServerSnapshot() {
  return null;
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const visible = consent === null;

  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleChoice = (value: "all" | "essential" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setDetailsOpen(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-4 z-50 mx-auto max-w-5xl px-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">Gestion des cookies (RGPD)</p>
              <p className="mt-1 text-sm text-base-content/70">
                Nous utilisons des cookies essentiels pour le bon fonctionnement
                du site. Les cookies optionnels nous aident à mesurer l’audience
                et améliorer l’expérience. Vous pouvez choisir votre préférence.
              </p>
              <button
                type="button"
                onClick={() => setDetailsOpen(true)}
                className="mt-2 text-sm font-medium text-primary underline"
              >
                En savoir plus
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="btn btn-outline btn-primary btn-sm"
                onClick={() => handleChoice("rejected")}
              >
                Tout refuser
              </button>
              <button
                className="btn btn-outline btn-primary btn-sm"
                onClick={() => handleChoice("essential")}
              >
                Essentiels seulement
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleChoice("all")}
              >
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {detailsOpen ? (
          <>
            <motion.div
              key="cookie-overlay"
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDetailsOpen(false)}
            />
            <motion.div
              key="cookie-dialog"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-10 z-60 w-[92%] max-w-2xl -translate-x-1/2 rounded-2xl bg-base-100 p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Préférences cookies
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Détails des catégories
                  </h2>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-circle"
                  aria-label="Fermer"
                  onClick={() => setDetailsOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-4 text-sm text-base-content/70">
                <div>
                  <p className="font-semibold text-base-content">
                    Cookies essentiels (obligatoires)
                  </p>
                  <p>
                    Nécessaires pour la sécurité, l’affichage et le
                    fonctionnement du site.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-base-content">
                    Cookies de mesure d’audience (optionnels)
                  </p>
                  <p>
                    Nous aident à comprendre l’utilisation du site pour
                    améliorer nos contenus et l’expérience.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  className="btn btn-outline btn-primary btn-sm"
                  onClick={() => handleChoice("rejected")}
                >
                  Tout refuser
                </button>
                <button
                  className="btn btn-outline btn-primary btn-sm"
                  onClick={() => handleChoice("essential")}
                >
                  Essentiels seulement
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleChoice("all")}
                >
                  Tout accepter
                </button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
