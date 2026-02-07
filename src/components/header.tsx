"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const DesktopNavItem = ({ href, label }: { href: string; label: string }) => (
  <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
    <Link href={href} className="hover:bg-primary-content bg-soft text-primary">
      {label}
    </Link>
  </motion.li>
);

const MobileNavItem = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) => (
  <motion.li whileTap={{ scale: 0.98 }}>
    <Link
      href={href}
      onClick={onClick}
      className="w-full rounded-lg focus:bg-primary-content px-3 py-2"
    >
      {label}
    </Link>
  </motion.li>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="navbar">
          <div className="navbar-start">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/logo-simple.png"
                  alt="Logo Nurse Hilfe Menschen Internationale"
                  width={80}
                  height={80}
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-2 text-sm font-medium">
              <DesktopNavItem href="/mission" label="Mission" />
              <DesktopNavItem href="/about" label="À propos" />
              <DesktopNavItem href="/projects" label="Causes/Projets" />
              <DesktopNavItem href="/impact" label="Impact" />
              <DesktopNavItem href="/s-impliquer" label="Impliquez-vous" />
              <DesktopNavItem href="/dons" label="Faire un don" />
              <DesktopNavItem href="/blog" label="Actualités" />
            </ul>
          </div>
          <div className="navbar-end flex items-center gap-3 lg:gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.18 }}
            >
              <Search className="h-5 w-5 text-primary cursor-pointer bold" />
            </motion.div>
            <button
              type="button"
              className="btn btn-ghost btn-circle lg:hidden relative"
              aria-label="Ouvrir le menu"
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              <motion.div
                animate={{
                  rotate: isMenuOpen ? 90 : 0,
                  opacity: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`absolute inset-0 flex items-center justify-center ${isMenuOpen ? "hidden" : "block"}`}
              >
                <MenuIcon />
              </motion.div>
              <motion.div
                animate={{
                  rotate: isMenuOpen ? 0 : -90,
                  opacity: isMenuOpen ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`absolute inset-0 flex items-center justify-center ${isMenuOpen ? "block" : "hidden"}`}
              >
                <X />
              </motion.div>
            </button>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.18 }}
              className="hidden lg:block"
            >
              <Link className="btn btn-primary" href="/dons">
                Faire un don
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <>
            <motion.div
              key="mobile-overlay"
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={closeMenu}
            />
            <motion.aside
              key="mobile-drawer"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="fixed bottom-0 left-0 right-0 z-50 w-full rounded-t-2xl bg-base-100 px-4 py-10 shadow-2xl"
              onClick={closeMenu}
            >
              <div onClick={(event) => event.stopPropagation()}>
                <div className="mb-4 flex items-center gap-3">
                  <Link
                    href="/"
                    className="flex items-center gap-3"
                    onClick={closeMenu}
                  >
                    <Image
                      src="/images/logo-simple.png"
                      alt="Logo Nurse Hilfe Menschen Internationale"
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-primary">
                        Fondation
                      </p>
                      <p className="text-sm font-semibold">
                        Nurse Hilfe Menschen Internationale
                      </p>
                    </div>
                  </Link>
                </div>
                <ul className="menu gap-1 text-sm font-medium w-full">
                  <MobileNavItem
                    href="/mission"
                    label="Mission"
                    onClick={closeMenu}
                  />
                  <MobileNavItem
                    href="/about"
                    label="À propos"
                    onClick={closeMenu}
                  />
                  <MobileNavItem
                    href="/projects"
                    label="Causes/Projets"
                    onClick={closeMenu}
                  />
                  <MobileNavItem
                    href="/impact"
                    label="Impact"
                    onClick={closeMenu}
                  />
                  <MobileNavItem
                    href="/s-impliquer"
                    label="Impliquez-vous"
                    onClick={closeMenu}
                  />
                  <MobileNavItem
                    href="/dons"
                    label="Faire un don"
                    onClick={closeMenu}
                  />
                  <MobileNavItem
                    href="/blog"
                    label="Actualités"
                    onClick={closeMenu}
                  />
                </ul>
                <label className="input outline-none mt-4 flex w-full items-center gap-2 border border-base-300 bg-base-200/50 px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                  <Search className="h-5 w-5 text-primary" />
                  <input
                    type="search"
                    required
                    placeholder="Rechercher..."
                    aria-label="Rechercher un contenu"
                    className="input w-full focus:outline-none bg-transparent shadow-none"
                  />
                </label>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
