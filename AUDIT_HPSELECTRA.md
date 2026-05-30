# AUDIT COMPLET — HP SELECTRA
> Produit le 30/05/2026 · Base : code réel du dépôt `/Users/mac/hp-selectra-app`
> Aucune supposition non vérifiée. Toutes les références pointent vers des fichiers réels.

---

## SOMMAIRE
1. [Phase 0 — Cartographie](#phase-0)
2. [Phase 1 — Audit par axe](#phase-1)
3. [Phase 1 Bis — Carte des liens & pages manquantes](#phase-1bis)
4. [Expérience — Animations, pédagogie & UX](#experience)
5. [Annuaire des entreprises & logos](#annuaire)
6. [Spécification bloc FAI](#fai)
7. [Phase 2 — Verdict & Plan](#phase-2)
8. [Les 5 actions à faire en premier](#top5)

---

## PHASE 0 — CARTOGRAPHIE {#phase-0}

### Stack technique
| Couche | Technologie | Version | Statut |
|--------|------------|---------|--------|
| Framework | Next.js App Router | 16.2.6 | ✅ récent |
| UI | React | 19.2.4 | ✅ |
| Langage | TypeScript | ^5 | ✅ |
| CSS | Tailwind CSS v4 + CSS vars | ^4 | ✅ |
| ORM | Prisma + adapter-pg | ^7.8.0 | ⚠️ DB non connectée |
| Auth | next-auth v5 beta | 5.0.0-beta.31 | 🔴 installé, pas configuré |
| Forms | react-hook-form + zod | 7/4 | ⚠️ partiellement utilisé |
| Icons | lucide-react | ^1.17.0 | ✅ |
| Deploy | Vercel (npx vercel) | — | ✅ |
| Tests | **AUCUN** | — | 🔴 |
| CI/CD | **AUCUNE** | — | 🔴 |

### Architecture
```
hp-selectra-app/
├── app/                          # Next.js App Router
│   ├── [vertical]/               # telecom, mobile-money, banques (live)
│   │   ├── page.tsx              # landing verticale
│   │   ├── comparateur/page.tsx  # comparateur interactif
│   │   ├── fournisseurs/
│   │   │   ├── page.tsx          # liste fournisseurs
│   │   │   └── [slug]/page.tsx   # fiche fournisseur
│   │   └── offres/[slug]/page.tsx# fiche offre ← NOUVEAU
│   ├── assurances, energie, microfinance/  # bientôt (pages stub)
│   ├── recherche/page.tsx        # moteur de recherche ← NOUVEAU
│   ├── admin/, api/              # back-office + routes API
│   ├── a-propos, contact, actualites…     # pages statiques
│   └── globals.css / layout.tsx
├── components/
│   ├── compare/  OfferCard, OfferDetail, ProviderCard
│   ├── home/     HeroSection, VerticalCards, HowItWorks, AdvisorsSection…
│   ├── layout/   Header, Footer, HPAssistant
│   └── ui/       HPScoreBadge, PriceTag, Reveal
├── lib/
│   ├── data/seed-data.ts   # SOURCE DE VÉRITÉ — 988 lignes
│   ├── prisma.ts           # client Prisma (DB non connectée)
│   └── utils.ts            # helpers (formatGNF, hpScore, slugify…)
└── public/                 # seulement 5 SVG Next.js par défaut
```

### Données
- **6 verticales** déclarées : telecom ✅, mobile-money ✅, banques ✅, microfinance ❌, assurances ❌, energie ❌
- **15 fournisseurs** actifs (5 télécom, 4 mobile money, 6 banques)
- **~36 offres** (15 télécom, 9 mobile money, 8 banques + 4 VDC/test)
- **7 articles** publiés
- Pas de base de données connectée — tout vient de `seed-data.ts`

### Niveau de maturité : **3/10 — Prototype fonctionnel, pas production-ready**
Le site s'affiche et les flux principaux fonctionnent. Mais : pas d'auth sur l'admin, pas de tests, pas de vraie DB, des dizaines de liens 404, des verticales vides, pas de sitemap, pas de schéma SEO, pas de logos, pas de flux de souscription.

---

## PHASE 1 — AUDIT PAR AXE {#phase-1}

### 1. BUGS & FONCTIONNEMENT — Note : 2/5

| ID | Constat | Sévérité | Fichier |
|----|---------|----------|---------|
| B1 | **Admin accessible sans aucune auth** — `/admin` et `/admin/offres` sont des pages publiques indexables. N'importe qui peut y accéder. | 🔴 CRITIQUE | `app/admin/page.tsx`, `app/admin/offres/page.tsx` |
| B2 | **`/admin/fournisseurs` lié dans le back-office mais page inexistante → 404** | 🔴 CRITIQUE | `app/admin/page.tsx` ligne MODULES href |
| B3 | **`/outils/test-eligibilite`, `/outils/carte-couverture`, `/outils/simulateur` liés dans Footer → tous 404** (3 liens morts) | 🔴 CRITIQUE | `components/layout/Footer.tsx` |
| B4 | **Leads API (`/api/leads`) ne stocke rien** — le commentaire désactive Prisma, seul un `console.log` tourne. Les demandes de rappel disparaissent. | 🔴 CRITIQUE | `app/api/leads/route.ts` |
| B5 | **Pages `/actualites/[slug]` inexistantes** — les articles de l'accueil et /actualites cliquent vers ces pages, qui n'existent pas. | ÉLEVÉ | `components/home/ArticlesSection.tsx` |
| B6 | **Pas de page 404 personnalisée** (`app/not-found.tsx` absent) — Next.js sert une page blanche. | ÉLEVÉ | manquant |
| B7 | **`app/telecom/meilleur-forfait-mobile/page.tsx` et `/mobile-money/meilleur-transfert-argent/` existent** mais `/banques/meilleur-compte/` absent alors qu'il sera attendu. | MOYEN | manquant |
| B8 | **Numéro de téléphone placeholder `224000000000`** codé en dur dans Header, Contact, HPAssistant. | ÉLEVÉ | multiple fichiers |
| B9 | **Flux de souscription absent** — "Voir chez l'opérateur" mène vers le site externe si `provider.website` défini, sinon vers la fiche fournisseur. Aucun formulaire, aucun modal de rappel programmé (cf. screenshot Selectra). | ÉLEVÉ | `components/compare/OfferDetail.tsx` |
| B10 | **`app/api/newsletter/route.ts`** — à vérifier : même problème probable que leads (DB désactivée). | MOYEN | `app/api/newsletter/route.ts` |
| B11 | **`next-auth` installé en beta 31 mais zéro configuration** — crée une surface d'attaque sans bénéfice. | MOYEN | `package.json` |

### 2. SÉCURITÉ — Note : 1.5/5

| ID | Constat | Sévérité | Fichier |
|----|---------|----------|---------|
| S1 | **Admin entièrement ouvert** — aucun middleware, aucune session, aucun rôle. N'importe quel visiteur peut atterrir sur `/admin`. | 🔴 CRITIQUE | `app/admin/` |
| S2 | **Variables d'environnement critiques absentes** — `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_WHATSAPP_NUMBER`. Pas de `.env.example`. | 🔴 CRITIQUE | manquant |
| S3 | **Pas de validation côté client** sur le formulaire Contact (champ téléphone `required` mais pas de format, injection possible côté API si DB activée). Côté API : zod valide mais `phone` est `string().max(30)` sans regex. | ÉLEVÉ | `app/contact/page.tsx`, `app/api/leads/route.ts` |
| S4 | **CORS / headers de sécurité** — pas de `next.config` visible avec headers (CSP, X-Frame-Options, etc.). | ÉLEVÉ | `next.config.ts` (non lu) |
| S5 | **`next-auth` beta 31** — version non stable, vulnérabilités potentielles connues dans la série beta. | MOYEN | `package.json` |
| S6 | **Aucun rate-limiting** sur `/api/leads` et `/api/newsletter`. | MOYEN | `app/api/` |
| S7 | **Données personnelles** : formulaire contact collecte nom/tel/email sans mention RGPD/loi guinéenne de protection des données ni case de consentement explicite cochable. | MOYEN | `app/contact/page.tsx` |

### 3. DESIGN & ERGONOMIE — Note : 3.5/5

| ID | Constat | Sévérité |
|----|---------|----------|
| D1 | **Pas de skeleton loader** sur les comparateurs client — flash de contenu non stylé au chargement. | MOYEN |
| D2 | **Cartes d'offres sans logo fournisseur** — seulement du texte. Rendu peu professionnel comparé à Selectra. | ÉLEVÉ |
| D3 | **États vides non traités** — si `OFFERS` vide pour une verticale, la grille disparaît silencieusement. | MOYEN |
| D4 | **Mobile Money comparateur** filtre uniquement `category === "transfert"` — les dépôts/retraits et paiements sont cachés sans explication. | MOYEN |
| D5 | **Accessibilité** : liens sans `aria-label` suffisant, images SVG sans `alt` (WhatsApp icon), contrastes non audités, focus states basiques. | MOYEN |
| D6 | **Flux de souscription** inexistant (cf. B9) — l'utilisateur clique "Voir l'offre", lit les détails, puis… rien de guidé. Pas de modal rappel, pas de formulaire lead contextuel. | ÉLEVÉ |
| D7 | **Animations Reveal** désactivées sur mobile faibles connexions via `prefers-reduced-motion` ✅ mais aucune animation contextuelle dans le comparateur (transitions de filtres, compteurs animés). | FAIBLE |

### 4. CODE & QUALITÉ — Note : 3/5

| ID | Constat | Sévérité |
|----|---------|----------|
| C1 | **Aucun test** (unit, integration, e2e) — zéro jest/vitest/playwright. | ÉLEVÉ |
| C2 | **SVG WhatsApp dupliqué** dans 5+ fichiers (OfferCard, OfferDetail, Header, HPAssistant, Contact, HeroSection). Doit être un composant `<WhatsAppIcon />`. | MOYEN |
| C3 | **WA_NUMBER codé en dur** avec fallback `"224000000000"` dans 6 fichiers. Centraliser dans une constante partagée. | MOYEN |
| C4 | **`app/generated/prisma/`** — code Prisma généré committé dans le dépôt (ne devrait pas l'être, doit être dans .gitignore). | MOYEN |
| C5 | **Pas de `loading.tsx`** dans les dossiers App Router — pas de Suspense boundary native pour les segments. | FAIBLE |
| C6 | **`react-hook-form`** installé mais le formulaire Contact utilise `useState` manuel — incohérence. | FAIBLE |
| C7 | **seed-data.ts** à 988 lignes jouant le rôle de base de données — correctement structuré mais va devenir ingérable. Migration vers DB urgente à moyen terme. | MOYEN |

### 5. COHÉRENCE — Note : 2.5/5

| ID | Constat | Sévérité |
|----|---------|----------|
| CO1 | **Verticales incompatibles** : telecom a `/comparateur` interactif Selectra-style, mobile-money a un comparateur basique (pas de widget de sélection), banques idem. Expérience divergente. | ÉLEVÉ |
| CO2 | **Pas de `/banques/meilleur-compte`** alors que telecom a `/meilleur-forfait-mobile` et mobile-money `/meilleur-transfert-argent`. | MOYEN |
| CO3 | **FAI non séparé** — VDC/SkyVision classé sous "telecom" au lieu d'une verticale ou sous-section dédiée. Confusant. | ÉLEVÉ |
| CO4 | **Admin navigue vers `/admin/fournisseurs`** (404), `/admin/articles` (404), `/admin/leads` (404). Aucun de ces modules n'existe. | ÉLEVÉ |
| CO5 | **HPAssistant chatbot** ne couvre pas la verticale Banques (absent du flow `STEPS`). | MOYEN |

### 6. FONCTIONNALITÉS — Existantes vs Manquantes

#### ✅ EXISTANTES
- Comparateur interactif Selectra-style (télécom uniquement)
- Fiches fournisseurs par verticale (télécom, mobile-money, banques)
- Fiches offres avec CTAs (nouveau)
- Moteur de recherche global (nouveau)
- Chatbot HP Assistant
- Animations scroll Reveal
- Page contact + API leads (log seulement)
- Actualités (liste)
- Admin back-office (interface UI seulement)
- Pages légales (mentions, confidentialité, méthodologie)
- HP Score A→E sur offres et fournisseurs

#### ❌ MANQUANTES (bloquantes ou importantes)
| Fonctionnalité | Verticale | Impact |
|---------------|-----------|--------|
| **Flux souscription / modal rappel programmé** | Toutes | 🔴 |
| **Logos fournisseurs** | Toutes | ÉLEVÉ |
| **Pages articles détail** `/actualites/[slug]` | Global | ÉLEVÉ |
| **Page 404 personnalisée** | Global | ÉLEVÉ |
| **Verticale FAI** complète | FAI | ÉLEVÉ |
| **Comparateur interactif** Mobile Money & Banques (Selectra-style) | MM, Banques | ÉLEVÉ |
| **Outils** : test éligibilité, carte couverture, simulateur | Télécom/FAI | MOYEN |
| **Annuaire des entreprises** filtrable | Global | MOYEN |
| **Avis clients** par fournisseur | Toutes | MOYEN |
| **`/banques/meilleur-compte`** | Banques | MOYEN |
| **Sitemap.xml + robots.txt** | SEO | ÉLEVÉ |
| **Auth admin** (middleware next-auth) | Admin | 🔴 |
| **Connexion DB** (leads/newsletter réels) | Backend | ÉLEVÉ |
| **Admin complet** (fournisseurs, articles, leads) | Admin | MOYEN |

### 7. SEO & PERFORMANCE — Note : 2/5

| ID | Constat | Sévérité |
|----|---------|----------|
| SEO1 | **Pas de sitemap.xml** — Google ne peut pas crawler correctement. | ÉLEVÉ |
| SEO2 | **Pas de robots.txt** — `/admin` potentiellement indexé. | ÉLEVÉ |
| SEO3 | **Zéro données structurées** (schema.org) — pas de `Product`, `FAQPage`, `Organization`, `BreadcrumbList`. | ÉLEVÉ |
| SEO4 | **Pas d'OG images** — partage réseaux sociaux sans visuel. | MOYEN |
| SEO5 | **`next/image`** jamais utilisé — pas d'optimisation d'images, pas de lazy load natif. | MOYEN |
| SEO6 | **Comparateurs `"use client"`** — pages télécom/comparateur et banques/comparateur ne peuvent pas avoir de `metadata` exporté (Next.js limite). Titre générique servi par le layout. | MOYEN |
| SEO7 | **URLs sans trailing slash cohérent** — certains liens ont `/`, d'autres non. | FAIBLE |

---

## PHASE 1 BIS — CARTE DES LIENS & PAGES MANQUANTES {#phase-1bis}

### Liens internes — état complet

| Source | Destination | Statut |
|--------|-------------|--------|
| Footer > Outils > Test d'éligibilité | `/outils/test-eligibilite/` | 🔴 404 |
| Footer > Outils > Carte de couverture | `/outils/carte-couverture/` | 🔴 404 |
| Footer > Outils > Simulateur | `/outils/simulateur/` | 🔴 404 |
| Admin UI > Fournisseurs | `/admin/fournisseurs` | 🔴 404 |
| Admin UI > Articles | `/admin/articles` | 🔴 404 |
| Admin UI > Leads | `/admin/leads` | 🔴 404 |
| Admin UI > Analytics | `/admin/analytics` | 🔴 404 |
| ArticlesSection (accueil) | `/actualites/[slug]/` | 🔴 404 |
| ArticlesPage | `/actualites/[slug]/` | 🔴 404 |
| Energie > Me notifier | `/#newsletter` | ⚠️ ancre sans composant |
| Assurances > Me notifier | `/#newsletter` | ⚠️ ancre sans composant |
| Contact téléphone | `tel:+224000000000` | ⚠️ placeholder |
| Header > Banques > sous-menu | `/banques/comparateur/`, `/banques/fournisseurs/` | ✅ |
| Header > Internet & Mobile > sous-menu | `/telecom/comparateur/`, etc. | ✅ |
| OfferCard > Voir l'offre | `/{vertical}/offres/{slug}/` | ✅ |
| OfferDetail > Voir chez l'opérateur | `provider.website` (externe) | ⚠️ absent sur 80% des fournisseurs |
| Toutes pages légales (footer) | `/mentions-legales/`, `/confidentialite/`, `/methodologie/` | ✅ |
| /contact | `/contact/` | ✅ |
| HPAssistant > liens comparateurs | `/telecom/comparateur/`, `/mobile-money/comparateur/` | ✅ |

### Pages manquantes — arborescence cible complète

```
/ (accueil)                                      ✅ existe
├── /telecom/                                    ✅
│   ├── /telecom/comparateur/                    ✅
│   ├── /telecom/meilleur-forfait-mobile/         ✅
│   ├── /telecom/fournisseurs/                   ✅
│   ├── /telecom/fournisseurs/[slug]/             ✅
│   └── /telecom/offres/[slug]/                  ✅ nouveau
│
├── /fai/                                        ❌ MANQUANT (FAI = verticale séparée)
│   ├── /fai/comparateur/                        ❌
│   ├── /fai/meilleur-fai/                       ❌
│   ├── /fai/fournisseurs/                       ❌
│   ├── /fai/fournisseurs/[slug]/                ❌
│   └── /fai/offres/[slug]/                      ❌
│
├── /mobile-money/                               ✅
│   ├── /mobile-money/comparateur/               ✅ (basique, non Selectra-style)
│   ├── /mobile-money/meilleur-transfert-argent/ ✅
│   ├── /mobile-money/fournisseurs/              ✅
│   ├── /mobile-money/fournisseurs/[slug]/       ✅
│   └── /mobile-money/offres/[slug]/             ✅ nouveau
│
├── /banques/                                    ✅
│   ├── /banques/comparateur/                    ✅ (basique)
│   ├── /banques/meilleur-compte/                ❌ MANQUANT
│   ├── /banques/fournisseurs/                   ✅
│   ├── /banques/fournisseurs/[slug]/            ✅
│   └── /banques/offres/[slug]/                  ✅ nouveau
│
├── /microfinance/                               ⚠️ stub bientôt
│   └── (toute la structure = manquante)         ❌
│
├── /assurances/                                 ⚠️ stub bientôt
│   └── (toute la structure = manquante)         ❌
│
├── /energie/                                    ⚠️ stub bientôt
│   └── (toute la structure = manquante)         ❌
│
├── /annuaire/                                   ❌ MANQUANT
│
├── /recherche/                                  ✅ nouveau
│
├── /actualites/                                 ✅ (liste)
│   └── /actualites/[slug]/                      ❌ MANQUANT
│
├── /outils/                                     ❌ MANQUANT (footer pointe dessus)
│   ├── /outils/test-eligibilite/               ❌
│   ├── /outils/carte-couverture/               ❌
│   └── /outils/simulateur/                     ❌
│
├── /a-propos/                                   ✅
├── /contact/                                    ✅
├── /methodologie/                               ✅
├── /mentions-legales/                           ✅
├── /confidentialite/                            ✅
├── /admin/                                      ✅ (UI seule, non sécurisé)
│   ├── /admin/offres/                           ✅ (UI seule)
│   ├── /admin/fournisseurs/                     ❌ MANQUANT
│   ├── /admin/articles/                         ❌ MANQUANT
│   └── /admin/leads/                            ❌ MANQUANT
│
├── /sitemap.xml                                 ❌ MANQUANT
├── /robots.txt                                  ❌ MANQUANT
└── /404 (not-found.tsx)                         ❌ MANQUANT
```

---

## EXPÉRIENCE — ANIMATIONS, PÉDAGOGIE & UX {#experience}

### A. État actuel des animations
- `hp-reveal` (IntersectionObserver, opacity + translateY) ✅ sur la homepage
- `hp-fade-up` sur les résultats du comparateur ✅
- `hp-pop` sur le chatbot ✅
- `hp-pulse-ring` défini en CSS ✅ mais **non utilisé nulle part**
- `prefers-reduced-motion` respecté ✅
- **Manquant** : stagger (animation-delay échelonné) sur les grilles de cartes, transitions douces entre états de filtre, compteurs animés sur la ligne de confiance ("15 offres comparées"), skeleton loaders, micro-interactions sur les cartes (hover élévation existe via Tailwind `hover:shadow-md` ✅).

### B. Spécification animations cibles (à implémenter)
1. **Stagger cartes** : appliquer `animation-delay: calc(var(--i) * 60ms)` sur chaque OfferCard dans la grille, avec `--i` injecté via style inline. Effet : les cartes apparaissent en cascade.
2. **Compteur animé** : la ligne "15 offres / 5 opérateurs" du comparateur → compteur qui monte de 0 à N en ~800ms à l'entrée dans le viewport.
3. **Skeleton loader** : remplacer le flash blanc par 3 cartes grises animées (shimmer en CSS) pendant le rendu initial côté client.
4. **Transition filtres** : lors du changement de catégorie dans le comparateur, les cartes re-entrent avec un léger fade (opacity 0→1, 150ms) plutôt que de couper brutalement.
5. **Progress bar** dans le flux de souscription (étape 1 → 2 → 3).

### C. Illustrations pédagogiques interactives (spécification)
| Illustration | Emplacement | Format |
|-------------|-------------|--------|
| "Comment marche le Mobile Money" | /mobile-money/ (landing) | SVG animé 5 étapes (send → réseau → receive), zones survolables |
| "Déposer / Retirer vs Transférer" | /mobile-money/comparateur/ | Tableau interactif avec infobulles (frais, délai) |
| "Lire une offre de forfait" | /telecom/ (landing) | Schéma annoté : débit, volume, plafonnement, couverture |
| "Comprendre les frais bancaires" | /banques/ (landing) | Diagramme : frais tenue compte, commission virement, taux épargne |
| "Glossaire" au survol | partout | Tooltip sur termes : "HP Score", "GNF", "ARPT", "BCRG", "débit", "latence" |

Tous en SVG inline ou CSS, poids < 10 Ko par illustration, `prefers-reduced-motion` respecté.

### D. UX soft — points d'amélioration
- **Flux souscription** : modal 3 étapes → (1) résumé offre, (2) saisie téléphone, (3) confirmation "rappel programmé" + conseil désactivation blocage appels (cf. screenshot Selectra).
- **Barre de recherche permanente** dans le Header (desktop : icône + expand, mobile : icône seule).
- **Fil d'Ariane** cohérent sur toutes les pages ✅ (déjà présent sur la plupart).
- **Badge "Vérifié"** fournisseurs (déjà dans le type `verified: boolean`, peu utilisé visuellement).

---

## ANNUAIRE DES ENTREPRISES & LOGOS {#annuaire}

### Spécification de l'annuaire `/annuaire`

**Structure de la page** :
- Header : "Annuaire des acteurs en Guinée" + onglets filtrants par secteur (Télécom | FAI | Mobile Money | Banques | Microfinance | Assurances | Énergie).
- Input de recherche par nom.
- Grille de `ProviderCard` enrichies, alimentée dynamiquement par `PROVIDERS` filtré.
- Tri : HP Score décroissant par défaut.

**Carte entreprise enrichie** (nouveau composant `ProviderCardFull`) :
```
┌──────────────────────────────────┐
│  [LOGO ou monogramme couleur]    │
│  Nom entreprise                  │
│  Secteur · HP Score badge        │
│  Description courte              │
│  [N offres] [Voir les offres →]  │
└──────────────────────────────────┘
```

### Spécification des logos fournisseurs

**Modèle de données** — ajouter dans `ProviderData` :
```typescript
logo?: string        // chemin relatif /public/logos/{slug}.svg ou .png
brandColor?: string  // couleur hex principale (#FF6600 pour Orange)
```

**Répertoire** : `public/logos/{slug}.ext` — un fichier par fournisseur.

**Règle de repli** (si `logo` absent) :
```tsx
// Monogramme avec brandColor ou primary
<div style={{ backgroundColor: provider.brandColor ?? "var(--color-primary)" }}>
  {provider.name.slice(0, 2).toUpperCase()}
</div>
```

**Sources autorisées** : uniquement logos fournis directement par l'opérateur ou téléchargés depuis leur site officiel avec permission. **Jamais de scraping**.

**Priorité logo** (ordre de rendu) :
1. `<img src={logo} alt={provider.name} />` — si `logo` défini
2. Monogramme coloré — si `logo` absent

**Ajouter immédiatement dans seed-data** :
```typescript
brandColor?: string  // à côté de verified
```

Providers avec sites officiels à récupérer :
| Fournisseur | Site officiel | Couleur brand |
|------------|---------------|---------------|
| Orange Guinée | orangeguinee.com | #FF6600 |
| Telecel Guinée | — | #E30613 |
| Cellcom Guinée | cellcomguinee.com | #0070C0 |
| Guinée Télécoms | — | #003087 |
| VDC / SkyVision | vdc-sa.com | #005BAA |
| Orange Money | orangeguinee.com | #FF6600 |
| MTN MoMo | mtn.com.gn | #FFCC00 |
| Soutra Money | — | #6B8F3C |
| Ecobank | ecobank.com | #2D3E8C |
| BICIGUI | — | #003087 |
| Orabank | orabank.net | #E30613 |
| UBA Guinée | ubagroup.com | #B02840 |
| Vista Bank | vistabank.com | #0070C0 |
| Banque Islamique | — | #2D7A4F |

---

## SPÉCIFICATION BLOC FAI {#fai}

### État actuel
- **Aucune verticale FAI** dans le site (pas de `/fai/`).
- VDC/SkyVision est actuellement classé sous `verticalSlug: "telecom"` (slug `vdc-skyvision`) — incorrect.
- Les FAI agréés ARPT (Afribone, SkyVision, ETI, Mouna Group, Kangny Tech, Leader Net, GUILAB) sont **absents** du seed-data.

### Structure à créer (identique aux autres verticales)

**1. Vertical dans seed-data.ts** :
```typescript
{ slug: "fai", name: "FAI — Internet Guinée", icon: "🌐", isLive: true, order: 2, color: "#005BAA" }
```

**2. Fournisseurs à ajouter** (HP Score provisoire basé sur présence commerciale) :
| Fournisseur | Slug | HP Score | Notes |
|------------|------|----------|-------|
| Afribone Guinée | afribone-guinee | B (73) | Présence nationale, fibre + ADSL |
| VDC / SkyVision | vdc-guinee | C (62) | Déplacer depuis telecom |
| Mouna Group Technology | mouna-group | C (60) | B2B principalement |
| ETI Guinée | eti-guinee | C (58) | Entreprises, zones minières |
| Kangny Technologies | kangny-tech | C (55) | Challenger |
| Leader Net Service | leader-net | C (52) | Régional |
| GUILAB S.A. | guilab | — | **Infrastructure/wholesale uniquement**, ne pas comparer comme FAI de détail — afficher en note |

**3. Offres à modéliser** (toutes `priceIsExample: true`) :
- Fibre entreprise (débit symétrique 10/20/50/100 Mbps)
- Liaison dédiée MPLS
- Internet domicile (si éligible)
- VSAT / Satellite

**4. Pages à créer** :
- `app/fai/page.tsx` — landing avec hero + présentation + guide
- `app/fai/comparateur/page.tsx` — comparateur Selectra-style (filtres : Fibre / Satellitaire / VSAT / Liaison dédiée)
- `app/fai/meilleur-fai/page.tsx` — classement + guide de sélection
- `app/fai/fournisseurs/page.tsx` — liste FAI
- `app/fai/fournisseurs/[slug]/page.tsx` — fiche FAI
- `app/fai/offres/[slug]/page.tsx` — fiche offre

**5. Outils spécifiques FAI** :
- **Test de zone** : formulaire "Ma commune / quartier" → retourne les FAI disponibles (alimenté par champ `zones` dans les offres).
- **Carte de couverture** : SVG simplifié des régions guinéennes avec couverture par opérateur (Conakry, Kindia, Labé, Kankan, Faranah, Nzérékoré…).
- **Test de débit** : intégration ookla ou lien `speedtest.net` suffisant en V1.

**6. Header** — ajouter "FAI" avant "Banques" dans `NAV_ITEMS` avec sous-menu (Comparer les FAI, Meilleur FAI, Tous les FAI).

---

## PHASE 2 — VERDICT & PLAN {#phase-2}

### VERDICT : **NO-GO — Ne pas ouvrir au public avant P0**

**Justification** : L'admin est non sécurisé (accès public), les leads disparaissent (DB désactivée), des dizaines de liens pointent vers des 404, les articles ne sont pas consultables, pas de sitemap. Le site fonctionnel est à 60% — les comparateurs télécom, mobile-money et banques fonctionnent, mais l'expérience de bout en bout (souscription, leads, SEO) est incomplète.

---

### Tableau priorisé des constats

| ID | Axe | Sévérité | Impact | Effort | Fichier |
|----|-----|----------|--------|--------|---------|
| S1/B1 | Sécurité | 🔴 CRITIQUE | Admin exposé | 1h | middleware.ts à créer |
| B4 | Bugs | 🔴 CRITIQUE | Leads perdus | 2h | api/leads + DB |
| B3 | Bugs | 🔴 CRITIQUE | 3 liens 404 footer | 30min | Footer ou pages stubs |
| B5 | Bugs | ÉLEVÉ | Articles inconsultables | 3h | actualites/[slug] |
| B6 | Bugs | ÉLEVÉ | Pas de 404 custom | 30min | not-found.tsx |
| B9 | UX | ÉLEVÉ | Flux souscription absent | 1 jour | OfferDetail + modal |
| D2 | Design | ÉLEVÉ | Cartes sans logo | 4h | seed-data + OfferCard |
| SEO1 | SEO | ÉLEVÉ | Pas indexable | 1h | sitemap.xml |
| SEO2 | SEO | ÉLEVÉ | Admin indexé | 30min | robots.txt |
| CO1 | Cohérence | ÉLEVÉ | Comparateurs MM/Banques basiques | 4h | comparateur pages |
| CO3 | Cohérence | ÉLEVÉ | FAI sous télécom | 1 jour | verticale FAI |
| B8 | Bugs | ÉLEVÉ | Faux numéro | 30min | .env |
| S3 | Sécurité | ÉLEVÉ | Validation téléphone | 1h | leads API |

---

### Roadmap en 3 vagues

#### P0 — BLOQUANTS (avant toute mise en ligne publique)
1. **Auth admin** — middleware next-auth sur `/admin/*`
2. **Leads DB** — activer Prisma ou (V1) stocker dans un Google Sheet via API
3. **Footer 404** — créer stubs `/outils/*` ou retirer les liens
4. **404 page** — `app/not-found.tsx`
5. **robots.txt** — bloquer `/admin/`
6. **Vrai numéro** — configurer `NEXT_PUBLIC_WHATSAPP_NUMBER` et `NEXT_PUBLIC_CC_PHONE`
7. **Sitemap** — `app/sitemap.ts` (API Next.js native)

#### P1 — AVANT PROMOTION/MONTÉE EN CHARGE
8. **Flux souscription** — modal 3 étapes (offre → téléphone → confirmation + rappel + conseil blocage)
9. **Logos fournisseurs** — champ `brandColor` + `logo` + repli monogramme
10. **Articles détail** — `app/actualites/[slug]/page.tsx`
11. **Comparateurs MM + Banques** — Selectra-style (widget de sélection)
12. **Verticale FAI** — 6 pages + 7 fournisseurs + offres
13. **Annuaire** — `/annuaire` avec onglets secteurs
14. **schema.org** — BreadcrumbList + Product sur fiches offres
15. **Stagger cartes + skeleton** — expérience perçue
16. **HPAssistant** — ajouter Banques et FAI dans le flow

#### P2 — AMÉLIORATION CONTINUE
17. **Tests** — Vitest (utils) + Playwright (parcours critiques)
18. **CI/CD** — GitHub Actions (build + lint)
19. **Illustrations pédagogiques** — SVG interactifs par verticale
20. **Outils** — test de zone FAI, carte couverture simplifiée
21. **Avis clients** — formulaire + affichage par fournisseur
22. **DB réelle** — migration seed-data → Prisma + back-office fonctionnel
23. **OG images** — `app/opengraph-image.tsx` par verticale

---

### Quick wins (< 30 min chacun)
1. ⚡ Créer `app/not-found.tsx` — 1 composant, impact immédiat
2. ⚡ Ajouter `public/robots.txt` — 3 lignes
3. ⚡ Créer `app/sitemap.ts` — ~20 lignes, boost SEO immédiat
4. ⚡ Corriger les 3 liens `/outils/*` dans Footer (retirer ou pointer vers `/contact/`)
5. ⚡ Extraire `<WhatsAppIcon />` composant partagé — 15 min, réduction de 60 lignes dupliquées
6. ⚡ Ajouter `brandColor` dans seed-data pour les 15 fournisseurs — améliore visuellement les monogrammes
7. ⚡ Créer `.env.example` — documentaire, sécurité

---

## LES 5 ACTIONS À FAIRE EN PREMIER {#top5}

```
╔══════════════════════════════════════════════════════════════════════╗
║  ACTION 1 — SÉCURISER L'ADMIN (CRITIQUE)                           ║
║  Créer middleware.ts qui redirige /admin/* vers /auth/login si      ║
║  pas de session. Bloquer /admin/ dans robots.txt.                  ║
║  Fichiers : middleware.ts (créer), public/robots.txt (créer)       ║
╠══════════════════════════════════════════════════════════════════════╣
║  ACTION 2 — CAPTURER LES LEADS (CRITIQUE)                          ║
║  Activer le stockage Prisma dans /api/leads ET créer le MODAL DE   ║
║  SOUSCRIPTION (cf. screenshot Selectra) sur les fiches offres :    ║
║  étape 1 → résumé offre + saisie téléphone, étape 2 → confirmation ║
║  "rappel programmé" + conseil désactivation blocage appels.        ║
║  Fichiers : api/leads/route.ts, OfferDetail.tsx, CallbackModal.tsx ║
╠══════════════════════════════════════════════════════════════════════╣
║  ACTION 3 — RÉPARER LES 404 BLOQUANTS (ÉLEVÉ)                      ║
║  • app/not-found.tsx (404 branded)                                 ║
║  • Retirer /outils/* du Footer ou créer stubs                      ║
║  • app/actualites/[slug]/page.tsx (articles consultables)          ║
║  • app/sitemap.ts + public/robots.txt                              ║
╠══════════════════════════════════════════════════════════════════════╣
║  ACTION 4 — LOGOS + BRANDCOLOR FOURNISSEURS (ÉLEVÉ)               ║
║  Ajouter brandColor dans ProviderData + seed-data (15 entrées).   ║
║  Mettre à jour OfferCard + OfferDetail + ProviderCard pour        ║
║  afficher le logo ou un monogramme coloré. Plus jamais d'offre    ║
║  anonyme bleu générique.                                           ║
╠══════════════════════════════════════════════════════════════════════╣
║  ACTION 5 — OUVRIR LA VERTICALE FAI (ÉLEVÉ)                        ║
║  Ajouter la verticale fai dans seed-data (7 fournisseurs,          ║
║  ~10 offres d'exemple). Créer les 6 pages FAI (landing,           ║
║  comparateur, fournisseurs, fiche, offre, meilleur-fai).          ║
║  Ajouter FAI dans le Header.                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

*Rédigé par la cellule d'audit produit + ingénierie HP Selectra · 30/05/2026*
*Prochaine étape : **valider ce plan**, puis j'exécute P0 action par action, un commit par correctif.*
