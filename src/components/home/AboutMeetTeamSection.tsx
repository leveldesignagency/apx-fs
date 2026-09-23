"use client"

import { Reveal } from "@/components/Reveal"
import { CustomPillButton } from "@/components/ui/CustomPillButton"
import { FS_FEATURED_TEAM, type FsTeamMember } from "@/data/fsTeam"
import { cn } from "@/lib/utils"

function CardDecor({ variant }: { variant: number }) {
  const mods = variant % 4
  if (mods === 0) {
    return (
      <>
        <span
          className="pointer-events-none absolute right-[10%] top-[26%] h-24 w-24 rounded-full border-[8px] border-white/15 sm:h-28 sm:w-28 sm:border-[10px]"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute bottom-[40%] left-[10%] h-8 w-8 rotate-12 rounded-md bg-white/10"
          aria-hidden
        />
      </>
    )
  }
  if (mods === 1) {
    return (
      <span
        className="pointer-events-none absolute -right-8 top-[18%] h-40 w-40 rounded-[45%_55%_60%_40%] bg-white/[0.07]"
        aria-hidden
      />
    )
  }
  if (mods === 2) {
    return (
      <>
        <span
          className="pointer-events-none absolute left-[12%] top-[24%] h-24 w-7 rounded-full bg-white/10"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute left-[26%] top-[18%] h-32 w-7 rounded-full bg-white/[0.08]"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute left-[40%] top-[28%] h-20 w-7 rounded-full bg-white/[0.06]"
          aria-hidden
        />
      </>
    )
  }
  return (
    <>
      <span
        className="pointer-events-none absolute -left-10 top-[22%] h-36 w-36 rounded-[60%_40%_55%_45%] bg-white/[0.06]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-[12%] top-[36%] h-10 w-10 rounded-full border-4 border-white/15"
        aria-hidden
      />
    </>
  )
}

function TeamMemberCard({ member, variant }: { member: FsTeamMember; variant: number }) {
  const nameParts = member.name.split(" ")
  const first = nameParts[0] ?? member.name
  const rest = nameParts.slice(1).join(" ")

  return (
    <article className="about-featured-team-card relative flex h-[22rem] w-full flex-col overflow-hidden rounded-[2rem] bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.22)] sm:h-[24rem] sm:rounded-[2.25rem] lg:h-[26rem]">
      <CardDecor variant={variant} />

      <div className="relative z-[2] px-5 pt-5 sm:px-6 sm:pt-6">
        <h3 className="font-title font-bold leading-[1.05] tracking-tight text-white">
          {first}
          <br />
          {rest || "\u00A0"}
        </h3>
        <span className="mt-3 inline-flex max-w-full items-center truncate rounded-full bg-white px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-black">
          {member.role}
        </span>
      </div>

      <div className="relative z-[2] mt-auto flex flex-1 items-end justify-center px-2 pb-0 pt-6">
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt=""
            className="pointer-events-none h-[70%] max-h-[17rem] w-auto object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="about-featured-team-avatar mb-6 flex items-center justify-center rounded-full border-4 border-white/20 bg-white/[0.06] sm:mb-7">
            <span className="about-featured-team-avatar__initials font-title font-bold tracking-tight text-white/90">
              {member.initials}
            </span>
          </div>
        )}
      </div>
    </article>
  )
}

/** About page: black featured cards + link to /team. Narrow cards expand to lead width on hover. */
export function AboutMeetTeamSection() {
  const members = FS_FEATURED_TEAM.slice(0, 5)

  return (
    <section
      id="meet-the-team"
      className="about-meet-team about-block about-block--white about-section-px border-t border-black/10"
      aria-labelledby="about-meet-the-team-heading"
    >
      <div className="about-section-inner py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <Reveal>
            <div>
              <p
                className="section-label section-label--black mb-3 block tracking-[0.2em]"
                style={{ fontFamily: "var(--font-menu), sans-serif" }}
              >
                People
              </p>
              <h2
                id="about-meet-the-team-heading"
                className="font-title text-4xl font-bold leading-[1.02] tracking-tight text-black sm:text-5xl lg:text-6xl"
              >
                Meet the team.
              </h2>
            </div>
          </Reveal>
          <Reveal delayMs={70}>
            <p className="max-w-md text-base leading-relaxed text-black/60 sm:pb-1 sm:text-right sm:text-lg">
              The people behind every survey, install and handover - NSI Gold workmanship, site by site.
            </p>
          </Reveal>
        </div>

        <Reveal delayMs={100}>
          <ul className="about-featured-team-row m-0 mt-10 flex list-none gap-3 overflow-x-auto pb-2 sm:mt-12 sm:gap-4 lg:mt-14 lg:gap-5 lg:overflow-visible">
            {members.map((member, i) => (
              <li
                key={member.id}
                className={cn(
                  "about-featured-team-item group flex min-w-0",
                  i === 0 ? "is-lead" : "is-peer"
                )}
              >
                <TeamMemberCard member={member} variant={i} />
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8 flex justify-end sm:mt-10">
          <CustomPillButton
            href="/team"
            size="md"
            variant="outline"
            className="!border-black !text-black hover:!bg-black hover:!text-white"
          >
            View full team
          </CustomPillButton>
        </div>
      </div>
    </section>
  )
}
