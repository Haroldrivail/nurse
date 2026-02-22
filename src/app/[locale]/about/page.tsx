"use client";

import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Image from "next/image";
import Link from "next/link";
import { FloatingParticles } from "@/components/three";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  const leadership = [
    {
      name: "Marius Gatcheussi",
      img: "https://placehold.co/400",
      role: t("leadership.roles.president"),
    },
    {
      name: "Soulemanou Nchare Ntieche",
      img: "https://placehold.co/400",
      role: t("leadership.roles.secretary"),
    },
    {
      name: "Fatoumata Diallo",
      img: "https://placehold.co/400",
      role: t("leadership.roles.treasurer"),
    },
  ];

  return (
    <>
      {/* --- HERO : Focus Humain --- */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-base-300">
        <Image
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-base-300 via-base-300/80 to-transparent" />
        <FloatingParticles className="z-0 opacity-40" count={80} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20">
          <div className="max-w-2xl">
            <Reveal from="left">
              <span className="badge badge-primary badge-outline font-bold tracking-widest px-4 py-3 mb-4 uppercase">
                {t("hero.eyebrow")}
              </span>
            </Reveal>
            <Reveal from="left" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                {t("hero.title")}
              </h1>
            </Reveal>
            <Reveal from="left" delay={0.2}>
              <p className="mt-6 text-lg text-base-content/80 leading-relaxed max-w-xl">
                {t("hero.description")}
              </p>
            </Reveal>
            <Reveal from="left" delay={0.3}>
              <div className="mt-8">
                <Link
                  className="btn btn-primary btn-lg shadow-xl shadow-primary/20 px-8"
                  href="/dons"
                >
                  {t("hero.ctaPrimary")}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- NOTRE HISTOIRE & PRINCIPES : Grille Équilibrée --- */}
      <section className="bg-base-100 py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div>
              <Reveal from="left">
                <p className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-4">
                  {t("story.eyebrow")}
                </p>
                <h2 className="text-4xl font-bold mb-6">{t("story.title")}</h2>
                <p className="text-base-content/70 leading-relaxed mb-10 text-lg">
                  {t("story.description")}
                </p>
              </Reveal>

              <Stagger from="up" className="grid gap-6 sm:grid-cols-2">
                <div className="card bg-base-200 border border-base-300 hover:border-primary/30 transition-colors">
                  <div className="card-body p-8">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 font-bold">
                      V
                    </div>
                    <h3 className="card-title text-xl font-bold">
                      {t("story.visionTitle")}
                    </h3>
                    <p className="text-sm opacity-70">
                      {t("story.visionDesc")}
                    </p>
                  </div>
                </div>
                <div className="card bg-base-200 border border-base-300 hover:border-primary/30 transition-colors">
                  <div className="card-body p-8">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 font-bold">
                      V
                    </div>
                    <h3 className="card-title text-xl font-bold">
                      {t("story.valuesTitle")}
                    </h3>
                    <p className="text-sm opacity-70">
                      {t("story.valuesDesc")}
                    </p>
                  </div>
                </div>
              </Stagger>
            </div>

            <Reveal from="right">
              <div className="card bg-primary text-primary-content shadow-2xl sticky top-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="card-body p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-current opacity-50" />
                    {t("principles.title")}
                  </h3>
                  <ul className="space-y-4">
                    {[0, 1, 2, 3].map((i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-snug"
                      >
                        <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                        {t(`principles.items.${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- GOUVERNANCE : Cartes Portraits --- */}
      <section className="bg-base-200/40 py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <Reveal from="left">
                <p className="text-primary font-bold uppercase tracking-[0.3em] text-xs">
                  {t("leadership.eyebrow")}
                </p>
                <h2 className="mt-3 text-4xl font-bold">
                  {t("leadership.title")}
                </h2>
              </Reveal>
            </div>
            <Reveal from="right">
              <Link
                className="btn btn-outline btn-primary group px-8"
                href="/dons"
              >
                {t("leadership.cta")}{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <Stagger from="up" className="grid gap-8 md:grid-cols-3">
            {leadership.map((member) => (
              <div
                key={member.name}
                className="group card bg-base-100 shadow-xl overflow-hidden border border-base-300"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="card-body p-8 items-center text-center">
                  <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {member.role}
                  </p>
                  <div className="w-12 h-0.5 bg-primary/20 mt-4 group-hover:w-24 transition-all duration-500" />
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --- ÉTHIQUE : Minimalisme Radical --- */}
      <section className="bg-base-100 py-24 border-t border-base-200">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal from="left">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.5em] opacity-30">
                  {t("ethics.eyebrow")}
                </span>
                <h2 className="mt-4 text-4xl font-bold mb-6">
                  {t("ethics.title")}
                </h2>
                <p className="text-lg opacity-70 leading-relaxed italic border-l-4 border-primary pl-6">
                  &ldquo;{t("ethics.description")}&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal from="right">
              <div className="bg-base-200 p-10 rounded-3xl border border-base-300 shadow-inner">
                <ul className="grid gap-4">
                  {[0, 1, 2, 3].map((i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 p-4 bg-base-100 rounded-2xl shadow-sm border border-base-200 group hover:border-primary transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium opacity-80">
                        {t(`ethics.items.${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-center">
                  <Link className="btn btn-primary btn-block" href="/dons">
                    {t("ethics.cta")}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
