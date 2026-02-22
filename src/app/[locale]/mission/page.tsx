"use client";

import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Image from "next/image";
import { FloatingCross } from "@/components/three";
import AnimatedCounter from "@/components/animated-counter";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function MissionPage() {
  const t = useTranslations("mission");
  const tn = useTranslations("newsletter");

  const newsletterMessages = {
    defaultButton: tn("defaultButton"),
    loading: tn("loading"),
    emailError: tn("emailError"),
    successMessage: tn("successMessage"),
    errorMessage: tn("errorMessage"),
  };

  return (
    <>
      {/* --- HERO SECTION : Style "Cinématique" --- */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-base-300">
        <Image
          src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Overlay avec gradient pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-300 via-base-300/60 to-transparent md:bg-gradient-to-r md:from-base-300 md:to-transparent" />
        <FloatingCross className="absolute right-0 top-0 z-0 h-full w-2/5 opacity-40 hidden md:block" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20">
          <div className="max-w-2xl">
            <Reveal from="left">
              <span className="badge badge-primary badge-outline font-bold tracking-widest px-4 py-3 mb-4 uppercase">
                {t("eyebrow")}
              </span>
            </Reveal>
            <Reveal from="left" delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                {t("title")}
              </h1>
            </Reveal>
            <Reveal from="left" delay={0.2}>
              <p className="mt-6 text-lg md:text-xl text-base-content/80 leading-relaxed">
                {t("description")}
              </p>
            </Reveal>
          </div>

          {/* Statistiques flottantes plus modernes */}
          <Stagger
            from="up"
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                year: "2025",
                val: 52,
                label: t("stats.clinics"),
                desc: t("stats.activeMissions"),
              },
              {
                year: `4 ${t("stats.countries")}`,
                val: 310,
                label: t("stats.communities"),
                desc: t("stats.covered"),
              },
              {
                year: "Q4",
                val: 12400,
                label: t("stats.consultations"),
                desc: t("stats.avgPerQuarter"),
              },
              {
                year: "Staff",
                val: 1200,
                label: t("stats.trainedCaregivers"),
                desc: t("stats.continuousTraining"),
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-white/10 group hover:bg-primary hover:text-primary-content transition-all duration-500"
              >
                <div className="card-body p-6">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:text-primary-content">
                    {stat.year}
                  </span>
                  <div className="text-3xl font-black mt-1">
                    <AnimatedCounter value={stat.val} />{" "}
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <p className="text-xs opacity-70 group-hover:opacity-100 mt-2">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --- SECTION APPROCHE : Focus Visuel --- */}
      <section className="bg-base-100 py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="grid gap-16 md:grid-cols-[1fr_auto_1fr] items-center">
            <Reveal from="left">
              <div>
                <h2 className="text-4xl font-bold mb-8">
                  {t("approachTitle")}
                </h2>
                <p className="text-base-content/70 leading-relaxed mb-10">
                  {t("approachDescription")}
                </p>
                <div className="space-y-6">
                  {[
                    {
                      id: "01",
                      title: t("approach.mobileCare.title"),
                      desc: t("approach.mobileCare.desc"),
                    },
                    {
                      id: "02",
                      title: t("approach.localTraining.title"),
                      desc: t("approach.localTraining.desc"),
                    },
                    {
                      id: "03",
                      title: t("approach.prevention.title"),
                      desc: t("approach.prevention.desc"),
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group">
                      <span className="text-primary font-black text-xl opacity-20 group-hover:opacity-100 transition-opacity">
                        {item.id}
                      </span>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-sm opacity-60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Séparateur vertical sur desktop */}
            <div className="hidden md:block w-px h-full bg-base-content/10" />

            <Reveal from="right">
              <div className="card bg-base-200 overflow-hidden shadow-xl border border-base-300">
                <figure className="relative h-64 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800&q=80"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                </figure>
                <div className="card-body p-8">
                  <h3 className="card-title text-2xl font-bold mb-4">
                    {t("zonesTitle")}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed mb-6">
                    {t("zonesDescription")}
                  </p>
                  <ul className="space-y-3">
                    {[
                      t("zones.countries"),
                      t("zones.maternal"),
                      t("zones.emergency"),
                    ].map((zone, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm font-medium p-3 bg-base-100 rounded-lg border border-base-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {zone}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --- SECTION VALEURS : Cartes Épurées --- */}
      <section className="bg-base-200/60 py-24">
        <div className="mx-auto w-full max-w-6xl px-4 text-center mb-16">
          <Reveal from="up">
            <h2 className="text-4xl font-bold">{t("valuesTitle")}</h2>
          </Reveal>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4">
          <Stagger from="down" className="grid gap-8 md:grid-cols-3">
            {[
              {
                img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
                title: t("values.transparency.title"),
                desc: t("values.transparency.desc"),
              },
              {
                img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289",
                title: t("values.dignity.title"),
                desc: t("values.dignity.desc"),
              },
              {
                img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6",
                title: t("values.efficiency.title"),
                desc: t("values.efficiency.desc"),
              },
            ].map((val, i) => (
              <div
                key={i}
                className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-base-300"
              >
                <figure className="relative h-48 overflow-hidden">
                  <Image
                    src={`${val.img}?w=600&q=80`}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title font-bold text-primary group-hover:translate-x-1 transition-transform">
                    {val.title}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>

          <Reveal from="up" delay={0.3}>
            <div className="mt-16 flex flex-wrap justify-center gap-4">
              <Link
                className="btn btn-primary btn-lg shadow-lg px-8"
                href="/impact"
              >
                {t("impactBtn")}
              </Link>
              <Link className="btn btn-outline btn-lg px-8" href="/s-impliquer">
                {t("involveBtn")}
              </Link>
            </div>
          </Reveal>
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
