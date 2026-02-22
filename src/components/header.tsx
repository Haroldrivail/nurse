"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, Search, X } from "lucide-react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/language-switcher";

const MobileNavItem = ({
  href,
  label,
  onClick,
  active,
}: {
  href: string;
  label: string;
  onClick: () => void;
  active: boolean;
}) => (
  <motion.li whileTap={{ scale: 0.98 }}>
    <Link
      href={href}
      onClick={onClick}
      className={`w-full rounded-lg px-3 py-2 ${
        active ? "bg-primary text-primary-content" : "focus:bg-primary-content"
      }`}
    >
      {label}
    </Link>
  </motion.li>
);

export type SearchItem = {
  title: string;
  excerpt: string;
  href: string;
  tags?: string[];
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const t = useTranslations("nav");
  const ts = useTranslations("search");
  const tIndex = useTranslations("searchIndex");

  const searchIndex: SearchItem[] = useMemo(
    () => [
      {
        title: tIndex("mission.title"),
        excerpt: tIndex("mission.excerpt"),
        href: "/mission",
        tags: tIndex.raw("mission.tags") as string[],
      },
      {
        title: tIndex("about.title"),
        excerpt: tIndex("about.excerpt"),
        href: "/about",
        tags: tIndex.raw("about.tags") as string[],
      },
      {
        title: tIndex("projects.title"),
        excerpt: tIndex("projects.excerpt"),
        href: "/projects",
        tags: tIndex.raw("projects.tags") as string[],
      },
      {
        title: tIndex("impact.title"),
        excerpt: tIndex("impact.excerpt"),
        href: "/impact",
        tags: tIndex.raw("impact.tags") as string[],
      },
      {
        title: tIndex("involve.title"),
        excerpt: tIndex("involve.excerpt"),
        href: "/s-impliquer",
        tags: tIndex.raw("involve.tags") as string[],
      },
      {
        title: tIndex("donate.title"),
        excerpt: tIndex("donate.excerpt"),
        href: "/dons",
        tags: tIndex.raw("donate.tags") as string[],
      },
      {
        title: tIndex("blog.title"),
        excerpt: tIndex("blog.excerpt"),
        href: "/blog",
        tags: tIndex.raw("blog.tags") as string[],
      },
      {
        title: tIndex("legal.title"),
        excerpt: tIndex("legal.excerpt"),
        href: "/legal",
        tags: tIndex.raw("legal.tags") as string[],
      },
    ],
    [tIndex],
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSearch = (initialValue = "") => {
    setSearchQuery(initialValue);
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleMobileSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = mobileQuery.trim();
    if (!next) return;
    closeMenu();
    openSearch(next);
  };

  const normalizedQuery = useMemo(() => {
    return searchQuery
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim();
  }, [searchQuery]);

  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return searchIndex.filter((item) => {
      const haystack = [item.title, item.excerpt, ...(item.tags ?? [])]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, searchIndex]);

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
            <div role="tablist" className="tabs tabs-border">
              <Link
                role="tab"
                href="/mission"
                className={`tab ${pathname === "/mission" ? "tab-active" : ""}`}
              >
                {t("mission")}
              </Link>
              <Link
                role="tab"
                href="/about"
                className={`tab ${pathname === "/about" ? "tab-active" : ""}`}
              >
                {t("about")}
              </Link>
              <Link
                role="tab"
                href="/projects"
                className={`tab ${pathname === "/projects" ? "tab-active" : ""}`}
              >
                {t("projects")}
              </Link>
              <Link
                role="tab"
                href="/impact"
                className={`tab ${pathname === "/impact" ? "tab-active" : ""}`}
              >
                {t("impact")}
              </Link>
              <Link
                role="tab"
                href="/s-impliquer"
                className={`tab ${pathname === "/s-impliquer" ? "tab-active" : ""}`}
              >
                {t("getInvolved")}
              </Link>
              <Link
                role="tab"
                href="/dons"
                className={`tab ${pathname === "/dons" ? "tab-active" : ""}`}
              >
                {t("donate")}
              </Link>
              <Link
                role="tab"
                href="/blog"
                className={`tab ${pathname === "/blog" ? "tab-active" : ""}`}
              >
                {t("blog")}
              </Link>
            </div>
          </div>
          <div className="navbar-end flex items-center gap-3 lg:gap-4">
            <LanguageSwitcher />
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.18 }}
            >
              <button
                type="button"
                aria-label={t("search")}
                onClick={() => openSearch()}
                className="flex items-center"
              >
                <Search className="h-5 w-5 text-primary cursor-pointer bold" />
              </button>
            </motion.div>
            <button
              type="button"
              className="btn btn-ghost btn-circle lg:hidden relative"
              aria-label={t("openMenu")}
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
            {/* <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.18 }}
              className="hidden lg:block"
            >
              <Link className="btn btn-primary" href="/dons">
                {t("donate")}
              </Link>
            </motion.div> */}
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
                        {t("foundation")}
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
                    label={t("mission")}
                    onClick={closeMenu}
                    active={pathname === "/mission"}
                  />
                  <MobileNavItem
                    href="/about"
                    label={t("about")}
                    onClick={closeMenu}
                    active={pathname === "/about"}
                  />
                  <MobileNavItem
                    href="/projects"
                    label={t("projects")}
                    onClick={closeMenu}
                    active={pathname === "/projects"}
                  />
                  <MobileNavItem
                    href="/impact"
                    label={t("impact")}
                    onClick={closeMenu}
                    active={pathname === "/impact"}
                  />
                  <MobileNavItem
                    href="/s-impliquer"
                    label={t("getInvolved")}
                    onClick={closeMenu}
                    active={pathname === "/s-impliquer"}
                  />
                  <MobileNavItem
                    href="/dons"
                    label={t("donate")}
                    onClick={closeMenu}
                    active={pathname === "/dons"}
                  />
                  <MobileNavItem
                    href="/blog"
                    label={t("blog")}
                    onClick={closeMenu}
                    active={pathname === "/blog"}
                  />
                </ul>
                <form onSubmit={handleMobileSearch} className="mt-4">
                  <label className="input outline-none flex w-full items-center gap-2 border border-base-300 bg-base-200/50 px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <Search className="h-5 w-5 text-primary" />
                    <input
                      type="search"
                      required
                      placeholder={ts("placeholder")}
                      aria-label={ts("ariaLabel")}
                      className="input w-full focus:outline-none bg-transparent shadow-none"
                      value={mobileQuery}
                      onChange={(event) => setMobileQuery(event.target.value)}
                    />
                  </label>
                </form>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen ? (
          <>
            <motion.div
              key="search-overlay"
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeSearch}
            />
            <motion.div
              key="search-dialog"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-6 z-60 w-[92%] max-w-2xl -translate-x-1/2 rounded-2xl bg-base-100 p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    {ts("title")}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    {ts("heading")}
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label={ts("close")}
                  className="btn btn-ghost btn-circle"
                  onClick={closeSearch}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4">
                <label className="input outline-none flex w-full items-center gap-2 border border-base-300 bg-base-200/50 px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                  <Search className="h-5 w-5 text-primary" />
                  <input
                    type="search"
                    placeholder={ts("placeholder")}
                    aria-label={ts("ariaLabel")}
                    className="input w-full focus:outline-none bg-transparent shadow-none"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    autoFocus
                  />
                </label>
              </div>

              <div className="mt-5 max-h-[50vh] overflow-auto">
                {normalizedQuery === "" ? (
                  <div className="grid gap-3">
                    {searchIndex.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="card bg-base-200 shadow transition hover:shadow-md"
                        onClick={closeSearch}
                      >
                        <div className="card-body">
                          <h3 className="card-title text-base">{item.title}</h3>
                          <p className="text-sm text-base-content/70">
                            {item.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : results.length > 0 ? (
                  <div className="grid gap-3">
                    {results.map((item) => (
                      <Link
                        key={`${item.href}-${item.title}`}
                        href={item.href}
                        className="card bg-base-200 shadow transition hover:shadow-md"
                        onClick={closeSearch}
                      >
                        <div className="card-body">
                          <h3 className="card-title text-base">{item.title}</h3>
                          <p className="text-sm text-base-content/70">
                            {item.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info">
                    {ts("noResults", { query: searchQuery })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
