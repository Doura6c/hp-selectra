"use client"

import { useState, useEffect } from "react"
import { List } from "lucide-react"

export interface TocItem {
  id: string
  label: string
  level?: 1 | 2
}

interface Props {
  items: TocItem[]
  title?: string
  className?: string
}

export default function TableOfContents({ items, title = "Dans cet article", className = "" }: Props) {
  const [activeId, setActiveId] = useState<string>("")
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${className}`}
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-card)" }}
    >
      {/* Header toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          <List className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
          <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>
            {title}
          </span>
        </div>
        <span
          className="text-lg font-bold transition-transform"
          style={{
            color: "var(--color-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ⌃
        </span>
      </button>

      {/* Items */}
      {open && (
        <nav className="px-5 pb-5" aria-label="Table des matières">
          <ol className="flex flex-col gap-1">
            {items.map(({ id, label, level = 1 }) => {
              const isActive = activeId === id
              return (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="w-full text-left text-sm py-1.5 rounded-lg px-2 transition-colors"
                    style={{
                      paddingLeft: level === 2 ? "1.25rem" : "0.5rem",
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? "var(--color-primary)" : "var(--color-muted)",
                      backgroundColor: isActive ? "var(--color-primary-light)" : "transparent",
                    }}
                  >
                    {level === 2 && (
                      <span className="mr-1 opacity-40">└</span>
                    )}
                    {label}
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>
      )}
    </div>
  )
}
