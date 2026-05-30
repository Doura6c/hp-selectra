import { NextRequest, NextResponse } from "next/server"

// In-memory click store (module-level — resets on serverless cold start)
// In production, replace with a database or analytics provider

interface ClickEvent {
  ts: number
  event: string
  slug?: string
  vertical?: string
  source?: string
}

const CLICK_LOG: ClickEvent[] = []
const MAX_LOG_SIZE = 5000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, slug, vertical, source } = body as {
      event?: string
      slug?: string
      vertical?: string
      source?: string
    }

    if (!event || typeof event !== "string") {
      return NextResponse.json({ error: "Missing event" }, { status: 400 })
    }

    const clickEvent: ClickEvent = {
      ts: Date.now(),
      event: event.slice(0, 64),
      slug: slug?.slice(0, 128),
      vertical: vertical?.slice(0, 32),
      source: source?.slice(0, 64),
    }

    CLICK_LOG.push(clickEvent)
    // Trim to avoid unbounded memory usage
    if (CLICK_LOG.length > MAX_LOG_SIZE) {
      CLICK_LOG.splice(0, CLICK_LOG.length - MAX_LOG_SIZE)
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}

// Admin stats endpoint — basic protection via query param
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.ADMIN_SECRET && secret !== "hp-admin-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Aggregate stats
  const eventCounts = CLICK_LOG.reduce<Record<string, number>>((acc, e) => {
    acc[e.event] = (acc[e.event] ?? 0) + 1
    return acc
  }, {})

  const verticalCounts = CLICK_LOG.reduce<Record<string, number>>((acc, e) => {
    if (e.vertical) acc[e.vertical] = (acc[e.vertical] ?? 0) + 1
    return acc
  }, {})

  const slugCounts = CLICK_LOG.reduce<Record<string, number>>((acc, e) => {
    if (e.slug) acc[e.slug] = (acc[e.slug] ?? 0) + 1
    return acc
  }, {})

  // Top 10 slugs
  const topSlugs = Object.entries(slugCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return NextResponse.json({
    total: CLICK_LOG.length,
    eventCounts,
    verticalCounts,
    topSlugs,
    recent: CLICK_LOG.slice(-20).reverse(),
  })
}
