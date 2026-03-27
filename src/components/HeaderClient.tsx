"use client"

import Header from "@/components/Header"

/** Thin wrapper so the root layout can keep a stable import; avoids `dynamic(..., { ssr: false })` which can cause CSR bailout / flaky dev responses. */
export default function HeaderClient() {
  return <Header />
}
