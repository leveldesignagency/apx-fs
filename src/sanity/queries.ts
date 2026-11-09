export const PROJECTS_LIST_QUERY = /* groq */ `
  *[_type == "project" && defined(slug.current)]
  | order(featured desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    sector,
    location,
    scope,
    systems,
    status,
    shortDescription,
    summary,
    challenge,
    solution,
    outcome,
    contractorOrClient,
    engagementNote,
    featured,
    heroImage,
    gallery[]{ _key, ..., alt },
    clientReview
  }
`

export const PROJECT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    sector,
    location,
    scope,
    systems,
    status,
    shortDescription,
    summary,
    challenge,
    solution,
    outcome,
    contractorOrClient,
    engagementNote,
    featured,
    heroImage,
    gallery[]{ _key, ..., alt },
    clientReview
  }
`

export const PROJECT_SLUGS_QUERY = /* groq */ `
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`
