"use client"

import { useEffect } from "react"
import { useLenis } from "lenis/react"
import { setLenisInstance } from "@/lib/lenisBridge"

/** Registers the root Lenis instance for imperative scroll helpers. */
export function LenisBridge() {
  const lenis = useLenis()

  useEffect(() => {
    setLenisInstance(lenis ?? null)
    return () => setLenisInstance(null)
  }, [lenis])

  return null
}
