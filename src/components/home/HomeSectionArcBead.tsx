/**
 * Concentric-arc bead under Trusted & Reviewed.
 * 12 lines: max arc / thin at top -> flat / thick at bottom.
 */
export function HomeSectionArcBead() {
  return (
    <div className="home-section-bead home-section-bead--arcs" aria-hidden>
      <svg
        className="home-section-bead__svg"
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 12 }, (_, i) => {
          const t = i / 11 // 0 top -> 1 bottom
          const arc = 1 - t // 100% arc at top -> 0% (flat 180deg) at bottom
          const swMin = 0.5
          const swMax = 6.4
          const sw = swMin + t * (swMax - swMin)
          const gap = 32
          const maxDip = 268
          const topY = 4
          const edgeY = topY + i * gap
          const midY = edgeY + arc * maxDip
          const d = `M0 ${edgeY.toFixed(2)} Q 720 ${midY.toFixed(2)} 1440 ${edgeY.toFixed(2)}`
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#000"
              strokeWidth={sw}
              strokeLinecap="butt"
            />
          )
        })}
      </svg>
    </div>
  )
}
