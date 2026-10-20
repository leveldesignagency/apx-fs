/**
 * Display Title Case for UI headings: capitalise major words;
 * keep small words (the, on, of, and, ...) lowercase unless first or last.
 * Preserves known acronyms (CCTV, PAVA, EVAC, ...).
 */
const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "from",
  "in",
  "into",
  "nor",
  "of",
  "off",
  "on",
  "onto",
  "or",
  "over",
  "per",
  "than",
  "the",
  "to",
  "up",
  "upon",
  "via",
  "vs",
  "vs.",
  "with",
])

/** Whole-token acronyms / brands kept uppercase (case-insensitive match). */
const ACRONYMS = new Set([
  "anpr",
  "apx",
  "arc",
  "bafe",
  "bms",
  "bs",
  "cctv",
  "evac",
  "fia",
  "gdpr",
  "ip",
  "m&e",
  "nsi",
  "o&m",
  "pa/va",
  "pava",
  "ppm",
  "rams",
  "wc",
])

function capitaliseWord(raw: string): string {
  if (!raw) return raw

  // Preserve HTML entities as whole tokens (e.g. &amp;)
  if (raw.startsWith("&") && raw.endsWith(";")) return raw

  // Split leading/trailing punctuation so "systems?" / "(public" still title-case
  const match = raw.match(/^([^A-Za-z0-9]*)(.*?)([^A-Za-z0-9]*)$/)
  if (!match) return raw
  const [, lead, core, trail] = match
  if (!core) return raw

  const lower = core.toLowerCase()
  if (ACRONYMS.has(lower)) {
    return `${lead}${core.toUpperCase()}${trail}`
  }

  // Hyphenated compounds: Title-Case each part (Call-Out)
  if (core.includes("-")) {
    return `${lead}${core
      .split("-")
      .map((part) => capitaliseWord(part))
      .join("-")}${trail}`
  }

  // Slash compounds: Title/Case (rarely needed)
  if (core.includes("/") && !ACRONYMS.has(lower)) {
    return `${lead}${core
      .split("/")
      .map((part) => capitaliseWord(part))
      .join("/")}${trail}`
  }

  return `${lead}${core.charAt(0).toUpperCase()}${core.slice(1).toLowerCase()}${trail}`
}

/**
 * Title Case for display headings. Small words stay lowercase unless first/last.
 * Empty / whitespace-only strings are returned unchanged.
 */
export function toTitleCase(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return input

  const words = trimmed.split(/\s+/)
  const last = words.length - 1

  return words
    .map((word, i) => {
      const bare = word.replace(/^[^A-Za-z0-9&]+|[^A-Za-z0-9&;]+$/g, "")
      const lowerBare = bare.toLowerCase()
      const isEdge = i === 0 || i === last
      if (!isEdge && SMALL_WORDS.has(lowerBare)) {
        // Keep small word lowercase but preserve surrounding punctuation on `word`
        return word.replace(bare, lowerBare)
      }
      return capitaliseWord(word)
    })
    .join(" ")
}
