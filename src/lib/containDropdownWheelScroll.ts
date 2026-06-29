import type { WheelEvent } from "react"

/** Keep wheel/trackpad scroll inside a max-height dropdown instead of Lenis/page scroll. */
export function containDropdownWheelScroll(event: WheelEvent<HTMLDivElement>) {
  const element = event.currentTarget
  if (element.scrollHeight <= element.clientHeight) return

  const atTop = element.scrollTop <= 0
  const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1

  if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) {
    event.stopPropagation()
  }
}
