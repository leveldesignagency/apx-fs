"use client"

import type { ReactNode } from "react"
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { careerApplyHref, type CareerRole } from "@/components/careers/careers-types"

type Option = { value: string; label: string }

function FilterOptionList({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string
  value: string
  options: Option[]
  onChange: (v: string) => void
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{legend}</legend>
      <ul className="space-y-0.5" role="listbox" aria-label={legend}>
        {options.map((o) => {
          const selected = value === o.value
          return (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => onChange(o.value)}
                className={`flex w-full items-center rounded-none px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                  selected
                    ? "bg-white text-black font-semibold"
                    : "text-white/75 hover:bg-white/8 hover:text-white"
                }`}
              >
                <span className="min-w-0 flex-1 truncate">{o.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </fieldset>
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
      className="careers-job-modal fixed inset-0 z-[300] flex items-end justify-center p-3 sm:items-center sm:p-6 md:p-8"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close job description"
        className="absolute inset-0 bg-black/80 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[301] flex max-h-[min(92vh,960px)] w-full max-w-5xl flex-col overflow-hidden rounded-none border border-white/20 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 careers-divider-b border-b border-white/[0.085] px-5 py-5 sm:px-8 sm:py-6">
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Job description</p>
            <h3 id={titleId} className="mt-2 font-title text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              {role.title}
            </h3>
            <p className="mt-3 text-sm text-white/50 sm:text-base">
              {role.department}
              <span className="mx-2 text-white/25" aria-hidden>
                ·
              </span>
              {role.location}
            </p>
            {role.salary ? <p className="mt-2 text-sm font-medium text-white/65 sm:text-base">{role.salary}</p> : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-none border border-white/25 p-2 text-white/70 transition-colors hover:border-white/45 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-6">
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Overview</h4>
                <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">{role.description}</p>
              </div>

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {role.employmentType ? (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                      Employment type
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">{role.employmentType}</dd>
                  </div>
                ) : null}
                {role.hours ? (
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Hours</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">{role.hours}</dd>
                  </div>
                ) : null}
                {role.baseLocation ? (
                  <div className="sm:col-span-2">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                      Base location
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">{role.baseLocation}</dd>
                  </div>
                ) : null}
                {role.companyVehicle ? (
                  <div className="sm:col-span-2">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                      Company vehicle
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">{role.companyVehicle}</dd>
                  </div>
                ) : null}
              </dl>

              {role.benefits?.length ? (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Benefits</h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/75">
                    {role.benefits.map((line) => (
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
            <div className="space-y-6">
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
              {role.requiredExperience?.length ? (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    Required experience
                  </h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/75">
                    {role.requiredExperience.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {role.certifications?.length ? (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    Certifications &amp; licences
                  </h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-white/75">
                    {role.certifications.map((line) => (
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
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 careers-divider-t border-t border-white/[0.085] px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="careers-outline-btn order-2 inline-flex h-12 min-w-[8.5rem] items-center justify-center rounded-none border border-white/25 px-6 text-sm font-semibold text-white/90 transition-colors hover:border-white/45 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:order-1"
          >
            Close
          </button>
          <CustomPillButton
            href={careerApplyHref(role.id)}
            size="md"
            className="order-1 inline-flex h-12 min-w-[8.5rem] w-full items-center justify-center !px-6 !py-0 !text-sm sm:order-2 sm:w-auto"
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

  const filtersActive = search.trim() !== "" || department !== "all" || location !== "all"

  const clearFilters = () => {
    setSearch("")
    setDepartment("all")
    setLocation("all")
  }

  return (
    <div className="mt-12 w-full lg:mt-14">
      {modalRole ? <JobDescriptionModal role={modalRole} onClose={closeModal} /> : null}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-12">
        {/* Left filter rail */}
        <aside className="careers-filter-rail lg:sticky lg:top-28 lg:self-start">
          <div className="careers-panel rounded-none border border-white/15 bg-black p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">Filters</p>
              {filtersActive ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold uppercase tracking-wide text-white/55 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="mt-5">
              <label
                htmlFor="careers-search"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45"
              >
                Search
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                  aria-hidden
                />
                <input
                  id="careers-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Role, skill or keyword"
                  autoComplete="off"
                  className="careers-search-input w-full min-h-[44px] rounded-full border border-white/20 bg-black py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/35 focus:border-white/45 focus:outline-none focus:ring-0"
                />
                {search.trim() !== "" ? (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="careers-divider-t mt-7 space-y-7 border-t border-white/12 pt-7">
              <FilterOptionList
                legend="Team"
                value={department}
                options={departmentOptions}
                onChange={setDepartment}
              />
              <FilterOptionList
                legend="Location"
                value={location}
                options={locationOptions}
                onChange={setLocation}
              />
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0">
          <div className="careers-divider-b flex flex-col gap-1 border-b border-white/12 pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <h2 className="font-title text-xl font-bold text-white sm:text-2xl">Open roles</h2>
              <p className="mt-1 text-sm text-white/50">
                {roles.length === 0
                  ? "No positions listed"
                  : `${filtered.length} ${filtered.length === 1 ? "role" : "roles"} matching your filters`}
              </p>
            </div>
            {roles.length > 0 ? (
              <p className="text-sm text-white/40">
                {roles.length} total {roles.length === 1 ? "listing" : "listings"}
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
            <div className="careers-panel mt-10 rounded-none border border-dashed border-white/15 px-6 py-12 text-center sm:mt-12">
              <p className="text-base text-white/55">No roles match your search or filters.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="careers-role-list mt-6 overflow-hidden rounded-none border border-white/15">
              {filtered.map((role) => (
                <li key={role.id} className="bg-black">
                  <article className="flex flex-col gap-5 p-5 transition-colors hover:bg-white/[0.03] sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-white/40">
                        {role.department}
                        <span className="mx-2 text-white/25" aria-hidden>
                          ·
                        </span>
                        {role.employmentType ?? role.location}
                      </p>
                      <h3 className="mt-2 font-title text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                        {role.title}
                      </h3>
                      {role.salary ? <p className="mt-1.5 text-sm font-medium text-white/55">{role.salary}</p> : null}
                      <p className="mt-1.5 text-sm text-white/45">
                        {role.baseLocation ?? role.location}
                        {role.companyVehicle ? (
                          <>
                            <span className="mx-2 text-white/25" aria-hidden>
                              ·
                            </span>
                            Vehicle: {role.companyVehicle.includes("provided") ? "provided" : "see description"}
                          </>
                        ) : null}
                      </p>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60 line-clamp-2 sm:text-base">
                        {role.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row">
                      <button
                        type="button"
                        onClick={() => setModalRole(role)}
                        className="careers-outline-btn rounded-none border border-white/25 px-4 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/45 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                      >
                        View description
                      </button>
                      <CustomPillButton
                        href={careerApplyHref(role.id)}
                        size="md"
                        className="justify-center !px-5 !py-2.5 !text-sm"
                      >
                        Apply
                      </CustomPillButton>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
