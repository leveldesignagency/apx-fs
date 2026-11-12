import { createClient } from "@sanity/client"
import { apiVersion, dataset, projectId } from "./env"

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // Skip the Sanity CDN so revalidation after Studio publish/delete sees fresh data.
  useCdn: false,
})
