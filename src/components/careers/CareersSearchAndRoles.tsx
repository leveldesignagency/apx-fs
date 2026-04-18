"use client"

import type { ReactNode } from "react"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { ChevronDown, Search, X } from "lucide-react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { careerApplyHref, type CareerRole } from "@/components/careers/careers-types"

type Option = { value: string; label: string }

function FilterDropdown({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: Option[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  const current = options.find((o) => o.value === value)?.label ?? value

  return (
    <div ref={rootRef} className="relative min-w-0">
      <label htmlFor={id} className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {label}
      </label>
      <button
        id={id}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full min-h-[48px] items-center justify-between gap-2 rounded-tl-xl rounded-br-xl border-2 border-white/25 bg-black px-4 py-2.5 text-left text-sm text-white transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <span className="truncate">{current}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-white/60 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-tl-xl rounded-br-xl border border-white/20 bg-black py-1 shadow-[0_16px_40px_rgba(0,0,0,0.65)]"
        >
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={value === o.value}>
              <button
                type="button"
                className="w-full px-4 py-2.5 text-left text-sm text-white/90 transition-colors hover:bg-white/10"
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function JobDescriptionModal({ role, onClose }: { role: CareerRole; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  useLayoutEffect(() => {
    closeRef.current?.focus()
  }, [role])

  const titleId = `careers-modal-title-${role.id}`

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close job description"
        className="absolute inset-0 bg-black/75 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] w-full max-w-2xl max-h-[min(85vh,900px)] overflow-y-auto rounded-tl-2xl rounded-br-2xl border border-white/20 bg-black px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.85)] sm:px-8 sm:py-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Job description</p>
            <h3 id={titleId} className="mt-2 font-title text-2xl font-bold leading-tight text-white sm:text-3xl">
              {role.title}
            </h3>
            <p className="mt-3 text-sm text-white/50">
              {role.department}
              <span className="mx-2 text-white/25" aria-hidden>
                ·
              </span>
              {role.location}
            </p>
            {role.salary ? <p className="mt-2 text-sm font-medium text-white/65">{role.salary}</p> : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-tl-lg rounded-br-lg border border-white/25 p-2 text-white/70 transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="mt-6 space-y-6 border-t border-white/10 pt-6">
          <p className="text-base leading-relaxed text-white/75 sm:text-lg">{role.description}</p>
          {role.responsibilities?.length ? (
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Responsibilities</h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/75">
                {role.responsibilities.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {role.requirements?.length ? (
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Requirements</h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/75">
                {role.requirements.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {role.workingAreas?.length ? (
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Working areas</h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/75">
                {role.workingAreas.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="order-2 rounded-tl-xl rounded-br-xl border-2 border-white/25 px-5 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/45 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:order-1"
          >
            Close
          </button>
          <CustomPillButton
            href={careerApplyHref(role.id)}
            size="md"
            className="order-1 w-full justify-center sm:order-2 sm:w-auto"
          >
            Apply
          </CustomPillButton>
        </div>
      </div>
    </div>
  )
}

function filterRoles(roles: CareerRole[], query: string, department: string, location: string): CareerRole[] {
  const q = query.trim().toLowerCase()
  return roles.filter((r) => {
    const hay = [
      r.title,
      r.description,
      r.department,
      r.location,
      r.salary ?? "",
      ...(r.responsibilities ?? []),
      ...(r.requirements ?? []),
      ...(r.workingAreas ?? []),
    ]
      .join(" ")
      .toLowerCase()
    const matchQ = !q || hay.includes(q)
    const matchDept = department === "all" || r.department === department
    const matchLoc = location === "all" || r.location === location
    return matchQ && matchDept && matchLoc
  })
}

export function CareersSearchAndRoles({
  roles,
  noRolesMessage,
}: {
  roles: CareerRole[]
  /** When there are no roles in the catalogue (e.g. MEP). Shown instead of the match list. */
  noRolesMessage?: ReactNode
}) {
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("all")
  const [location, setLocation] = useState("all")
  const [modalRole, setModalRole] = useState<CareerRole | null>(null)
  const closeModal = useCallback(() => setModalRole(null), [])

  const departmentOptions: Option[] = useMemo(() => {
    const set = new Set(roles.map((r) => r.department))
    const list = Array.from(set).sort()
    return [{ value: "all", label: "All teams" }, ...list.map((d) => ({ value: d, label: d }))]
  }, [roles])

  const locationOptions: Option[] = useMemo(() => {
    const set = new Set(roles.map((r) => r.location))
    const list = Array.from(set).sort()
    return [{ value: "all", label: "All locations" }, ...list.map((d) => ({ value: d, label: d }))]
  }, [roles])

  const filtered = useMemo(
    () => filterRoles(roles, search, department, location),
    [roles, search, department, location]
  )

  return (
    <div className="mt-16 w-full sm:mt-20">
      {modalRole ? <JobDescriptionModal role={modalRole} onClose={closeModal} /> : null}
      <div className="rounded-tl-2xl rounded-br-2xl border border-white/15 bg-black/30 p-4 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Find a role</p>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end md:gap-4">
          <div className="md:col-span-5">
            <label htmlFor="careers-search" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden />
              <input
                id="careers-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Role, skill or keyword"
                autoComplete="off"
                className="w-full min-h-[48px] rounded-tl-xl rounded-br-xl border-2 border-white/25 bg-black py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <FilterDropdown
              id="careers-dept"
              label="Team"
              value={department}
              options={departmentOptions}
              onChange={setDepartment}
            />
          </div>
          <div className="md:col-span-4">
            <FilterDropdown
              id="careers-loc"
              label="Location"
              value={location}
              options={locationOptions}
              onChange={setLocation}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-12 sm:mt-14 sm:pt-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Open roles</p>
          {roles.length > 0 ? (
            <p className="text-sm text-white/50">
              {filtered.length} {filtered.length === 1 ? "role" : "roles"} of {roles.length}
            </p>
          ) : null}
        </div>

        {roles.length === 0 ? (
          <div className="mt-10 text-center sm:mt-12">
            {noRolesMessage ?? (
              <p className="text-base text-white/55">
                No open positions at the moment. Please check back later or use the contact page for general enquiries.
              </p>
            )}
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-10 text-center text-base text-white/55 sm:mt-12">
            No roles match your search or filters. Try adjusting keywords or reset the filters.
          </p>
        ) : (
          <ul className="mt-10 space-y-12 sm:mt-12">
            {filtered.map((role) => (
              <li key={role.id}>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-white/40">
                      {role.department}
                      <span className="mx-2 text-white/25" aria-hidden>
                        ·
                      </span>
                      {role.location}
                    </p>
                    <h2 className="mt-3 font-title text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:max-w-[40rem]">
                      {role.title}
                    </h2>
                    {role.salary ? <p className="mt-2 text-sm font-medium text-white/55">{role.salary}</p> : null}
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 line-clamp-3 sm:mt-6 sm:text-lg">
                      {role.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => setModalRole(role)}
                      className="mt-6 self-start text-left text-sm font-semibold uppercase tracking-[0.12em] text-white underline decoration-white/35 underline-offset-[6px] transition-colors hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:mt-7"
                    >
                      View job description
                    </button>
                  </div>
                  <div className="shrink-0 lg:pb-1">
                    <CustomPillButton href={careerApplyHref(role.id)} size="md">
                      Apply
                    </CustomPillButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
