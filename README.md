# HP Selectra — Comparateur multi-secteurs Guinée

Plateforme de comparaison de services pour la Guinée (télécom, mobile money, banques, assurances, énergie).
Éditée par **Help'me Process** — Call Center in Guinea.

---

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env.local
# Remplir DATABASE_URL, NEXTAUTH_SECRET, etc.

# 3. Générer le client Prisma + appliquer le schéma
npx prisma generate
npx prisma db push        # ou prisma migrate dev en développement

# 4. (Optionnel) Insérer les données de seed
npx prisma db seed

# 5. Lancer le serveur de développement
npm run dev               # → http://localhost:3000
```

---

## Stack

| Couche | Outil |
|--------|-------|
| Front | Next.js 14 (App Router) + TypeScript |
| Style | Tailwind CSS v3 + CSS variables (charte HP / Help'me Process) |
| ORM | Prisma v7 + adaptateur `@prisma/adapter-pg` |
| Base de données | PostgreSQL (Supabase ou Neon recommandé) |
| Auth admin | NextAuth.js (credentials) |
| Formulaires | React Hook Form + Zod |
| Icons | Lucide React |
| Déploiement | Vercel (front + API Routes) |

---

## Variables d'environnement

Copier `.env.example` → `.env.local` :

```bash
# PostgreSQL (obligatoire)
DATABASE_URL=postgresql://user:password@host:5432/hp_selectra

# NextAuth (obligatoire pour le back-office)
NEXTAUTH_SECRET=une-chaine-aleatoire-longue
NEXTAUTH_URL=http://localhost:3000

# WhatsApp Business (placeholder — à remplacer)
NEXT_PUBLIC_WHATSAPP_NUMBER=224XXXXXXXXX

# Email transactionnel (Resend)
RESEND_API_KEY=

# Analytics privacy-first (optionnel)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

---

## Structure du projet

```
app/
├── page.tsx                          # Accueil
├── telecom/                          # Verticale Télécom (live)
│   ├── page.tsx
│   ├── comparateur/page.tsx
│   ├── meilleur-forfait-mobile/page.tsx
│   └── fournisseurs/[slug]/page.tsx
├── mobile-money/                     # Verticale Mobile Money (live)
│   ├── page.tsx
│   ├── comparateur/page.tsx
│   ├── meilleur-transfert-argent/page.tsx
│   └── fournisseurs/[slug]/page.tsx
├── banques/page.tsx                  # Bientôt
├── microfinance/page.tsx             # Bientôt
├── assurances/page.tsx               # Bientôt
├── energie/page.tsx                  # Bientôt
├── admin/                            # Back-office
│   ├── page.tsx                      # Dashboard
│   └── offres/page.tsx               # Gestion tarifs
├── actualites/page.tsx
├── contact/page.tsx
├── a-propos/page.tsx
├── methodologie/page.tsx
├── mentions-legales/page.tsx
└── confidentialite/page.tsx

components/
├── layout/       # Header, Footer, WhatsApp CTA flottant
├── compare/      # OfferCard, ProviderCard, CompareTable, HPScoreBadge
├── home/         # HeroSection, VerticalCards, HowItWorks, LeadCTA
└── ui/           # Button, Badge, PriceTag

lib/
├── data/seed-data.ts   # Données statiques (seed opérateurs + offres)
├── prisma.ts           # Client Prisma singleton
└── utils.ts            # Helpers (formatGNF, getScoreColor…)

prisma/
└── schema.prisma       # Schéma complet (Vertical, Provider, Offer, Lead, Review…)
```

---

## Pages disponibles

| Route | Description | Statut |
|-------|-------------|--------|
| `/` | Accueil | ✅ Live |
| `/telecom/` | Verticale Télécom | ✅ Live |
| `/telecom/comparateur/` | Comparateur forfaits | ✅ Live |
| `/telecom/meilleur-forfait-mobile/` | Classement forfaits | ✅ Live |
| `/telecom/fournisseurs/[slug]/` | Fiches opérateurs | ✅ Live |
| `/mobile-money/` | Verticale Mobile Money | ✅ Live |
| `/mobile-money/comparateur/` | Comparateur frais | ✅ Live |
| `/mobile-money/meilleur-transfert-argent/` | Classement transferts | ✅ Live |
| `/mobile-money/fournisseurs/soutra-money/` | Fiche Soutra Money (données réelles) | ✅ Live |
| `/banques/` | Banques — aperçu | 🔒 Bientôt |
| `/microfinance/` | Microfinance — aperçu | 🔒 Bientôt |
| `/assurances/` | Assurances — aperçu | 🔒 Bientôt |
| `/energie/` | Énergie & Solaire — aperçu | 🔒 Bientôt |
| `/admin/` | Dashboard back-office | ✅ Live |
| `/admin/offres/` | Gestion des tarifs | ✅ Live |

---

## HP Score

Chaque offre reçoit une note de **A** (excellent) à **E** (déconseillé).

- **Télécom** : data incluse (40%) + appels (20%) + prix (25%) + couverture (10%) + avis (5%)
- **Mobile Money** : frais transfert (35%) + frais retrait (25%) + couverture agents (20%) + services (15%) + avis (5%)

Les pondérations sont configurables dans le back-office (`/admin/parametres`).

---

## Données seed

Les données fournisseurs sont dans `lib/data/seed-data.ts`.

| Fournisseur | Données | Statut |
|-------------|---------|--------|
| Soutra Money | Dépôt GRATUIT · Retrait GRATUIT · Transfert ≤ 1 % | ✅ Réelles vérifiées |
| Tous les autres | Tarifs indicatifs | ⚠️ À remplacer |

---

## Checklist mise en production

- [ ] Remplacer tous les tarifs `priceIsExample: true` par les vrais tarifs
- [ ] Configurer `NEXT_PUBLIC_WHATSAPP_NUMBER` avec le vrai numéro Business
- [ ] Intégrer la charte graphique finale (logo SVG + tokens couleur)
- [ ] Configurer les variables d'environnement en production (Vercel)
- [ ] Activer les backups PostgreSQL automatiques (Supabase/Neon)
- [ ] Configurer le domaine + HTTPS
- [ ] Soumettre `/sitemap.xml` à Google Search Console
- [ ] Tester les CTAs WhatsApp sur mobile réel (Android + iPhone)
- [ ] Audit Lighthouse (cible : Performance ≥ 85 sur 3G simulé)

---

## Déploiement Vercel

```bash
npm i -g vercel
vercel --prod
```

Variables à configurer dans le dashboard Vercel :
`DATABASE_URL` · `NEXTAUTH_SECRET` · `NEXTAUTH_URL` · `NEXT_PUBLIC_WHATSAPP_NUMBER` · `RESEND_API_KEY`

---

*HP Selectra — Un service Help'me Process, Call Center in Guinea.*
