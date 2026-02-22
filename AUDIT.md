# Audit Complet — Nurse Hilfe Menschen Internationale

**Date :** 17 février 2026  
**Framework :** Next.js 16.1 · React 19 · TypeScript 5.9  
**Styling :** Tailwind CSS 4 + DaisyUI 5  
**i18n :** next-intl (FR, EN, DE)  
**Backend :** Supabase (auth + DB) + Flutterwave (paiements)  
**3D :** React Three Fiber + Three.js  
**Erreurs TypeScript :** 0  
**Vulnérabilités npm :** 3 HIGH + 1 MODERATE (via `flutterwave-node-v3`)  
**Note globale : 5/10**

---

## Table des matières

1. [Sécurité](#1-sécurité-16-problèmes)
2. [Performance](#2-performance-9-problèmes)
3. [Gestion d'erreurs](#3-gestion-derreurs-8-lacunes)
4. [Qualité de code](#4-qualité-de-code-11-problèmes)
5. [Accessibilité](#5-accessibilité-8-problèmes)
6. [SEO](#6-seo-7-problèmes)
7. [Bonnes pratiques Next.js](#7-bonnes-pratiques-nextjs-8-problèmes)
8. [Plan d'action](#8-plan-daction-recommandé)
9. [Prompts de correction](#9-prompts-de-correction)

---

## 1. Sécurité (16 problèmes)

### Critiques

| #   | Problème                                                                                                                                                                                            | Fichier                                     |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| S1  | **XSS via `dangerouslySetInnerHTML`** — Le contenu des articles de blog est injecté comme HTML brut sans sanitisation (DOMPurify). Une compromission DB = XSS stocké.                               | `src/app/[locale]/blog/[slug]/page.tsx`     |
| S2  | **XSS via `dangerouslySetInnerHTML`** — Même problème avec `project.objectives` et `project.activities`.                                                                                            | `src/app/[locale]/projects/[slug]/page.tsx` |
| S3  | **Comparaison CSRF non timing-safe** — `headerToken === cookieToken` est vulnérable aux timing attacks. Doit utiliser `crypto.timingSafeEqual`.                                                     | `src/lib/csrf.ts`                           |
| S4  | **Comparaison hash webhook non timing-safe** — `hash !== expectedHash` même vulnérabilité.                                                                                                          | `src/app/api/donate/webhook/route.ts`       |
| S5  | **Endpoint `/api/donate/verify` non authentifié** — GET public, n'importe qui peut annuler/modifier des donations arbitraires via `?tx_ref=X&transaction_id=Y&status=cancelled`.                    | `src/app/api/donate/verify/route.ts`        |
| S6  | **Pas de vérification du montant** — Après vérification Flutterwave, le DB est mis à jour avec `verifyData.data.amount` sans vérifier qu'il correspond au montant original. Permet la manipulation. | `src/app/api/donate/verify/route.ts`        |

### Hautes

| #   | Problème                                                                                                     | Fichier                                 |
| --- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| S7  | **Pas de rate limiting sur `/api/subscribe`** — Permet le spam illimité de souscriptions newsletter.         | `src/app/api/subscribe/route.ts`        |
| S8  | **Pas de CSRF sur `/api/subscribe`** — Endpoint POST sans protection CSRF.                                   | `src/app/api/subscribe/route.ts`        |
| S9  | **Pas de protection brute-force sur le login admin** — Auth Supabase côté client sans rate limiting serveur. | `src/app/[locale]/admin/login/page.tsx` |
| S10 | **IP spoofable pour bypass rate limiter** — Fait confiance au header `x-forwarded-for` directement.          | `src/lib/rate-limit.ts`                 |
| S11 | **Rate limiter in-memory** — Ne protège pas dans un déploiement serverless multi-instance (Vercel).          | `src/lib/rate-limit.ts`                 |

### Moyennes

| #   | Problème                                                                                                                                                      | Fichier                                                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| S12 | **Non-null assertions sur les variables d'env** (`process.env.X!`) sans garde runtime. Variables manquantes = crash opaque.                                   | `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts`, `flutterwave.ts` |
| S13 | **Validation email faible** — `!email.includes("@") \|\| email.length < 5` accepte `@@@@@`.                                                                   | `src/app/api/contact/route.ts`                                               |
| S14 | **Pas de limites de longueur serveur** — `message` et `name` sans max-length côté serveur.                                                                    | `src/app/api/contact/route.ts`, `src/app/api/donate/route.ts`                |
| S15 | **Erreurs DB brutes exposées** — `throw new Error(error.message)` expose les détails Supabase au client.                                                      | `src/app/[locale]/admin/actions.ts`                                          |
| S16 | **3 vulnérabilités HIGH npm** — `node-forge` (ASN.1 Unbounded Recursion, ASN.1 Validator Desync) et `axios` (DoS via `__proto__`) dans `flutterwave-node-v3`. | `package.json` → `flutterwave-node-v3`                                       |

---

## 2. Performance (9 problèmes)

| #   | Problème                                                                                         | Impact                             | Fichier                                                          |
| --- | ------------------------------------------------------------------------------------------------ | ---------------------------------- | ---------------------------------------------------------------- |
| P1  | **Homepage charge TOUS les posts/projets puis `slice(0,3)`** — Devrait utiliser `.limit(3)`      | Requêtes DB surdimensionnées       | `src/app/[locale]/page.tsx`                                      |
| P2  | **Aucun cache Supabase** — Pas de `unstable_cache`, `revalidateTag` ni `cache()`                 | Chaque rendu = nouvelle requête DB | `src/lib/content.ts`                                             |
| P3  | **Pages admin sans pagination** — Contacts/donations chargent TOUS les enregistrements           | Lent avec croissance des données   | `src/app/[locale]/admin/contacts/page.tsx`, `donations/page.tsx` |
| P4  | **Memory leak du rate limiter** — La Map n'est jamais purgée des anciennes entrées               | Fuite mémoire progressive          | `src/lib/rate-limit.ts`                                          |
| P5  | **Boucle d'animation Three.js permanente** — `useFrame` tourne même quand l'onglet est invisible | CPU/GPU gaspillé                   | `src/components/three/globe-scene.tsx`                           |
| P6  | **Bundle Three.js lourd** chargé sur 5+ pages                                                    | Augmente le poids JS total         | `src/components/three/index.tsx`                                 |
| P7  | **Recherche sans debounce** dans le header — Filtre à chaque frappe                              | Re-renders excessifs               | `src/components/header.tsx`                                      |
| P8  | **Double création de client Supabase** dans les pages admin                                      | Appels auth doublés                | Pages admin contacts/donations                                   |
| P9  | **`require()` CommonJS pour Flutterwave**                                                        | Empêche le tree-shaking            | `src/lib/flutterwave.ts`                                         |

---

## 3. Gestion d'erreurs (8 lacunes)

| #   | Problème                                                                                                                                         | Fichier                                                |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| E1  | **`catch {}` vide silencieux** sur le setting de cookies                                                                                         | `src/lib/supabase/server.ts`                           |
| E2  | **Échec CSRF silencieux** — `.catch(() => {})` dans les formulaires = soumission 403 sans feedback                                               | `src/components/donation-form.tsx`, `contact-form.tsx` |
| E3  | **Pas de refresh du token CSRF** — TTL de 1h, pas de mécanisme de récupération pour les sessions longues                                         | Formulaires client                                     |
| E4  | **Erreurs Supabase ignorées** — Seul `if (!data)` est vérifié, jamais la propriété `error`                                                       | `src/lib/content.ts` (toutes les fonctions)            |
| E5  | **Server actions exposent les erreurs brutes** — `throw new Error(error.message)` transmet les détails internes au client                        | `src/app/[locale]/admin/actions.ts`                    |
| E6  | **Pas de fallback WebGL** — Si pas de GPU, les Canvas Three.js crashent sans UI de remplacement                                                  | Tous les composants Three.js                           |
| E7  | **Code mort après `redirect()`** — `redirect()` lance une exception dans Next.js ; le `return NextResponse.json(...)` qui suit est inatteignable | `src/app/api/auth/signout/route.ts`                    |
| E8  | **`generateMetadata` sans error handling** — Si la requête DB échoue dans la génération des métadonnées, la page crash                           | Pages détail blog/projet                               |

---

## 4. Qualité de code (11 problèmes)

| #   | Problème                                                                                                                   | Fichier                                                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| C1  | **Page d'accueil de 729 lignes** avec ~11 sections distinctes — À découper en composants de section                        | `src/app/[locale]/page.tsx`                                                                  |
| C2  | **Textes français hardcodés** dans les composants client au lieu d'utiliser `useTranslations()`                            | `donation-form.tsx`, `contact-form.tsx`, `cookie-banner.tsx`, `error.tsx`, `not-found.tsx`   |
| C3  | **Données d'événements hardcodées** sur la homepage (forums, galas) au lieu du DB ou i18n                                  | `src/app/[locale]/page.tsx`                                                                  |
| C4  | **`formatDate` dupliquée** dans 2 fichiers avec une logique identique                                                      | `src/app/[locale]/page.tsx`, `blog/page.tsx`                                                 |
| C5  | **Messages Newsletter reconstruits** identiquement dans 5+ composants                                                      | `mission/page.tsx`, `impact/page.tsx`, `s-impliquer/page.tsx`, `blog/page.tsx`, `footer.tsx` |
| C6  | **`PostForm` et `ProjectForm` identiques à 95%** — Même pattern onglets locales, états loading/error/success               | `admin/posts/post-form.tsx`, `admin/projects/project-form.tsx`                               |
| C7  | **Boutons de suppression quasi-identiques** — Ne diffèrent que par l'action appelée                                        | `admin/posts/delete-button.tsx` + équivalents projet/contact                                 |
| C8  | **Auth dupliquée inline** dans contacts/donations au lieu d'utiliser le helper `requireAdmin()` existant                   | `admin/contacts/page.tsx`, `admin/donations/page.tsx`                                        |
| C9  | **Fonction `createPaymentLink` morte** — Définie mais jamais utilisée, le route `/api/donate` construit son propre payload | `src/lib/flutterwave.ts`                                                                     |
| C10 | **Footer de 347 lignes** avec duplication mobile/desktop des mêmes liens                                                   | `src/components/footer.tsx`                                                                  |
| C11 | **Liens sociaux tous vers `#`** — Placeholders jamais remplacés                                                            | `src/components/footer.tsx`                                                                  |

---

## 5. Accessibilité (8 problèmes)

| #   | Problème                                                                                                                            | Fichier                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| A1  | **Formulaires sans `<label>`** — Inputs donation/contact utilisent `placeholder` comme seule identification                         | `donation-form.tsx`, `contact-form.tsx` |
| A2  | **Modales sans attributs ARIA** — Cookie banner et recherche sans `role="dialog"`, `aria-modal="true"`, ni focus trap               | `cookie-banner.tsx`, `header.tsx`       |
| A3  | **Pas de lien "skip to content"** pour la navigation clavier                                                                        | `header.tsx`                            |
| A4  | **Animations sans `prefers-reduced-motion`** — Three.js et Framer Motion ignorent les préférences                                   | Composants Three.js et motion           |
| A5  | **Loading states non annoncés** — Pas de `aria-live` ni `role="status"` sur les squelettes de chargement                            | `loading.tsx`, composants formulaire    |
| A6  | **Boutons icône-seul sans texte** — `<Trash2 />` sans `aria-label` ni texte accessible                                              | `admin/posts/delete-button.tsx`         |
| A7  | **Opacité de texte potentiellement non conforme** — `text-base-content/60` et `/70` peuvent ne pas atteindre le ratio WCAG AA 4.5:1 | Toutes les pages                        |
| A8  | **Pas de gestion focus après actions** — Après suppression / soumission, le focus n'est pas géré                                    | Formulaires admin                       |

---

## 6. SEO (7 problèmes)

| #    | Problème                                                                                                                                                          | Fichier                                                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| SEO1 | **Metadata statiques en français uniquement** — Les pages avec `export const metadata` ignorent la locale active. Doit utiliser `generateMetadata` + traductions. | `page.tsx`, `dons/page.tsx`, `about/page.tsx`, `mission/page.tsx`, `impact/page.tsx`, `legal/page.tsx`, `s-impliquer/page.tsx` |
| SEO2 | **Sitemap sans variantes locales** — Pas de préfixes `/en/`, `/de/` ni d'entrées `hreflang`                                                                       | `src/app/sitemap.ts`                                                                                                           |
| SEO3 | **Pas de `alternates.languages`** dans les métadonnées de page — Critique pour le SEO multilingue                                                                 | Toutes les pages                                                                                                               |
| SEO4 | **Pas d'URLs canoniques** explicites dans les métadonnées                                                                                                         | Toutes les pages                                                                                                               |
| SEO5 | **JSON-LD avec domaine hardcodé** au lieu d'utiliser `NEXT_PUBLIC_APP_URL`                                                                                        | `blog/[slug]/page.tsx`                                                                                                         |
| SEO6 | **`/search` dans le sitemap retourne 404** — La page appelle `notFound()`                                                                                         | `src/app/sitemap.ts`, `search/page.tsx`                                                                                        |
| SEO7 | **Pages admin indexables** par les moteurs de recherche — Manque `robots: { index: false }`                                                                       | `src/app/[locale]/admin/layout.tsx`                                                                                            |

---

## 7. Bonnes pratiques Next.js (8 problèmes)

| #   | Problème                                                                               | Impact                                       | Fichier                                                                                                                                        |
| --- | -------------------------------------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| BP1 | **`next/link` utilisé au lieu de `@/i18n/navigation` Link**                            | Liens sans préfixe de locale                 | `page.tsx`, `blog/page.tsx`, `projects/page.tsx`, `dons/page.tsx`, `confirmation/page.tsx`, `blog/[slug]/page.tsx`, `projects/[slug]/page.tsx` |
| BP2 | **`useTranslations` dans Server Components** au lieu de `getTranslations` (async)      | Potentiellement sous-optimal                 | `dons/page.tsx`, `about/page.tsx`, `mission/page.tsx`, `impact/page.tsx`, `legal/page.tsx`, `s-impliquer/page.tsx`                             |
| BP3 | **Pas de `<Suspense>` boundaries** autour des sections data-fetching                   | Pas de streaming SSR                         | `page.tsx`, `blog/page.tsx`, `projects/page.tsx`                                                                                               |
| BP4 | **Pas de `loading.tsx` pour les pages détail**                                         | Flash blanc à la navigation                  | `blog/[slug]/`, `projects/[slug]/`                                                                                                             |
| BP5 | **Classe CSS `text-rotate` inexistante** utilisée dans le hero de la homepage          | Style cassé/manquant                         | `src/app/[locale]/page.tsx`                                                                                                                    |
| BP6 | **Pas de `generateStaticParams` pour blog/projets slugs**                              | SSG non exploité = pages non pré-rendues     | `blog/[slug]/page.tsx`, `projects/[slug]/page.tsx`                                                                                             |
| BP7 | **Cookie banner non internationalisé**                                                 | Visible en français pour les visiteurs EN/DE | `src/components/cookie-banner.tsx`                                                                                                             |
| BP8 | **`useTranslations` vs `getTranslations`** — Mélange des deux APIs dans le même projet | Inconsistance de pattern                     | Pages serveur variées                                                                                                                          |

---

## 8. Plan d'action recommandé

### Sprint 1 — Sécurité critique ⛔

> Priorité absolue. Corrige les failles pouvant compromettre les utilisateurs ou les données.

- [ ] S1/S2 — Ajouter DOMPurify pour sanitiser `dangerouslySetInnerHTML`
- [ ] S3/S4 — Utiliser `crypto.timingSafeEqual` pour CSRF et webhook
- [ ] S5/S6 — Sécuriser `/api/donate/verify` (auth + vérification montant)
- [ ] S16 — Remplacer ou patcher les dépendances vulnérables de `flutterwave-node-v3`
- [ ] S12 — Ajouter des gardes runtime pour les variables d'environnement

### Sprint 2 — i18n & SEO 🌍

> Corrige le routage cassé et améliore le référencement multilingue.

- [ ] BP1 — Remplacer `next/link` par le Link de `@/i18n/navigation`
- [ ] SEO1 — Convertir `export const metadata` en `generateMetadata` avec traductions
- [ ] SEO2/SEO3 — Sitemap multilingue avec hreflang
- [ ] C2/BP7 — Internationaliser `DonationForm`, `ContactForm`, `CookieBanner`, `error.tsx`, `not-found.tsx`
- [ ] SEO7 — Bloquer l'indexation des pages admin

### Sprint 3 — Performance ⚡

> Réduit la charge serveur et améliore les temps de réponse.

- [ ] P1 — Ajouter `.limit()` aux requêtes Supabase homepage
- [ ] P2 — Wrapper les fonctions content.ts avec `unstable_cache` / `cache()`
- [ ] P3 — Paginer les tables admin
- [ ] P7 — Ajouter un debounce à la recherche du header
- [ ] BP6 — Implémenter `generateStaticParams` pour blog/projets

### Sprint 4 — Qualité & Architecture 🏗️

> Réduit la dette technique et la duplication.

- [ ] C1 — Découper la homepage en composants de section
- [ ] C6 — Abstraire PostForm/ProjectForm en composant générique
- [ ] C7 — Créer un `DeleteButton` générique
- [ ] C4/C5 — Extraire `formatDate` et messages newsletter en utils
- [ ] C9 — Supprimer `createPaymentLink` morte

### Sprint 5 — Accessibilité ♿

> Rend le site utilisable pour tous.

- [ ] A1 — Ajouter des `<label>` à tous les formulaires
- [ ] A3 — Implémenter un skip-to-content link
- [ ] A4 — Supporter `prefers-reduced-motion`
- [ ] E6 — Fallbacks WebGL pour Three.js
- [ ] A2 — ARIA + focus trap sur les modales

### Sprint 6 — Robustesse 🛡️

> Élimine les comportements silencieux et les crashs.

- [ ] E4 — Vérifier `error` dans toutes les requêtes Supabase
- [ ] E2/E3 — Feedback utilisateur + refresh CSRF
- [ ] E5/S15 — Messages d'erreur user-friendly dans les server actions
- [ ] S7/S8 — Rate limit + CSRF sur `/api/subscribe`
- [ ] S13/S14 — Validation robuste (email regex, max-length)

---

## 9. Prompts de correction

Copie-colle ces prompts un par un pour corriger chaque groupe de problèmes.

---

### Prompt 1 — Sécurité XSS (S1, S2)

```
Installe DOMPurify et son type @types/dompurify. Ensuite, dans :
- src/app/[locale]/blog/[slug]/page.tsx
- src/app/[locale]/projects/[slug]/page.tsx

Sanitise tout contenu passé à dangerouslySetInnerHTML avec DOMPurify.sanitize().
Crée un utilitaire réutilisable src/lib/sanitize.ts qui expose une fonction sanitizeHtml(dirty: string): string.
Utilise cet utilitaire partout où dangerouslySetInnerHTML est utilisé.
```

---

### Prompt 2 — Sécurité Timing-safe (S3, S4)

```
Dans src/lib/csrf.ts et src/app/api/donate/webhook/route.ts, remplace toutes les comparaisons
de tokens/hash par des comparaisons timing-safe utilisant crypto.timingSafeEqual().
Assure-toi de convertir les strings en Buffer avant la comparaison.
Gère aussi le cas où les longueurs diffèrent (retourne false directement).
```

---

### Prompt 3 — Sécuriser le endpoint donation verify (S5, S6)

```
Sécurise src/app/api/donate/verify/route.ts :
1. Ajoute une vérification que le tx_ref correspond bien à une donation pending en DB
2. Après vérification Flutterwave, compare verifyData.data.amount avec le montant original en DB
3. Si le montant ne correspond pas, marque la donation comme "failed" et retourne une erreur
4. Ajoute un rate limiting sur cet endpoint
5. Log les tentatives suspectes (montant mismatch, tx_ref inconnu)
```

---

### Prompt 4 — Gardes runtime variables d'env (S12)

```
Crée un fichier src/lib/env.ts qui :
1. Exporte toutes les variables d'environnement utilisées dans le projet
2. Valide leur présence au démarrage avec des messages d'erreur explicites
3. Utilise un schema de validation (simple objet avec required/optional)
4. Remplace les process.env.X! dans : src/lib/supabase/client.ts, server.ts, middleware.ts, flutterwave.ts

Variables à couvrir : NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY,
FLW_PUBLIC_KEY, FLW_SECRET_KEY, FLW_ENCRYPTION_KEY, FLW_WEBHOOK_SECRET, NEXT_PUBLIC_APP_URL,
MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER_PREFIX
```

---

### Prompt 5 — Remplacer next/link par i18n Link (BP1)

```
Dans tous les fichiers sous src/app/[locale]/, remplace :
- import Link from "next/link" → import { Link } from "@/i18n/navigation"

Fichiers concernés :
- src/app/[locale]/page.tsx
- src/app/[locale]/blog/page.tsx
- src/app/[locale]/blog/[slug]/page.tsx
- src/app/[locale]/projects/page.tsx
- src/app/[locale]/projects/[slug]/page.tsx
- src/app/[locale]/dons/page.tsx
- src/app/[locale]/dons/confirmation/page.tsx

Attention : les pages qui utilisent aussi Image de next/image doivent garder cet import.
Vérifie qu'il n'y a pas d'erreurs TypeScript après modification.
```

---

### Prompt 6 — Metadata dynamiques multilingues (SEO1, SEO3, SEO4)

```
Pour chaque page sous src/app/[locale]/ qui utilise export const metadata, convertis en
export async function generateMetadata() avec traductions :

Fichiers : page.tsx, dons/page.tsx, about/page.tsx, mission/page.tsx, impact/page.tsx,
legal/page.tsx, s-impliquer/page.tsx

Chaque generateMetadata doit :
1. Récupérer la locale via les params
2. Charger les traductions avec getTranslations
3. Retourner title, description, openGraph traduits
4. Inclure alternates.languages avec les 3 locales (fr, en, de)
5. Inclure une URL canonique basée sur NEXT_PUBLIC_APP_URL

Ajoute les clés de traduction nécessaires dans src/messages/fr.json, en.json, de.json
sous une section "metadata" pour chaque page.
```

---

### Prompt 7 — Sitemap multilingue (SEO2, SEO6, SEO7)

```
Refactorise src/app/sitemap.ts pour :
1. Générer des URLs pour chaque locale (fr, en, de) avec préfixes
2. Ajouter des alternates hreflang pour chaque URL
3. Retirer /search du sitemap (la page retourne 404)
4. Exclure les pages /admin

Aussi, dans src/app/[locale]/admin/layout.tsx, ajoute :
export const metadata = { robots: { index: false, follow: false } }
```

---

### Prompt 8 — Internationaliser les composants client (C2, BP7)

```
Internationalise les composants suivants en utilisant useTranslations() de next-intl :
- src/components/donation-form.tsx
- src/components/contact-form.tsx
- src/components/cookie-banner.tsx
- src/app/[locale]/error.tsx
- src/app/[locale]/not-found.tsx

Pour chaque composant :
1. Identifie toutes les chaînes françaises hardcodées
2. Crée les clés de traduction correspondantes
3. Ajoute les traductions dans fr.json, en.json et de.json
4. Remplace les chaînes par des appels t("key")

Namespace suggérés : "donation", "contact", "cookies", "error", "notFound"
```

---

### Prompt 9 — Performance Supabase (P1, P2)

```
Optimise les requêtes Supabase :

1. Dans src/app/[locale]/page.tsx : remplace getPublishedPosts/getPublishedProjects suivis
   de .slice(0,3) par de nouvelles fonctions avec .limit(3) dans content.ts

2. Dans src/lib/content.ts : wrappe toutes les fonctions de requête avec le cache() de React
   ou unstable_cache de Next.js avec un revalidate de 60 secondes.
   Ajoute des tags pour pouvoir revalider après création/modification d'un post ou projet.

3. Dans les server actions de src/app/[locale]/admin/actions.ts : ajoute revalidateTag()
   après chaque mutation (create/update/delete) pour invalider le cache.
```

---

### Prompt 10 — Pagination admin (P3)

```
Ajoute une pagination aux pages admin :
- src/app/[locale]/admin/contacts/page.tsx
- src/app/[locale]/admin/donations/page.tsx

Implémente :
1. Un paramètre searchParams ?page=1 avec 20 items par page
2. Les requêtes Supabase avec .range(from, to)
3. Un composant de pagination réutilisable src/components/admin/pagination.tsx
   avec boutons précédent/suivant et affichage "Page X sur Y"
4. Affiche le total d'enregistrements
```

---

### Prompt 11 — Debounce recherche + generateStaticParams (P7, BP6)

```
1. Dans src/components/header.tsx : ajoute un debounce de 300ms sur la recherche.
   Utilise un hook useDebounce personnalisé ou setTimeout/clearTimeout.

2. Ajoute generateStaticParams dans :
   - src/app/[locale]/blog/[slug]/page.tsx
   - src/app/[locale]/projects/[slug]/page.tsx

   Charge les slugs depuis Supabase et combine avec les locales de routing.locales.
```

---

### Prompt 12 — Découper la homepage (C1, C3)

```
Découpe src/app/[locale]/page.tsx (729 lignes) en composants de section :

Crée dans src/components/home/ :
- hero-section.tsx (hero avec FloatingParticles + CTA)
- stats-section.tsx (compteurs animés)
- mission-section.tsx (présentation mission)
- projects-section.tsx (3 derniers projets)
- blog-section.tsx (3 derniers articles)
- testimonials-section.tsx (témoignages)
- events-section.tsx (événements à venir — déplace les données hardcodées vers les messages i18n)
- partners-section.tsx (logos partenaires)
- cta-section.tsx (appel à l'action final)
- newsletter-section.tsx (wrapper Newsletter)

La page.tsx finale ne devrait faire que ~50 lignes : imports + composition des sections.
Chaque section reçoit ses données via props (posts, projets) ou les charge elle-même.
```

---

### Prompt 13 — Formulaires admin génériques (C6, C7, C8)

```
Réduis la duplication dans l'admin :

1. Crée src/components/admin/entity-form.tsx — un composant générique de formulaire
   avec onglets par locale, gestion loading/error/success, qui accepte :
   - fields: tableau de définitions de champs
   - onSubmit: server action
   - initialData (optionnel, pour edit)
   Puis refactorise PostForm et ProjectForm pour l'utiliser.

2. Crée src/components/admin/delete-button.tsx — un bouton de suppression générique
   qui accepte : deleteAction, itemId, confirmMessage
   Remplace les DeletePostButton/DeleteProjectButton/DeleteContactButton.

3. Dans contacts/page.tsx et donations/page.tsx, remplace la vérification auth inline
   par un appel à la fonction requireAdmin() de actions.ts.
```

---

### Prompt 14 — Utils partagés (C4, C5, C9, C10)

```
Factorise les utilitaires dupliqués :

1. Crée src/lib/utils.ts avec :
   - formatDate(dateStr: string, locale: string): string
   Puis supprime les copies dans page.tsx et blog/page.tsx.

2. Crée un composant src/components/newsletter-section.tsx qui encapsule Newsletter
   avec les messages traduits, pour remplacer la reconstruction dans 5+ fichiers.

3. Supprime la fonction createPaymentLink() morte dans src/lib/flutterwave.ts.

4. Refactorise src/components/footer.tsx pour éviter la duplication mobile/desktop :
   crée un composant FooterNavGroup qui est réutilisé dans les deux layouts.
```

---

### Prompt 15 — Accessibilité formulaires + skip nav (A1, A3, A6)

```
Améliore l'accessibilité :

1. Dans donation-form.tsx et contact-form.tsx : ajoute des <label> associés à chaque input
   via htmlFor/id. Si le design veut des labels invisibles, utilise la classe sr-only.

2. Dans src/components/header.tsx : ajoute un lien skip-to-content en tout premier élément
   <a href="#main-content" className="sr-only focus:not-sr-only ...">Aller au contenu</a>
   Note : le main a déjà id="main-content" dans le locale layout.

3. Dans admin/posts/delete-button.tsx (et équivalents) : ajoute aria-label="Supprimer"
   sur les boutons avec icône seule.

4. Dans les loading.tsx : ajoute role="status" et aria-label="Chargement en cours"
   sur le conteneur principal du squelette.
```

---

### Prompt 16 — prefers-reduced-motion + fallback WebGL (A4, E6)

```
1. Dans tous les composants Three.js (src/components/three/) :
   - Wrappe chaque <Canvas> dans un ErrorBoundary qui affiche un fallback statique
     (image ou div gradient) si WebGL n'est pas supporté
   - Crée src/components/three/webgl-error-boundary.tsx

2. Dans les composants Framer Motion (src/components/motion/reveal.tsx, stagger.tsx) :
   - Utilise useReducedMotion() de framer-motion
   - Si activé, désactive les animations (initial = animate, pas de transition)

3. Dans les scènes Three.js : pause useFrame quand document.hidden === true
   (écouter l'événement visibilitychange).
```

---

### Prompt 17 — Error handling robuste (E2, E3, E4, E5, E8)

```
Corrige la gestion d'erreurs :

1. Dans src/lib/content.ts : vérifie la propriété error de chaque réponse Supabase.
   Si error, log côté serveur et retourne null/[]. Ne pas throw.

2. Dans donation-form.tsx et contact-form.tsx :
   - Si le fetch CSRF échoue, affiche un toast d'erreur et désactive le submit
   - Ajoute un mécanisme de retry/refresh du token CSRF avant expiration

3. Dans src/app/[locale]/admin/actions.ts : remplace throw new Error(error.message)
   par des messages user-friendly. Retourne { success: false, error: "..." } au lieu de throw.

4. Dans blog/[slug]/page.tsx et projects/[slug]/page.tsx : entoure generateMetadata
   d'un try/catch qui retourne des métadonnées par défaut en cas d'erreur.
```

---

### Prompt 18 — Rate limiting & validation (S7, S8, S9, S10, S13, S14, P4)

```
Renforce la sécurité des endpoints :

1. Dans src/app/api/subscribe/route.ts : ajoute le rate limiting et la vérification CSRF
   comme c'est fait dans contact/route.ts.

2. Dans src/lib/rate-limit.ts :
   - Ajoute un cleanup périodique de la Map (supprime les entrées expirées)
   - Pour un déploiement Vercel, documente en commentaire la recommandation d'utiliser
     Redis (Upstash) pour le rate limiting en production

3. Dans src/app/api/contact/route.ts :
   - Remplace la validation email par une regex standard
   - Ajoute des limites de longueur : name (100), email (254), subject (200), message (5000)

4. Dans src/app/api/donate/route.ts :
   - Ajoute des limites de longueur : firstName (100), lastName (100), email (254)
   - Valide que amount est un nombre positif raisonnable (ex: max 1_000_000)
```

---

### Prompt 19 — Correction CSS et liens sociaux (BP5, C11)

```
1. Dans src/app/globals.css : implémente l'animation text-rotate utilisée dans
   src/app/[locale]/page.tsx. C'est un effet de rotation verticale qui alterne entre
   3 mots (communautés, soignants, bénévoles). Utilise @keyframes avec translateY.

2. Dans src/components/footer.tsx : remplace les href="#" des liens sociaux
   par des variables d'environnement ou des liens configurables.
   Utilise les variables NEXT_PUBLIC_ORG_SOCIALS déjà parsées dans layout.tsx.
   Si les liens ne sont pas configurés, masque les icônes au lieu d'afficher des liens morts.
```
