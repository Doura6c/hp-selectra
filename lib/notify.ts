/**
 * Notifications email pour nouveaux leads — Resend API
 * Doc : https://resend.com/docs/api-reference/emails/send-email
 *
 * Env vars requises :
 *   RESEND_API_KEY   — clé API depuis resend.com/api-keys
 *   NOTIFY_EMAIL     — adresse qui reçoit les alertes (ex: votre@email.com)
 *
 * Sans ces variables, la fonction est silencieuse (pas d'erreur).
 */

export type LeadNotifPayload = {
  channel: string
  name?: string
  phone?: string
  email?: string
  message?: string
  verticalSlug?: string
}

const VERTICAL_LABELS: Record<string, string> = {
  telecom: "Internet & Mobile",
  "mobile-money": "Mobile Money",
  banques: "Banques",
  fai: "Internet Fixe",
  assurances: "Assurances",
  microfinance: "Microfinance",
}

const CHANNEL_LABELS: Record<string, string> = {
  whatsapp: "💬 WhatsApp",
  callback: "📞 Rappel gratuit",
  form: "📝 Formulaire",
  newsletter: "📧 Newsletter",
}

function buildHtml(lead: LeadNotifPayload): string {
  const vertical = lead.verticalSlug ? (VERTICAL_LABELS[lead.verticalSlug] ?? lead.verticalSlug) : "Non précisé"
  const channel = CHANNEL_LABELS[lead.channel] ?? lead.channel
  const now = new Date().toLocaleString("fr-GN", {
    timeZone: "Africa/Conakry",
    dateStyle: "full",
    timeStyle: "short",
  })

  const rows = [
    ["Canal", channel],
    ["Secteur", vertical],
    lead.name ? ["Nom", lead.name] : null,
    lead.phone ? ["Téléphone", `<a href="tel:${lead.phone}" style="color:#1D3461">${lead.phone}</a>`] : null,
    lead.email ? ["Email", `<a href="mailto:${lead.email}" style="color:#1D3461">${lead.email}</a>`] : null,
    lead.message ? ["Message", lead.message] : null,
    ["Date", now],
  ].filter(Boolean) as [string, string][]

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;font-weight:600;background:#f4f6f8;color:#555;white-space:nowrap;border-bottom:1px solid #e8eaed">${label}</td>
        <td style="padding:10px 16px;color:#1a1a2e;border-bottom:1px solid #e8eaed">${value}</td>
      </tr>`
    )
    .join("")

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f0f2f5">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:32px auto">
    <tr>
      <td>
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#1D3461,#3A6BC7);padding:24px 32px;border-radius:12px 12px 0 0">
          <p style="margin:0;font-size:22px;font-weight:800;color:#fff">🔔 Nouveau lead — HP Selectra</p>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.7)">${channel} · ${vertical}</p>
        </div>

        <!-- Body -->
        <div style="background:#fff;border-radius:0 0 12px 12px;overflow:hidden">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${tableRows}
          </table>

          <!-- CTA -->
          <div style="padding:20px 32px 28px">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? "https://hpshop-afrique.vercel.app"}/admin/leads"
              style="display:inline-block;background:#1D3461;color:#fff;font-weight:700;font-size:13px;padding:12px 24px;border-radius:8px;text-decoration:none">
              Voir dans le back-office →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <p style="text-align:center;font-size:11px;color:#aaa;margin-top:16px">
          HP Selectra Guinée · Notifications automatiques · <a href="${process.env.NEXT_PUBLIC_BASE_URL ?? "https://hpshop-afrique.vercel.app"}" style="color:#aaa">hp-selectra.com</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function notifyNewLead(lead: LeadNotifPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.NOTIFY_EMAIL

  // Silencieux si non configuré
  if (!apiKey || !notifyEmail) return

  const vertical = lead.verticalSlug ? (VERTICAL_LABELS[lead.verticalSlug] ?? lead.verticalSlug) : "Général"
  const channel = CHANNEL_LABELS[lead.channel] ?? lead.channel

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "HP Selectra <onboarding@resend.dev>",
        to: [notifyEmail],
        subject: `🔔 Nouveau lead ${channel} — ${vertical}`,
        html: buildHtml(lead),
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error("[notify] Resend error:", err)
    }
  } catch (err) {
    // Ne jamais faire planter l'API à cause d'un échec d'email
    console.error("[notify] Failed to send email:", err)
  }
}
