"use client"

/**
 * OfferClickTracker — envoie un événement à /api/track quand un CTA offre est cliqué
 * Usage :
 *   <OfferClickTracker slug="orange-pass-1go" vertical="telecom" event="offer_click">
 *     <a href="..." target="_blank">Voir l'offre</a>
 *   </OfferClickTracker>
 */

import { useCallback } from "react"

interface Props {
  slug: string
  vertical: string
  event?: string
  source?: string
  children: React.ReactNode
  className?: string
}

export default function OfferClickTracker({
  slug,
  vertical,
  event = "offer_click",
  source,
  children,
  className,
}: Props) {
  const handleClick = useCallback(() => {
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, slug, vertical, source }),
        keepalive: true,
      }).catch(() => {/* silently ignore */})
    } catch {
      // silently ignore tracking errors
    }
  }, [event, slug, vertical, source])

  return (
    <span onClick={handleClick} className={className} style={{ display: "contents" }}>
      {children}
    </span>
  )
}
