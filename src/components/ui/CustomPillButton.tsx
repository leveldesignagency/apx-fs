"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { forwardRef, type ButtonHTMLAttributes } from "react"

/** Same shell as hero CTAs — white border, black bg, white text; hover: white fill rises from bottom (see `.pill-btn-inner::before` in globals). */
const pillBaseStyles = [
  "pill-btn",
  "relative inline-flex items-center justify-center font-bold",
  "overflow-hidden",
  "bg-black",
  "rounded-tl-2xl rounded-br-2xl",
  "cursor-pointer",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  "disabled:opacity-50 disabled:pointer-events-none",
].join(" ")

export interface CustomPillButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  /** Outline = white fill + black border off hover; black fill on hover */
  variant?: "default" | "outline"
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3.5 text-base",
  lg: "px-8 py-4 text-lg",
}

const CustomPillButton = forwardRef<HTMLAnchorElement, CustomPillButtonProps>(
  ({ href, children, className, size = "md", variant = "default", ...props }, ref) => {
    const sizeClass = sizeClasses[size]
    const classes = cn(pillBaseStyles, sizeClass, variant === "outline" && "pill-btn--outline", className)
    return (
      <Link ref={ref} href={href} className={classes} {...props}>
        <span className="pill-btn-inner" aria-hidden />
        <span className="pill-btn-border" aria-hidden />
        <span className="pill-text font-bold">{children}</span>
      </Link>
    )
  }
)

CustomPillButton.displayName = "CustomPillButton"

export type PillSubmitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline"
}

/** Native submit — same pill animation as `CustomPillButton` / hero (fill from bottom). */
export function PillSubmitButton({
  children,
  className,
  size = "md",
  variant = "default",
  ...props
}: PillSubmitButtonProps) {
  const sizeClass = sizeClasses[size]
  const classes = cn(pillBaseStyles, sizeClass, variant === "outline" && "pill-btn--outline", className)
  return (
    <button type="submit" className={classes} {...props}>
      <span className="pill-btn-inner" aria-hidden />
      <span className="pill-btn-border" aria-hidden />
      <span className="pill-text font-bold">{children}</span>
    </button>
  )
}

export { CustomPillButton }
