/**
 * Public team roster for About + /team.
 * Add portrait paths to `image` when media kit photos are ready.
 * Roles stay light until the client confirms job titles.
 */
export type FsTeamMember = {
  id: string
  name: string
  role: string
  initials: string
  /** Featured on the About page (max 5). */
  featured?: boolean
  /** Optional portrait under /public, e.g. "/team/richard-miller.jpg" */
  image?: string
}

export const FS_TEAM_MEMBERS: FsTeamMember[] = [
  {
    id: "richard-miller",
    name: "Richard Miller",
    role: "APX Fire & Security",
    initials: "RM",
    featured: true,
  },
  {
    id: "pete-rapley",
    name: "Pete Rapley",
    role: "APX Fire & Security",
    initials: "PR",
    featured: true,
  },
  {
    id: "katie-fleet",
    name: "Katie Fleet",
    role: "APX Fire & Security",
    initials: "KF",
    featured: true,
  },
  {
    id: "darren-eyers",
    name: "Darren Eyers",
    role: "APX Fire & Security",
    initials: "DE",
    featured: true,
  },
  {
    id: "fiona-temple",
    name: "Fiona Temple",
    role: "APX Fire & Security",
    initials: "FT",
    featured: true,
  },
  { id: "glen-walker", name: "Glen Walker", role: "APX Fire & Security", initials: "GW" },
  { id: "karl-tart", name: "Karl Tart", role: "APX Fire & Security", initials: "KT" },
  { id: "laurence-james", name: "Laurence James", role: "APX Fire & Security", initials: "LJ" },
  { id: "martyn-armfield", name: "Martyn Armfield", role: "APX Fire & Security", initials: "MA" },
  { id: "mike-gorman", name: "Mike Gorman", role: "APX Fire & Security", initials: "MG" },
  { id: "pat-sheehan", name: "Pat Sheehan", role: "APX Fire & Security", initials: "PS" },
  { id: "paul-farrer", name: "Paul Farrer", role: "APX Fire & Security", initials: "PF" },
  { id: "rob-lynch", name: "Rob Lynch", role: "APX Fire & Security", initials: "RL" },
  { id: "tracey-harrison", name: "Tracey Harrison", role: "APX Fire & Security", initials: "TH" },
  { id: "chris-hankin", name: "Chris Hankin", role: "APX Fire & Security", initials: "CH" },
]

export const FS_FEATURED_TEAM = FS_TEAM_MEMBERS.filter((m) => m.featured).slice(0, 5)
