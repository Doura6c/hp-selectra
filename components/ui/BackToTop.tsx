"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  const onScroll = useCallback(() => {
    setVisible(window.scrollY > 400)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [onScroll])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className={`
        fixed z-40
        bottom-20 right-4
        lg:bottom-8 lg:left-8
        w-11 h-11 rounded-full shadow-lg
        flex items-center justify-center
        transition-all duration-300
        ${visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
      style={{
        backgroundColor: "var(--color-primary)",
        color: "#fff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
      }}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
