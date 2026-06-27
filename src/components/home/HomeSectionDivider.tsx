type HomeSectionDividerProps = {
  /** White line on dark bands; subtle dark line on light bands */
  surface?: "on-dark" | "on-light"
  /** Container-width line vs full-bleed edge to edge */
  width?: "inset" | "full"
  className?: string
}

export function HomeSectionDivider({
  surface = "on-dark",
  width = "inset",
  className = "",
}: HomeSectionDividerProps) {
  const lineClass = surface === "on-dark" ? "home-section-divider__line--dark" : "home-section-divider__line--light"
  const bandClass = surface === "on-dark" ? "home-section-divider--on-dark-band" : "home-section-divider--on-light-band"

  if (width === "full") {
    return (
      <div
        className={`home-section-divider home-section-divider--full ${bandClass} ${className}`}
        aria-hidden
      >
        <div className={`home-section-divider__line ${lineClass}`} />
      </div>
    )
  }

  return (
    <div
      className={`home-section-divider home-section-divider--inset ${bandClass} ${className}`}
      aria-hidden
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`home-section-divider__line ${lineClass}`} />
      </div>
    </div>
  )
}
