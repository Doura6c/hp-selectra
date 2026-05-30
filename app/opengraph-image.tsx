import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "HP Selectra Guinée — Comparez les meilleures offres télécom, mobile money et banques"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #122040 0%, #1D3461 60%, #2d5198 100%)",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blob décoratif */}
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,165,0,0.25) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: -60,
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,143,60,0.2) 0%, transparent 70%)",
        }} />

        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 32,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: "rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36, fontWeight: 900, color: "#fff",
          }}>
            HP
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 42, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
              HP<span style={{ color: "#F0A500" }}>·</span>Selectra
            </span>
            <span style={{
              fontSize: 16, color: "rgba(255,255,255,0.6)",
              background: "#6B8F3C", padding: "3px 12px", borderRadius: 20, marginTop: 4,
              width: "fit-content",
            }}>
              Guinée
            </span>
          </div>
        </div>

        {/* Titre */}
        <div style={{
          fontSize: 52, fontWeight: 900, color: "#fff", textAlign: "center",
          lineHeight: 1.15, maxWidth: 900, marginBottom: 24,
        }}>
          Comparez les meilleures offres en Guinée
        </div>

        {/* Sous-titre */}
        <div style={{
          fontSize: 24, color: "rgba(255,255,255,0.65)", textAlign: "center", maxWidth: 700,
          marginBottom: 48,
        }}>
          Télécom · Mobile Money · Banques · Internet Fixe
        </div>

        {/* Pills verticales */}
        <div style={{ display: "flex", gap: 16 }}>
          {["📱 Forfaits mobiles", "💸 Mobile Money", "🏦 Banques", "🌐 Internet"].map((label) => (
            <div key={label} style={{
              padding: "10px 20px", borderRadius: 40,
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.85)", fontSize: 18, fontWeight: 600,
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* Bandeau bas */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "#6B8F3C",
          padding: "14px 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
            ✓ Gratuit &amp; indépendant
          </span>
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
            ✓ Conseil expert Help'me Process
          </span>
          <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
            ✓ HP Score A→E certifié
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
