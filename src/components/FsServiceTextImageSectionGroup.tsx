"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react"

/**
 * Assigns alternating image sides to child {@link FsServiceTextImageSection} blocks
 * (first left, then right, …) unless `imageSide` is set explicitly.
 */
export function FsServiceTextImageSectionGroup({ children }: { children: ReactNode }) {
  const items = Children.toArray(children)
  let sectionIndex = 0
  const withSides = items.map((child) => {
    if (!isValidElement(child)) return child
    const props = child.props as { title?: unknown; imageSide?: "left" | "right" }
    // Skip dividers / non-section children inside the group
    if (typeof props.title !== "string") return child
    const autoSide = sectionIndex % 2 === 0 ? "left" : "right"
    sectionIndex += 1
    if (props.imageSide) return child
    return cloneElement(child as ReactElement<{ imageSide?: "left" | "right" }>, {
      imageSide: autoSide,
    })
  })

  return <>{withSides}</>
}

/** @deprecated Height sync removed with inset image layout. */
export function useFsServiceTextImageSync() {
  return null
}

/** @deprecated Order is injected via cloneElement. */
export function useFsServiceTextImageOrder() {
  return null
}
