import type { Metadata } from "next"
import Link from "next/link"
import {
  LayoutDashboard, Users, Tag, MessageSquare, Mail,
  BarChart3, Settings, FileText, ChevronRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "Back-Office — HP Selectra Admin",
  description: "Administration HP Selectra",
}

const MODULES = [
  {
    href: "/admin/fournisseurs",
    icon: Users,
    title: "Fournisseurs",
    desc: "Ajouter, modifier, vérifier les opérateurs et prestataires",
    count: "30 actifs",
    color: "var(--color-primary)",
  },
  {
    href: "/admin/offres",
    icon: Tag,
    title: "Offres & Tarifs",
    desc: "Mettre à jour les tarifs, activer/désactiver des offres",
    count: "63 offres",
    color: "var(--color-secondary)",
  },
  {
    href: "/admin/leads",
    icon: Mail,
    title: "Leads & Contacts",
    desc: "Consulter les demandes de rappel, WhatsApp et formulaires",
    count: "0 nouveaux",
    color: "var(--color-accent)",
  },
  {
    href: "/admin/avis",
    icon: MessageSquare,
    title: "Avis clients",
    desc: "Modérer les avis déposés par les utilisateurs",
    count: "0 en attente",
    color: "#8B5CF6",
  },
  {
    href: "/admin/articles",
    icon: FileText,
    title: "Articles / Actualités",
    desc: "Rédiger et publier des articles par verticale",
    count: "3 articles",
    color: "#0EA5E9",
  },
  {
    href: "/admin/newsletter",
    icon: Mail,
    title: "Newsletter",
    desc: "Gérer les segments et envoyer des campagnes email",
    count: "0 abonnés",
    color: "#E67E22",
  },
  {
    href: "/admin/kpis",
    icon: BarChart3,
    title: "KPIs & Analytics",
    desc: "Tableau de bord clics, leads et conversions",
    count: null,
    color: "#8B5CF6",
  },
  {
    href: "/admin/parametres",
    icon: Settings,
    title: "Paramètres & HP Score",
    desc: "Configurer les pondérations du HP Score par verticale",
    count: null,
    color: "var(--color-muted)",
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Topbar admin */}
      <header className="border-b px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
          <span className="font-bold text-base" style={{ color: "var(--color-text)" }}>HP Selectra</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)" }}>Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm" style={{ color: "var(--color-muted)" }}>← Voir le site</Link>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>A</div>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        {/* Stats rapides */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Fournisseurs actifs", value: "21", color: "var(--color-primary)" },
            { label: "Offres publiées", value: "46", color: "var(--color-secondary)" },
            { label: "Leads ce mois", value: "0", color: "var(--color-accent)" },
            { label: "Avis en attente", value: "0", color: "#8B5CF6" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Alerte tarifs à vérifier */}
        <div className="p-4 rounded-xl mb-8 flex items-start gap-3 border" style={{ backgroundColor: "#FFFBEB", borderColor: "var(--color-accent)" }}>
          <span className="text-lg">⚠️</span>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
              Des tarifs sont marqués « à vérifier »
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              Plusieurs offres contiennent des données d'exemple. Rendez-vous dans{" "}
              <Link href="/admin/offres" className="underline font-medium" style={{ color: "var(--color-accent)" }}>
                Offres & Tarifs
              </Link>{" "}
              pour les mettre à jour avec les vrais tarifs fournisseurs.
            </p>
          </div>
        </div>

        {/* Modules */}
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--color-muted)" }}>MODULES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MODULES.map((mod) => {
            const Icon = mod.icon
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="group p-5 rounded-xl border flex items-center gap-4 transition-shadow hover:shadow-md"
                style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${mod.color}18` }}>
                  <Icon className="w-5 h-5" style={{ color: mod.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{mod.title}</p>
                    {mod.count && (
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-muted)" }}>
                        {mod.count}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-muted)" }}>{mod.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0 opacity-30 group-hover:opacity-70 transition-opacity" style={{ color: "var(--color-text)" }} />
              </Link>
            )
          })}
        </div>

        {/* Checklist mise en production */}
        <div className="mt-10 p-6 rounded-2xl border" style={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-border)" }}>
          <h2 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "var(--color-text)" }}>
            <BarChart3 className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
            Checklist mise en production
          </h2>
          <div className="space-y-2">
            {[
              { done: false, text: "Remplacer tous les tarifs « à vérifier » par les vrais tarifs" },
              { done: false, text: "Configurer le numéro WhatsApp Business (NEXT_PUBLIC_WHATSAPP_NUMBER)" },
              { done: false, text: "Intégrer la charte graphique finale (logo, couleurs)" },
              { done: false, text: "Configurer DATABASE_URL + NEXTAUTH_SECRET en production" },
              { done: false, text: "Activer les backups PostgreSQL automatiques" },
              { done: false, text: "Soumettre le sitemap à Google Search Console" },
              { done: false, text: "Tester les CTAs WhatsApp sur mobile réel" },
              { done: false, text: "Audit Lighthouse (cible : Performance ≥ 85 sur 3G)" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded border-2 mt-0.5 shrink-0 flex items-center justify-center" style={{ borderColor: item.done ? "var(--color-secondary)" : "var(--color-border)", backgroundColor: item.done ? "var(--color-secondary)" : "transparent" }}>
                  {item.done && <span className="text-white text-xs">✓</span>}
                </div>
                <span style={{ color: item.done ? "var(--color-muted)" : "var(--color-text)", textDecoration: item.done ? "line-through" : "none" }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
