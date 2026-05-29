import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HPAssistant from "@/components/layout/HPAssistant"

export const metadata: Metadata = {
  title: {
    default: "HP Selectra Guinée — Comparez les meilleures offres",
    template: "%s | HP Selectra Guinée",
  },
  description:
    "Comparez les forfaits mobiles, mobile money, banques et assurances en Guinée. Trouvez la meilleure offre gratuitement avec HP Selectra.",
  keywords: ["comparateur guinée", "forfait mobile guinée", "orange money", "soutra money", "banque guinée"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "fr_GN",
    siteName: "HP Selectra Guinée",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <HPAssistant />
      </body>
    </html>
  )
}
