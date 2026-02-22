"use client";

import Reveal from "@/components/motion/reveal";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mail, ShieldCheck, FileText, Scale } from "lucide-react";

export default function LegalPage() {
  const t = useTranslations("legal");

  const sections = [
    {
      id: "notice",
      icon: <Scale className="h-5 w-5" />,
      title: t("legalNotice.title"),
      desc: t("legalNotice.description"),
      items: 3,
      key: "legalNotice",
    },
    {
      id: "privacy",
      icon: <ShieldCheck className="h-5 w-5" />,
      title: t("privacy.title"),
      desc: t("privacy.description"),
      items: 3,
      key: "privacy",
    },
    {
      id: "terms",
      icon: <FileText className="h-5 w-5" />,
      title: t("terms.title"),
      desc: t("terms.description"),
      items: 3,
      key: "terms",
    },
  ];

  return (
    <>
      {/* --- HERO : Sobre et Institutionnel --- */}
      <section className="bg-base-300/40 py-20 border-b border-base-300">
        <div className="mx-auto w-full max-w-4xl px-4 text-center md:text-left">
          <Reveal from="left">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
              {t("hero.eyebrow")}
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-base-content/60 leading-relaxed max-w-2xl">
              {t("hero.description")}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-base-100 rounded-full border border-base-300 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              {t("hero.lastUpdated", { date: "Février 2026" })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- CONTENT : Structure par Blocs --- */}
      <section className="bg-base-100 py-24">
        <div className="mx-auto w-full max-w-4xl px-4">
          <div className="space-y-24">
            {sections.map((section, idx) => (
              <Reveal key={section.id} from="up" delay={idx * 0.1}>
                <div id={section.id} className="group">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-primary-content transition-colors duration-500">
                      {section.icon}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight leading-none">
                      {section.title}
                    </h2>
                  </div>

                  <div className="pl-2 md:pl-16 space-y-6">
                    <p className="text-base text-base-content/70 leading-relaxed">
                      {section.desc}
                    </p>
                    <ul className="grid gap-4">
                      {Array.from({ length: section.items }).map((_, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-base-200/50 border border-transparent hover:border-base-300 transition-all"
                        >
                          <span className="text-primary font-bold mt-0.5">
                            •
                          </span>
                          <span className="text-sm leading-relaxed text-base-content/80">
                            {t(`${section.key}.items.${i}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* --- CTA FINAL : Contact & Support --- */}
          <div className="mt-32 p-10 md:p-16 bg-neutral text-neutral-content rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-black mb-6">
                Des questions d&apos;ordre juridique ?
              </h3>
              <p className="text-neutral-content/60 mb-10 max-w-xl mx-auto italic">
                Notre équipe est disponible pour vous éclairer sur nos
                politiques de transparence et de gestion des données.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  className="btn btn-primary px-10 rounded-full shadow-lg shadow-primary/20"
                  href="mailto:info@nurseinternationale.com"
                >
                  <Mail className="h-4 w-4 mr-2" /> {t("cta.primary")}
                </a>
                <Link
                  className="btn btn-outline btn-primary px-10 rounded-full"
                  href="/about"
                >
                  {t("cta.secondary")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
