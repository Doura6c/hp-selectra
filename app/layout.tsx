import type { Metadata, Viewport } from "next"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import HPAssistant from "@/components/layout/HPAssistant"
import StickyCTA from "@/components/layout/StickyCTA"

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://hp-selectra-app.vercel.app"

export const viewport: Viewport = {
  themeColor: "#1D3461",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "HP Selectra Guinée — Comparez les meilleures offres",
    template: "%s | HP Selectra Guinée",
  },
  description:
    "Comparez les forfaits mobiles, mobile money, banques et internet fixe en Guinée. Classement HP Score indépendant. Conseil gratuit Help'me Process.",
  keywords: [
    "comparateur guinée", "forfait mobile guinée", "orange money guinée",
    "soutra money", "banque guinée", "ecobank guinée", "meilleur forfait mobile conakry",
    "mobile money guinée", "comparateur télécom guinée",
  ],
  metadataBase: new URL(BASE),
  openGraph: {
    type: "website",
    locale: "fr_GN",
    siteName: "HP Selectra Guinée",
    title: "HP Selectra Guinée — Comparez les meilleures offres",
    description: "Comparez les forfaits mobiles, mobile money et banques en Guinée. Gratuit & indépendant.",
    url: BASE,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "HP Selectra Guinée — Comparez les meilleures offres télécom, mobile money et banques",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HP Selectra Guinée — Comparez les meilleures offres",
    description: "Forfaits mobiles, mobile money et banques en Guinée. Comparateur gratuit & indépendant.",
    images: ["/og-default.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/icon.svg",
    shortcut: "/icons/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Ajouter les codes de vérification Google Search Console / Bing ici
    // google: "XXXX",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <head>
        {/* PWA / Apple */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HP Selectra" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <HPAssistant />
        <StickyCTA />
      </body>
    </html>
  )
}
