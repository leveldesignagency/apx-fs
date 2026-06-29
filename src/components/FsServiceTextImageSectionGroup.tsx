"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

type SyncContextValue = {
  register: (id: string, node: HTMLElement | null) => void
  maxHeight: number | null
}

const FsServiceTextImageSyncContext = createContext<SyncContextValue | null>(null)

export function useFsServiceTextImageSync() {
  return useContext(FsServiceTextImageSyncContext)
}

/**
 * Keeps child {@link FsServiceTextImageSection} blocks the same height on large screens,
 * matching the tallest section in the group.
 */
export function FsServiceTextImageSectionGroup({ children }: { children: ReactNode }) {
  const nodesRef = useRef<Map<string, HTMLElement>>(new Map())
  const [maxHeight, setMaxHeight] = useState<number | null>(null)
  const [isLgUp, setIsLgUp] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsLgUp(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const measure = useCallback(() => {
    if (!isLgUp) {
      setMaxHeight(null)
      return
    }

    let max = 0
    nodesRef.current.forEach((node) => {
      max = Math.max(max, node.getBoundingClientRect().height)
    })

    setMaxHeight(max > 0 ? Math.ceil(max) : null)
  }, [isLgUp])

  const register = useCallback(
    (id: string, node: HTMLElement | null) => {
      if (node) nodesRef.current.set(id, node)
      else nodesRef.current.delete(id)
      queueMicrotask(measure)
    },
    [measure]
  )

  useLayoutEffect(() => {
    if (!isLgUp) {
      setMaxHeight(null)
      return
    }

    const observer = new ResizeObserver(() => measure())
    nodesRef.current.forEach((node) => observer.observe(node))
    measure()

    return () => observer.disconnect()
  }, [isLgUp, measure])

  const value = useMemo(
    () => ({
      register,
      maxHeight: isLgUp ? maxHeight : null,
    }),
    [register, maxHeight, isLgUp]
  )

  return <FsServiceTextImageSyncContext.Provider value={value}>{children}</FsServiceTextImageSyncContext.Provider>
}
