"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll() // état initial si page déjà scrollée
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut de page"
      /* Mobile  : coin bas-gauche, 88px du bas pour passer au-dessus du StickyCTA (~56px)  */
      /* Desktop : coin bas-gauche, 32px du bas (StickyCTA est à droite, pas de conflit)    */
      className="
        fixed z-[60]
        bottom-[88px] left-4
        lg:bottom-8 lg:left-8
        flex items-center gap-2
        px-4 py-3
        rounded-full
        font-semibold text-sm text-white
        shadow-2xl
        transition-all duration-200
        hover:scale-105 active:scale-95
        animate-hp-pop
      "
      style={{
        backgroundColor: "var(--color-primary)",
        boxShadow: "0 6px 28px rgba(0,0,0,0.28)",
      }}
    >
      <ArrowUp className="w-4 h-4 shrink-0" />
      <span>Haut de page</span>
    </button>
  )
}
