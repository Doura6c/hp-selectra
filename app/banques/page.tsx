import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Comparer les banques en Guinée — Bientôt sur HP Selectra",
  description: "Comparateur de banques en Guinée : Ecobank, BICIGUI, Orabank, UBA, NSIA et plus. Disponible prochainement.",
}

const BANKS = [
  { name: "Ecobank Guinée", note: "Réseau panafricain, mobile banking étendu" },
  { name: "BICIGUI (BNP Paribas)", note: "Filiale BNP, services premium" },
  { name: "Orabank Guinée", note: "Forte présence en Afrique de l'Ouest" },
  { name: "UBA Guinée", note: "United Bank for Africa, large réseau" },
  { name: "NSIA Banque Guinée", note: "Groupe NSIA, offres entreprises" },
  { name: "Vista Bank Guinée", note: "Banque en croissance rapide" },
  { name: "Banque Islamique de Guinée", note: "Finance islamique, halal" },
  { name: "BPMG", note: "Banque Populaire du Maroc en Guinée" },
  { name: "Afriland First Bank", note: "Groupe camerounais, PME" },
  { name: "Access Bank", note: "Groupe nigérian, digital-first" },
  { name: "Société Générale (SGBG)", note: "Réseau international" },
  { name: "FBNBank Guinée", note: "First Bank of Nigeria" },
]

export default function BanquesPage() {
  return (
    <>
      <section className="py-12 sm:py-16" style={{ background: "linear-gradient(135deg, #122040, #1D3461)" }}>
        <div className="container">
          <nav className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Banques</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-5xl">🏦</div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 text-white" style={{ backgroundColor: "var(--color-accent)" }}>
                🔒 Bientôt disponible
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">Comparer les banques en Guinée</h1>
              <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.8)" }}>
                Comptes courants, cartes bancaires, frais de tenue de compte et banque mobile —
                comparatif des 12 banques actives en Guinée. En cours de préparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <h2 className="text-lg font-bold mb-6" style={{ color: "var(--color-text)" }}>Les {BANKS.length} banques qui seront comparées</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BANKS.map((b) => (
            <div key={b.name} className="flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>
                {b.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>{b.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{b.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-2xl text-center" style={{ backgroundColor: "var(--color-primary-light)" }}>
          <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>Être notifié à l'ouverture</p>
          <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>Inscrivez-vous pour être alerté dès que le comparateur banques est disponible.</p>
          <Link href="/#newsletter" className="inline-block px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
            S'inscrire à la newsletter
          </Link>
        </div>
      </div>
    </>
  )
}
