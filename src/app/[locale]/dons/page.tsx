"use client";

import DonationAmounts from "@/components/donation-amounts";
import DonationForm from "@/components/donation-form";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Image from "next/image";
import { PulsingHeart } from "@/components/three";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/hooks/use-currency"; // Import du hook

export default function DonsPage() {
  const t = useTranslations("donatePage");
  const { formatter, amounts } = useCurrency(); // Utilisation du formateur dynamique

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-base-300">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&q=80"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-base-300/40 to-base-300/90" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="hidden md:block"></div>
            <div className="bg-base-100/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
              <Reveal from="right">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  {t("hero.eyebrow")}
                </p>
                <h1 className="mt-4 text-5xl font-bold leading-tight">
                  {t("hero.title")}
                </h1>
                <p className="mt-6 text-lg text-base-content/80 leading-relaxed">
                  {t("hero.description")}
                </p>
                <div className="mt-8">
                  <DonationAmounts />
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a className="btn btn-primary btn-lg px-8" href="#formulaire">
                    {t("hero.ctaPrimary")}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* --- AJOUT DU PULSING HEART ICI --- */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-40 md:opacity-100">
          <div className="container mx-auto h-full relative">
            {/* On le positionne à gauche pour équilibrer le formulaire qui est à droite */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-[500px]">
              <PulsingHeart />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION IMPACT : Montants dynamiques --- */}
      <section id="formulaire" className="bg-base-100 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            <div className="lg:w-3/5">
              <Reveal from="left">
                <div className="card bg-base-200 shadow-xl border border-base-300">
                  <div className="card-body p-4 md:p-10">
                    <DonationForm />
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:w-2/5 flex flex-col justify-center">
              <Reveal from="right">
                <h3 className="text-3xl font-bold mb-6">{t("impact.title")}</h3>
                <div className="space-y-4">
                  {[0, 1, 2].map((idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-start p-4 bg-base-200/50 rounded-xl hover:bg-base-200 transition-colors"
                    >
                      <span className="text-primary font-bold text-lg min-w-[80px]">
                        {formatter.format(amounts[idx] || 0)}
                      </span>
                      <p className="text-sm">{t(`impact.items.${idx}`)}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION NIVEAUX : Prix des cartes dynamiques --- */}
      <section id="niveaux" className="bg-base-200/60 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <Reveal from="up">
              <h2 className="mt-4 text-4xl font-bold">{t("tiers.title")}</h2>
            </Reveal>
          </div>

          <Stagger
            from="up"
            className="grid gap-8 md:grid-cols-1 lg:grid-cols-3"
          >
            {[
              {
                img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
                badge: t("tiers.badges.essential"),
                amount: amounts[1],
                desc: t("tiers.cards.essential"),
              },
              {
                img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
                badge: t("tiers.badges.impact"),
                amount: amounts[2],
                desc: t("tiers.cards.impact"),
              },
              {
                img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&q=80",
                badge: t("tiers.badges.ambassador"),
                amount: amounts[3],
                desc: t("tiers.cards.ambassador"),
              },
            ].map((tier, idx) => (
              <div
                key={idx}
                className="card bg-base-100 shadow-xl group overflow-hidden"
              >
                <figure className="relative h-56 w-full">
                  <Image
                    src={tier.img}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="badge badge-primary font-bold p-3 shadow-lg">
                      {tier.badge}
                    </div>
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-2xl font-bold">
                    {formatter.format(tier.amount || 0)}
                    <span className="text-sm font-normal opacity-70">
                      /mois
                    </span>
                  </h3>
                  <p className="text-sm leading-relaxed mb-4">{tier.desc}</p>
                  <div className="card-actions justify-end">
                    <Link
                      className="btn btn-primary btn-block btn-outline"
                      href="/dons"
                    >
                      {t("tiers.chooseLevel")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --- FAQ : Structure en accordéon pour la clarté --- */}
      <section className="bg-base-100 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t("faq.title")}</h2>
          </div>
          <div className="space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="collapse collapse-plus bg-base-200">
                <input
                  type="radio"
                  name="my-accordion-3"
                  defaultChecked={i === 0}
                />
                <div className="collapse-title text-lg font-medium">
                  {t(`faq.items.${i}.q`)}
                </div>
                <div className="collapse-content text-sm text-base-content/70">
                  <p>{t(`faq.items.${i}.a`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
