"use client";

import Newsletter from "@/components/newsletter";
import { ThemeContext } from "@/contexts/ThemeContext";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Moon,
  Plus,
  SendHorizonalIcon,
  Sun,
  X,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Stagger from "./motion/stagger";

export default function Footer() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const nextTheme = () => {
    if (theme === "light") return "dark";
    if (theme === "dark") return "light";
    return "light";
  };

  const handleToggle = () => {
    toggleTheme(nextTheme());
  };

  return (
    <footer className="border-t border-base-200 bg-base-100 px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-evenly gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="hidden md:flex md:gap-3 md:flex-row md:items-start md:justify-evenly flex-1 lg:pr-4">
            <div className="text-sm">
              <div className="text-base font-bold cursor-pointer list-none flex items-center gap-1">
                Explorer{" "}
                <span className={`md:hidden`}>
                  <Plus className="h-4 w-4 font-bold" />
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-base-content/70">
                <li>
                  <Link className="link link-hover" href="/mission">
                    Notre mission
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/about">
                    Gouvernance & transparence
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/projects">
                    Projets & causes
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/impact">
                    Impact
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/blog">
                    Actualités
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-sm lg:open">
              <div className="text-base font-bold cursor-pointer list-none flex items-center gap-1">
                Connecter{" "}
                <span className={`md:hidden`}>
                  <Plus className="h-4 w-4 font-bold" />
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-base-content/70">
                <li>
                  <a
                    className="link link-hover"
                    href="mailto:info@nurseinternationale.com"
                  >
                    Contactez-nous
                  </a>
                </li>
                <li>
                  <Link className="link link-hover" href="/about">
                    FAQ & gouvernance
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-sm md:open">
              <div className="text-base font-bold cursor-pointer list-none flex items-center gap-1">
                Donner{" "}
                <span className={`md:hidden`}>
                  <Plus className="h-4 w-4 font-bold" />
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-base-content/70">
                <li>
                  <Link className="link link-hover" href="/dons">
                    Faire un don
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/s-impliquer">
                    Devenir bénévole
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/dons">
                    Don récurrent
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:hidden flex gap-5 flex-col">
            <details className="text-sm footer-collapse">
              <summary className="text-base font-bold cursor-pointer list-none flex items-center gap-1">
                Explorer{" "}
                <span className={`md:hidden`}>
                  <Plus className="h-4 w-4 font-bold footer-plus" />
                </span>
              </summary>
              <ul className="mt-4 space-y-2 text-base-content/70">
                <li>
                  <Link className="link link-hover" href="/mission">
                    Notre mission
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/about">
                    Gouvernance & transparence
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/projects">
                    Projets & causes
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/impact">
                    Impact
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/blog">
                    Actualités
                  </Link>
                </li>
              </ul>
            </details>

            <details className="text-sm footer-collapse">
              <summary className="text-base font-bold cursor-pointer list-none flex items-center gap-1">
                Connecter{" "}
                <span className={`md:hidden`}>
                  <Plus className="h-4 w-4 font-bold footer-plus" />
                </span>
              </summary>
              <ul className="mt-4 space-y-2 text-base-content/70">
                <li>
                  <a
                    className="link link-hover"
                    href="mailto:info@nurseinternationale.com"
                  >
                    Contactez-nous
                  </a>
                </li>
                <li>
                  <Link className="link link-hover" href="/about">
                    FAQ & gouvernance
                  </Link>
                </li>
              </ul>
            </details>

            <details className="text-sm footer-collapse">
              <summary className="text-base font-bold cursor-pointer list-none flex items-center gap-1">
                Donner{" "}
                <span className={`md:hidden`}>
                  <Plus className="h-4 w-4 font-bold footer-plus" />
                </span>
              </summary>
              <ul className="mt-4 space-y-2 text-base-content/70">
                <li>
                  <Link className="link link-hover" href="/dons">
                    Faire un don
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/s-impliquer">
                    Devenir bénévole
                  </Link>
                </li>
                <li>
                  <Link className="link link-hover" href="/dons">
                    Don récurrent
                  </Link>
                </li>
              </ul>
            </details>
          </div>

          <Newsletter
            variant="split"
            title="S'inscrire aux E-News"
            description="Recevez nos dernières nouvelles, rapports et appels à l'action."
            buttonText="S'abonner"
            note="En vous inscrivant, vous acceptez notre politique de confidentialité."
            leadingIcon={<Mail className="h-4 w-4 text-base-content/50" />}
            buttonIcon={<SendHorizonalIcon className="h-4 w-4" />}
          />
        </div>

        <div className="divider my-8" />

        <div className="flex flex-col gap-6 text-sm text-base-content/70 md:flex-row md:items-center md:justify-between">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 md:gap-16">
            <span className="text-base font-semibold text-base-content">
              Social
            </span>
            <div>
              <Stagger
                from="down"
                className="flex items-center gap-6 md:gap-10"
              >
                <a
                  className="btn btn-sm btn-circle btn-soft btn-primary"
                  href="#"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  className="btn btn-sm btn-circle btn-soft btn-primary"
                  href="#"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  className="btn btn-sm btn-circle btn-soft btn-primary"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  className="btn btn-sm btn-circle btn-soft btn-primary"
                  href="#"
                  aria-label="X"
                >
                  <X className="h-5 w-5" />
                </a>
                <a
                  className="btn btn-sm btn-circle btn-soft btn-primary"
                  href="#"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </Stagger>
            </div>
            <div>
              <label className="swap swap-rotate btn btn-ghost btn-circle">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={handleToggle}
                />
                <Sun className="swap-off w-6 h-6" />
                <Moon className="swap-on w-6 h-6" />
              </label>
            </div>
          </div>
        </div>

        <div className="divider my-8" />

        <div>
          <Stagger
            from="left"
            alternate
            className="flex flex-col gap-6 text-base-content/70 md:flex-row md:items-start md:justify-between items-center"
          >
            <div className="flex items-center">
              <Image
                src="/images/logo-complet.png"
                alt="Logo complet Nurse Hilfe Menschen Internationale"
                width={160}
                height={48}
                className="w-auto object-contain"
              />
            </div>
            <div className="mt-3 text-base-content/70 text-justify md:mt-0 md:max-w-3xl">
              <p>
                Ensemble, pour des soins accessibles et humains. Transparence,
                dignité et impact mesurable guident toutes nos actions.
              </p>
              <p>
                Organisation humanitaire à but non lucratif. Les dons
                contribuent au financement de nos programmes de santé, de
                dignité et de soutien aux communautés vulnérables.
              </p>
            </div>
          </Stagger>
        </div>

        <div className="mt-6 text-xs text-base-content/60 flex flex-col gap-5 md:gap-0 md:flex-row items-center justify-between">
          <div className="mt-3 flex flex-wrap gap-4 text-center md:mt-0 justify-center">
            <Link className="link link-hover" href="/legal">
              Mentions légales
            </Link>
            <Link className="link link-hover" href="/legal">
              Politique de confidentialité
            </Link>
            <Link className="link link-hover" href="/legal">
              Conditions d&apos;utilisation
            </Link>
          </div>

          <div className="text-center md:text-right">
            © 2026 Nurse Hilfe Menschen Internationale. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
