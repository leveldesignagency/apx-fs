"use client"

import { CheckCircle } from "lucide-react"
import { ServiceItemReveal } from "@/components/ServiceItemReveal"
import { cn } from "@/lib/utils"

type FsServiceBenefitsListProps = {
  items: readonly string[]
  /** Dark sections (default) or light bands */
  variant?: "dark" | "light"
  className?: string
}

/** Tick-in-circle benefit bullets — matches CCTV “What we offer” and compliance lists. */
export function FsServiceBenefitsList({ items, variant = "dark", className }: FsServiceBenefitsListProps) {
  const isLight = variant === "light"

  return (
    <ul className={cn("list-none space-y-2.5", className)}>
      {items.map((line, index) => (
        <ServiceItemReveal key={line} index={index} stepMs={55} className="contents">
          <li className="flex items-start gap-3">
            <CheckCircle
              className={cn(
                "mt-0.5 h-5 w-5 shrink-0",
                isLight ? "text-black/40" : "text-white/50"
              )}
              strokeWidth={2}
              aria-hidden
            />
            <span className={cn("min-w-0 text-base leading-relaxed", isLight ? "text-neutral-700" : "text-gray-300")}>
              {line}
            </span>
          </li>
        </ServiceItemReveal>
      ))}
    </ul>
  )
}
