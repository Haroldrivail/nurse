import Newsletter from "@/components/newsletter";
import Reveal from "@/components/motion/reveal";
import Stagger from "@/components/motion/stagger";
import Link from "next/link";
import Image from "next/image";
import { FloatingParticles } from "@/components/three";
import AnimatedCounter from "@/components/animated-counter";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getPublishedPosts, getPublishedProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nurse Hilfe Menschen Internationale — Soins, dignité et espoir",
  description:
    "Fondation humanitaire dédiée aux soins de santé, à la prévention et au soutien des communautés vulnérables. Découvrez nos missions, projets et impact.",
  openGraph: {
    title: "Nurse Hilfe Menschen Internationale",
    description:
      "Soigner, protéger et redonner espoir aux communautés vulnérables.",
    type: "website",
  },
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "fr-FR",
    { day: "numeric", month: "short", year: "numeric" },
  );
}

export default async function Home() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const allProjects = await getPublishedProjects(locale);
  const allPosts = await getPublishedPosts(locale);

  const latestProjects = allProjects.slice(0, 3);
  const latestPosts = allPosts.slice(0, 3);

  return (
    <>
      {/* --- HERO SECTION : Plus immersif --- */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-base-300">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dégradé directionnel pour un look plus moderne */}
          <div className="absolute inset-0 bg-gradient-to-r from-base-300/20 via-base-300/60 to-base-300" />
          <FloatingParticles className="z-0 opacity-40" count={120} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Colonne gauche : Texte */}
            <div className="max-w-2xl">
              <Reveal from="left">
                <span className="badge badge-primary badge-outline mb-4 font-bold tracking-widest px-4 py-3">
                  {t("heroEyebrow")}
                </span>
              </Reveal>
              <Reveal from="left" delay={0.1}>
                <h1 className="text-5xl font-bold leading-[1.1] md:text-7xl mb-6">
                  {t("heroTitle")}
                </h1>
              </Reveal>

              <Reveal from="left" delay={0.15}>
                <div className="flex items-center gap-3 text-xl font-medium mb-6">
                  {/* Petite ligne décorative */}
                  <span className="h-px w-8 bg-primary/50"></span>

                  <p>{t("heroActFor")}</p>

                  {/* Fenêtre de visualisation (hauteur fixe de 1.5em) */}
                  <span className="relative h-[1.5em] overflow-hidden">
                    {/* Conteneur animé qui porte TOUS les mots */}
                    <span className="flex flex-col animate-text-slide text-primary font-bold">
                      <span className="h-[1.5em] flex items-center">
                        {t("heroCommunities")}
                      </span>
                      <span className="h-[1.5em] flex items-center">
                        {t("heroCaregivers")}
                      </span>
                      <span className="h-[1.5em] flex items-center">
                        {t("heroVolunteers")}
                      </span>
                    </span>
                  </span>
                </div>
              </Reveal>

              <Reveal from="left" delay={0.3}>
                <p className="text-lg text-base-content/70 mb-8 max-w-lg">
                  {t("heroDescription")}
                </p>
              </Reveal>

              <div className="flex flex-wrap gap-4">
                <Link
                  className="btn btn-primary btn-lg shadow-xl shadow-primary/20"
                  href="/dons"
                >
                  {t("donateBtn")}
                </Link>
                <Link
                  className="btn btn-outline btn-lg backdrop-blur-sm"
                  href="#impliquer"
                >
                  {t("volunteerBtn")}
                </Link>
              </div>

              {/* Stats intégrées plus élégamment */}
              <Stagger
                from="up"
                className="grid grid-cols-3 gap-4 mt-12 border-t border-base-content/10 pt-8"
              >
                <div>
                  <div className="text-3xl font-bold text-primary">
                    <AnimatedCounter value={12} suffix="K+" />
                  </div>
                  <div className="text-xs uppercase opacity-60 font-bold">
                    {t("statPeople")}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">
                    <AnimatedCounter value={48} />
                  </div>
                  <div className="text-xs uppercase opacity-60 font-bold">
                    {t("statPrograms")}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">
                    <AnimatedCounter
                      value={1.2}
                      prefix="€"
                      suffix="M"
                      decimals={1}
                    />
                  </div>
                  <div className="text-xs uppercase opacity-60 font-bold">
                    {t("statFunds")}
                  </div>
                </div>
              </Stagger>
            </div>

            {/* Colonne droite : CTA Cards flottantes */}
            <div className="hidden lg:flex flex-col gap-6 items-end">
              <Reveal from="right" delay={0.4}>
                <div className="card w-80 bg-base-100 shadow-2xl border border-white/10 backdrop-blur-xl">
                  <div className="card-body p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        ❤
                      </div>
                      <h3 className="font-bold">{t("ctaTitle")}</h3>
                    </div>
                    <p className="text-sm opacity-70 mb-4">{t("ctaDesc")}</p>
                    <Link
                      className="btn btn-primary btn-sm btn-block"
                      href="/dons"
                    >
                      {t("supportCause")}
                    </Link>
                  </div>
                </div>
              </Reveal>
              <Reveal from="right" delay={0.5}>
                <div className="card w-72 bg-base-100/80 shadow-xl border border-white/10 mr-12 backdrop-blur-md">
                  <div className="card-body p-5">
                    <h3 className="text-sm font-bold opacity-60 uppercase tracking-tighter">
                      {t("quickDonate")}
                    </h3>
                    <p className="text-xs mb-3">{t("quickDonateDesc")}</p>
                    <Link
                      className="link link-primary text-xs font-bold"
                      href="/dons"
                    >
                      {t("chooseAmount")} →
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION PROJETS : Cartes "Glass" avec survol --- */}
      <section id="projets" className="bg-base-100 py-24">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-xl">
              <Reveal from="left">
                <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs">
                  {t("projectsEyebrow")}
                </span>
                <h2 className="text-4xl font-bold mt-4">
                  {t("projectsTitle")}
                </h2>
              </Reveal>
            </div>
            <Reveal from="right">
              <Link className="btn btn-ghost group" href="/projects">
                {t("projectsExplore")}{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <Stagger from="up" className="grid gap-8 md:grid-cols-3">
            {latestProjects.map((project) => (
              <Link
                href={`/projects/${project.slug}`}
                key={project.slug}
                className="group"
              >
                <article className="card bg-base-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-base-content/5">
                  <figure className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image ?? "..."}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4">
                      <div className="badge badge-primary font-bold shadow-lg uppercase text-[10px] tracking-widest">
                        {project.theme}
                      </div>
                    </div>
                  </figure>
                  <div className="card-body p-8">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold uppercase opacity-50 tracking-wider">
                        {project.region}
                      </span>
                    </div>
                    <h3 className="card-title text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm opacity-70 line-clamp-2 my-4">
                      {project.impact}
                    </p>
                    <div className="card-actions justify-between items-center mt-4 border-t border-base-content/10 pt-6">
                      <span className="text-xs font-bold opacity-60 underline decoration-primary/30 underline-offset-4">
                        {t("seeProject")}
                      </span>
                      {/* <div className="btn btn-primary btn-sm btn-circle">❤</div> */}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="impact" className="bg-base-100 py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="text-center mb-16">
            <Reveal from="up">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-3">
                {t("impactEyebrow")}
              </p>
              <h3 className="text-4xl font-bold">{t("impactTitle")}</h3>
            </Reveal>
          </div>

          <Stagger from="down" className="grid gap-8 md:grid-cols-3">
            {[
              {
                label: t("impactAccessRate"),
                val: 34,
                pref: "+",
                suff: "%",
                desc: t("impactAccessDesc"),
              },
              {
                label: t("impactEmergencies"),
                val: 1240,
                pref: "",
                suff: "",
                desc: t("impactEmergenciesDesc"),
              },
              {
                label: t("impactPartners"),
                val: 78,
                pref: "",
                suff: "",
                desc: t("impactPartnersDesc"),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group card bg-base-200 hover:bg-primary hover:text-primary-content transition-all duration-500 shadow-xl border border-base-300"
              >
                <div className="card-body items-center text-center p-10">
                  <p className="text-sm font-bold opacity-60 uppercase mb-4">
                    {item.label}
                  </p>
                  <div className="text-5xl font-black mb-4">
                    <AnimatedCounter
                      value={item.val}
                      prefix={item.pref}
                      suffix={item.suff}
                    />
                  </div>
                  <div className="h-1 w-12 bg-primary group-hover:bg-primary-content mb-6 transition-colors" />
                  <p className="text-sm opacity-80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="impliquer" className="bg-base-200/60 py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <Reveal from="left">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  {t("involveEyebrow")}
                </p>
                <h3 className="mt-3 text-4xl font-bold">{t("involveTitle")}</h3>
              </Reveal>
            </div>
          </div>

          <Stagger from="up" className="grid gap-8 md:grid-cols-3">
            {[
              {
                img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
                title: t("volunteering"),
                desc: t("volunteeringDesc"),
                link: t("seeOpportunities"),
              },
              {
                img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
                title: t("employment"),
                desc: t("employmentDesc"),
                link: t("discoverPositions"),
              },
              {
                img: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a",
                title: t("membership"),
                desc: t("membershipDesc"),
                link: t("becomeMember"),
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card bg-base-100 shadow-xl group overflow-hidden border border-base-300"
              >
                <figure className="relative h-56 overflow-hidden">
                  <Image
                    src={`${item.img}?w=600&q=80`}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                </figure>
                <div className="card-body">
                  <h4 className="card-title text-xl font-bold">{item.title}</h4>
                  <p className="text-sm opacity-70 mb-6">{item.desc}</p>
                  <div className="card-actions justify-end border-t border-base-200 pt-4">
                    <Link
                      className="btn btn-ghost btn-sm text-primary font-bold group"
                      href="/about"
                    >
                      {item.link}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* --- SECTION PARTENAIRES : Minimalisme --- */}
      <section id="partenaires" className="bg-base-100 py-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-2">
              {t("partnersEyebrow")}
            </p>
            <h3 className="text-2xl font-bold italic opacity-80">
              {t("partnersTitle")}
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {/* Format logo plus compact et élégant */}
            {[
              "OMS",
              "Croix-Rouge",
              "UNICEF",
              "MSF",
              "GAVI",
              "BMG",
              "UE",
              "BM",
            ].map((name) => (
              <div
                key={name}
                className="px-6 py-3 border border-dashed border-base-content/20 rounded-full text-sm font-black tracking-tighter"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="evenements" className="bg-base-200/40 py-24">
        <div className="mx-auto w-full max-w-6xl px-4 text-center mb-16">
          <h3 className="text-4xl font-bold">{t("eventsTitle")}</h3>
        </div>
        <div className="mx-auto w-full max-w-6xl px-4">
          <Stagger from="down" className="grid gap-8 md:grid-cols-3">
            {/* Utilisation de cartes avec "Date Badge" flottant */}
            {[
              {
                date: "MAR 2026",
                title: "Forum partenaires",
                img: "https://images.unsplash.com/photo-1591522811280-a8759970b03f",
              },
              {
                date: "AVR 2026",
                title: "Semaine santé rurale",
                img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb",
              },
              {
                date: "JUIN 2026",
                title: "Gala solidarité",
                img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
              },
            ].map((ev, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6 shadow-2xl">
                  <Image
                    src={`${ev.img}?w=600&q=80`}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 badge badge-primary p-4 font-bold">
                    {ev.date}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {ev.title}
                </h4>
                <p className="text-sm opacity-60 line-clamp-2">
                  Rejoignez-nous pour cet événement majeur en faveur de la santé
                  communautaire.
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="blog" className="bg-base-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <Reveal from="left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {t("blogEyebrow")}
            </p>
          </Reveal>
          <Reveal from="left" delay={0.05}>
            <h3 className="mt-3 text-3xl font-semibold">{t("blogTitle")}</h3>
          </Reveal>
          <Stagger
            from="down"
            className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 md:grid-cols-3 md:py-20"
          >
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="card bg-base-200 shadow h-full"
              >
                <figure className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={
                      post.image ??
                      "https://images.unsplash.com/photo-1504711434969-e33886168d9c?w=600&q=80"
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </figure>
                <div className="card-body flex flex-col">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary">
                    <span>{post.category}</span>
                    <span className="text-base-content/40">•</span>
                    <span className="normal-case text-base-content/60">
                      {post.published_at
                        ? formatDate(post.published_at, locale)
                        : ""}{" "}
                      · {post.read_time}
                    </span>
                  </div>
                  <h2 className="card-title mt-3 min-h-[3.5rem] text-xl line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-base-content/70 min-h-[4.5rem] line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="card-actions mt-auto pt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="btn btn-outline btn-primary btn-sm"
                    >
                      {t("readBlog")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      <Reveal from="down">
        <Newsletter
          variant="card"
          title={t("newsletterTitle")}
          description={t("newsletterDesc")}
          buttonText={t("newsletterBtn")}
        />
      </Reveal>
    </>
  );
}
