"use client";

import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Link from "next/link";
import Image from "next/image";
import { GlobeScene, FloatingParticles } from "@/components/three";
import AnimatedCounter from "@/components/animated-counter";
import { useTranslations } from "next-intl";
import StoryCard from "@/components/story-card";

export default function ImpactPage() {
  const t = useTranslations("impact");
  const tn = useTranslations("newsletter");

  const newsletterMessages = {
    defaultButton: tn("defaultButton"),
    loading: tn("loading"),
    emailError: tn("emailError"),
    successMessage: tn("successMessage"),
    errorMessage: tn("errorMessage"),
  };

  const kpis = [
    { label: t("kpis.patients"), value: 132480 },
    { label: t("kpis.consultations"), value: 49200 },
    { label: t("kpis.mobileClinics"), value: 52 },
    { label: t("kpis.professionals"), value: 1260 },
  ];

  const impactByCountry = [
    {
      key: "senegal",
      country: t("countries.senegal.name"),
      patients: t("countries.senegal.patients"),
      clinics: t("countries.senegal.clinics"),
      professionals: t("countries.senegal.professionals"),
    },
    {
      key: "guinee_conakry",
      country: t("countries.guinee_conakry.name"),
      patients: t("countries.guinee_conakry.patients"),
      clinics: t("countries.guinee_conakry.clinics"),
      professionals: t("countries.guinee_conakry.professionals"),
    },
    {
      key: "cameroun",
      country: t("countries.cameroun.name"),
      patients: t("countries.cameroun.patients"),
      clinics: t("countries.cameroun.clinics"),
      professionals: t("countries.cameroun.professionals"),
    },
  ];

  return (
    <>
      {/* --- HERO : Data & Vision --- */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-base-300">
        <Image
          src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1600&q=80"
          alt=""
          fill
          className="object-cover opacity-30 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-base-300/80 to-transparent" />
        <FloatingParticles className="z-0 opacity-40" count={120} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal from="left">
                <span className="badge badge-primary badge-outline font-bold tracking-widest px-4 py-3 mb-6 uppercase">
                  {t("hero.eyebrow")}
                </span>
                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                  {t("hero.title")}
                </h1>
                <p className="mt-6 text-xl text-base-content/70 leading-relaxed max-w-xl">
                  {t("hero.description")}
                </p>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40">
                  <span className="w-8 h-px bg-current" />
                  {t("lastUpdated", { date: "Février 2026" })}
                </div>
              </Reveal>
            </div>

            <div className="relative hidden lg:block">
              <GlobeScene className="h-[500px] w-full" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-base-300 pointer-events-none" />
            </div>
          </div>

          {/* KPI Dashboard */}
          <Stagger
            from="up"
            className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {kpis.map((item, i) => (
              <div
                key={i}
                className="card bg-base-100/50 backdrop-blur-xl border border-white/10 shadow-2xl group hover:bg-primary transition-all duration-500"
              >
                <div className="card-body p-8">
                  <h2 className="text-4xl font-black group-hover:text-primary-content transition-colors">
                    <AnimatedCounter value={item.value} />
                  </h2>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-50 group-hover:text-primary-content group-hover:opacity-100 transition-all">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --- IMPACT PAR PAYS : Cartographie de l'Action --- */}
      <section className="bg-base-100 py-24">
        <div className="mx-auto w-full max-w-6xl px-4 text-center mb-16">
          <Reveal from="up">
            <h2 className="text-4xl font-black mb-4">{t("byCountry.title")}</h2>
            <p className="max-w-2xl mx-auto opacity-70 italic">
              &ldquo;{t("byCountry.description")}&rdquo;
            </p>
          </Reveal>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4">
          <Stagger from="left" className="grid gap-10 md:grid-cols-3">
            {impactByCountry.map((item) => (
              <div key={item.key} className="group flex flex-col">
                <div className="relative h-64 w-full rounded-[2rem] overflow-hidden shadow-xl mb-6">
                  <Image
                    src={`/images/${item.key}.jpeg`}
                    alt={item.country}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                      {item.country}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 px-2">
                  {[
                    {
                      val: item.patients,
                      label: t("byCountry.labels.patients"),
                    },
                    { val: item.clinics, label: t("byCountry.labels.clinics") },
                    {
                      val: item.professionals,
                      label: t("byCountry.labels.professionals"),
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 border-b border-base-200"
                    >
                      <span className="text-sm font-bold opacity-40 uppercase tracking-widest">
                        {stat.label}
                      </span>
                      <span className="text-lg font-black text-primary">
                        {stat.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --- SECTION RÉCITS DE VIE (Page Impact corrigée) --- */}
      <section className="bg-base-200 py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <Reveal from="left">
                <h2 className="text-4xl font-black">{t("stories.title")}</h2>
                <p className="mt-4 opacity-70">
                  Découvrez l&apos;humain derrière les chiffres.
                </p>
              </Reveal>
            </div>
            <Reveal from="right">
              <Link className="btn btn-outline rounded-full px-8" href="/blog">
                {t("stories.ctaPrimary")}
              </Link>
            </Reveal>
          </div>

          <Stagger from="up" className="grid gap-8 md:grid-cols-3">
            {/* Ici, on ré-utilise ton composant StoryCard avec ses propres modals */}
            <StoryCard
              title={t("stories.items.0.title")}
              img="/images/accident_senegal.jpeg"
              desc={t("stories.items.0.desc")}
              cta={t("stories.cta")}
            />

            {/* Ajoute d'autres StoryCard ici */}
          </Stagger>
        </div>
      </section>

      <Newsletter
        variant="card"
        eyebrow={t("newsletter.eyebrow")}
        title={t("newsletter.title")}
        description={t("newsletter.description")}
        note={t("newsletter.note")}
        messages={newsletterMessages}
      />
    </>
  );
}
