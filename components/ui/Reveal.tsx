"use client"

import { useEffect, useRef, useState } from "react"

type RevealProps = {
  children: React.ReactNode
  /** Délai d'apparition en ms (pour décaler les éléments en cascade) */
  delay?: number
  className?: string
  /** Balise HTML rendue (div par défaut) */
  as?: "div" | "section" | "li" | "article"
}

export default function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [shown])

  const Tag = as as React.ElementType
  return (
    <Tag
      ref={ref}
      className={`hp-reveal ${shown ? "hp-reveal--in" : ""} ${className}`}
      style={{ "--hp-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
