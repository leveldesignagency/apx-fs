import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export const FS_PHONE_DISPLAY = "020 8303 2280"
export const FS_PHONE_HREF = "tel:02083032280"

type CallPhoneCtaProps = {
  /** Dark CTA panels vs light surfaces */
  variant?: "onDark" | "onLight"
  size?: "md" | "lg"
  /** Second line under the number (desktop only) */
  subtitle?: string
  className?: string
}

/**
 * Desktop: circular phone icon + number beside it.
 * Mobile: centered number link only (no icon).
 */
export function CallPhoneCta({
  variant = "onDark",
  size = "md",
  subtitle = "Call us",
  className,
}: CallPhoneCtaProps) {
  const onDark = variant === "onDark"
  const iconBox = size === "lg" ? "h-14 w-14" : "h-12 w-12"
  const iconSize = size === "lg" ? "h-6 w-6" : "h-5 w-5"
  const numberClass = size === "lg" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"

  return (
    <a
      href={FS_PHONE_HREF}
      className={cn(
        "group inline-flex w-full items-center justify-center rounded-sm sm:w-auto sm:justify-start sm:gap-3.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        onDark
          ? "focus-visible:ring-white/50 focus-visible:ring-offset-[var(--page-bg)]"
          : "focus-visible:ring-black/40 focus-visible:ring-offset-white",
        className
      )}
      aria-label={`Call ${FS_PHONE_DISPLAY}`}
    >
      <span
        className={cn(
          "relative hidden shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none motion-safe:group-hover:scale-[1.05] sm:inline-flex",
          iconBox,
          onDark
            ? "bg-black ring-2 ring-white shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
            : "bg-black ring-2 ring-black/15"
        )}
        aria-hidden
      >
        <Phone className={cn(iconSize, "text-white")} strokeWidth={2} />
      </span>
      <span className="flex min-w-0 flex-col items-center gap-0.5 text-center sm:items-start sm:text-left">
        <span
          className={cn(
            "font-title font-bold tracking-tight leading-none underline decoration-current/35 underline-offset-[0.2em] sm:no-underline",
            numberClass,
            onDark ? "text-white" : "text-black"
          )}
        >
          {FS_PHONE_DISPLAY}
        </span>
        {subtitle ? (
          <span
            className={cn(
              "hidden text-sm leading-none sm:inline",
              onDark ? "text-white/55" : "text-neutral-500"
            )}
          >
            {subtitle}
          </span>
        ) : null}
      </span>
    </a>
  )
}
