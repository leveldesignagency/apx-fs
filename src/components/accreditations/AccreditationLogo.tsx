import { cn } from "@/lib/utils"

type AccreditationLogoProps = {
  src: string
  alt: string
  className?: string
  priority?: boolean
  /** Layout box for SVG marks — avoids 0×0 collapse in CSS grid (PNGs usually fine without). */
  width?: number
  height?: number
}

/** Native img — coloured accreditation SVGs do not render reliably via next/image. */
export function AccreditationLogo({
  src,
  alt,
  className,
  priority = false,
  width = 320,
  height = 160,
}: AccreditationLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("h-auto w-auto max-w-full shrink-0 object-contain", className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  )
}
