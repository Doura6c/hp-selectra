export function formatGNF(amount: number): string {
  return new Intl.NumberFormat("fr-GN", {
    style: "currency",
    currency: "GNF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export function hpScoreColor(score: string): string {
  const map: Record<string, string> = {
    A: "#6B8F3C",
    B: "#8FB84E",
    C: "#F0A500",
    D: "#E06B00",
    E: "#DC2626",
  }
  return map[score] ?? "#6B7280"
}

export function hpScoreLabel(score: string): string {
  const map: Record<string, string> = {
    A: "Excellent",
    B: "Bien",
    C: "Correct",
    D: "Passable",
    E: "Déconseillé",
  }
  return map[score] ?? "–"
}

export function whatsappUrl(phone: string, message?: string): string {
  const clean = phone.replace(/\D/g, "")
  const text = message ? encodeURIComponent(message) : ""
  return `https://wa.me/${clean}${text ? `?text=${text}` : ""}`
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
