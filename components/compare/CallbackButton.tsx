"use client"

import { useState } from "react"
import { Phone } from "lucide-react"
import CallbackModal from "./CallbackModal"

type Props = {
  offerName: string
  providerName: string
  verticalSlug: string
}

export default function CallbackButton({ offerName, providerName, verticalSlug }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border transition-colors hover:bg-surface w-full"
        style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
      >
        <Phone className="w-4 h-4" /> Demander un rappel gratuit
      </button>

      {open && (
        <CallbackModal
          offerName={offerName}
          providerName={providerName}
          verticalSlug={verticalSlug}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
