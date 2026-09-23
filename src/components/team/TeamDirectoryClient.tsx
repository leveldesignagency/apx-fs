"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { FS_TEAM_MEMBERS, type FsTeamMember } from "@/data/fsTeam"
import { cn } from "@/lib/utils"

function TeamMemberCard({ member }: { member: FsTeamMember }) {
  return (
    <article className="team-member-card group relative flex aspect-[3/4] flex-col overflow-hidden rounded-[1.5rem] bg-black shadow-[0_18px_44px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out hover:-translate-y-1 sm:rounded-[1.75rem]">
      <div className="relative min-h-0 flex-1 overflow-hidden bg-neutral-900">
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-neutral-800 to-black">
            <span className="font-title text-4xl font-bold tracking-tight text-white/20 sm:text-5xl lg:text-6xl">
              {member.initials}
            </span>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent"
          aria-hidden
        />
      </div>
      <div className="relative z-[1] border-t border-white/10 bg-black px-4 py-4 sm:px-5 sm:py-5">
        <h2 className="font-title text-base font-bold leading-tight tracking-tight text-white sm:text-lg">
          {member.name}
        </h2>
        <p className="mt-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white/50">
          {member.role}
        </p>
      </div>
    </article>
  )
}

export function TeamDirectoryClient() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return FS_TEAM_MEMBERS
    return FS_TEAM_MEMBERS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.initials.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="team-directory bg-white text-black">
      <div className="site-container page-title-top pb-16 sm:pb-20 lg:pb-24">
        <div className="flex flex-col gap-8 border-b border-black/10 pb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pb-12">
          <div className="min-w-0 max-w-xl">
            <p
              className="section-label section-label--black mb-3 block tracking-[0.2em]"
              style={{ fontFamily: "var(--font-menu), sans-serif" }}
            >
              People
            </p>
            <h1 className="font-title text-4xl font-bold leading-[1.02] tracking-tight text-black sm:text-5xl lg:text-6xl">
              The team.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-black/60 sm:text-lg">
              Everyone behind APX Fire &amp; Security. Search by name or role.
            </p>
            <Link
              href="/about#meet-the-team"
              className="mt-5 inline-block text-sm font-semibold text-black underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Back to About
            </Link>
          </div>

          <div className="w-full max-w-md shrink-0 lg:pb-1">
            <label className="relative block">
              <span className="sr-only">Search the team</span>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search names..."
                autoComplete="off"
                className="team-directory__search w-full rounded-none border border-black/15 bg-white py-3.5 pl-10 pr-11 text-[15px] font-semibold text-black outline-none transition-[border-color] placeholder:font-normal placeholder:text-black/35 focus:border-black/50"
              />
              {query.trim() !== "" ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-black/45 transition-colors hover:bg-black/5 hover:text-black"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
                </button>
              ) : null}
            </label>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-black/40" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "person" : "people"}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex min-h-[30vh] items-center justify-center py-20 text-center">
            <p className="text-base font-semibold text-black/50">
              No matches for &ldquo;{query.trim()}&rdquo;.
            </p>
          </div>
        ) : (
          <ul
            className={cn(
              "team-directory__grid m-0 mt-10 grid list-none grid-cols-2 gap-4 p-0 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:mt-14 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5"
            )}
          >
            {filtered.map((member) => (
              <li key={member.id} className="m-0 min-w-0 p-0">
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
