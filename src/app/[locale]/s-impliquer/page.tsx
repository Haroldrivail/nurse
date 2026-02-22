"use client";

import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Image from "next/image";
import { NetworkGraph } from "@/components/three";
import AnimatedCounter from "@/components/animated-counter";
import ContactForm from "@/components/contact-form";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SimpliquerPage() {
  const t = useTranslations("involve");
  const tn = useTranslations("newsletter");

  const newsletterMessages = {
    defaultButton: tn("defaultButton"),
    loading: tn("loading"),
    emailError: tn("emailError"),
    successMessage: tn("successMessage"),
    errorMessage: tn("errorMessage"),
  };

  const stats = [
    {
      label: t("stats.volunteers.label"),
      value: 120,
      suffix: "+",
      desc: t("stats.volunteers.description"),
    },
    {
      label: t("stats.partners.label"),
      value: 38,
      suffix: "",
      desc: t("stats.partners.description"),
    },
    {
      label: t("stats.responseTime.label"),
      value: 72,
      suffix: "h",
      desc: t("stats.responseTime.description"),
    },
  ];

  return (
    <>
      {/* --- HERO : Connection & Réseau --- */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-base-300">
        <Image
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-base-300/50 via-base-300 to-base-100" />
        <NetworkGraph
          className="absolute inset-0 z-0 opacity-40"
          nodeCount={35}
        />

        <div className="relative z-10 mx-auto w-full max-w-10/12 px-4 py-20">
          <div className="max-w-3xl">
            <Reveal from="left">
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-4 block">
                {t("hero.eyebrow")}
              </span>
              <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-base-content/70 leading-relaxed">
                {t("hero.description")}
              </p>
            </Reveal>
          </div>

          {/* Stats Floating Grid */}
          <Stagger
            from="up"
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="card bg-base-100/40 backdrop-blur-md border border-white/10 shadow-xl group hover:bg-base-100 transition-colors duration-500"
              >
                <div className="card-body p-8">
                  <div className="text-primary font-black text-4xl mb-2">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest mb-2">
                    {s.label}
                  </h3>
                  <p className="text-xs opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --- MODES D'ENGAGEMENT : Cartes Action --- */}
      <section className="bg-base-100 py-24">
        <div className="mx-auto w-full max-w-10/12 px-4">
          <Stagger from="up" className="grid gap-8 md:grid-cols-3">
            {[
              {
                key: "volunteering",
                img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
              },
              {
                key: "partnerships",
                img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
              },
              {
                key: "membership",
                img: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="group card bg-base-200 border border-base-300 overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <figure className="relative h-56 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={t(`cards.${item.key}.imageAlt`)}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                </figure>
                <div className="card-body p-8">
                  <h2 className="card-title text-2xl font-bold mb-3">
                    {t(`cards.${item.key}.title`)}
                  </h2>
                  <p className="text-sm opacity-70 leading-relaxed mb-6">
                    {t(`cards.${item.key}.description`)}
                  </p>
                  <div className="card-actions">
                    <a
                      className="btn btn-primary btn-block rounded-full group-hover:shadow-lg shadow-primary/20 transition-all"
                      href="#contact"
                    >
                      {t(`cards.${item.key}.cta`)}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      

      {/* --- CONTACT : Formulaire épuré --- */}
      <section id="contact" className="bg-base-200/6 py-24">
        <div className="mx-auto w-full max-w-10/12 px-4">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal from="left">
              <div className="sticky top-24">
                <span className="text-primary font-bold uppercase tracking-widest text-xs">
                  Rejoignez-nous
                </span>
                <h2 className="text-4xl font-black mt-4 mb-6">
                  {t("contact.title")}
                </h2>
                <p className="text-lg opacity-70 mb-10">
                  {t("contact.description")}
                </p>
                <div className="space-y-6">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-base-200 border border-base-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium">
                        {t(`contact.items.${i}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal from="right">
              <div className="bg-base-100 p-2 md:p-10 rounded-[3rem] border-2 border-base-200 shadow-2xl">
                <div className="p-4">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
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
