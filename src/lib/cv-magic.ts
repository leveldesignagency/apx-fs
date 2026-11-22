// Sniff CV bytes — don't trust whatever MIME the browser claims.

type Bytes = Uint8Array

function hasPdfSignature(buf: Bytes): boolean {
  // Most PDFs start with %PDF-; some exporters prepend junk/BOM.
  const end = Math.min(buf.length, 1024)
  for (let i = 0; i < end - 4; i++) {
    if (
      buf[i] === 0x25 &&
      buf[i + 1] === 0x50 &&
      buf[i + 2] === 0x44 &&
      buf[i + 3] === 0x46 &&
      buf[i + 4] === 0x2d
    ) {
      return true
    }
  }
  return false
}

function hasZipSignature(buf: Bytes): boolean {
  // .docx is a ZIP (PK..)
  return buf.length >= 2 && buf[0] === 0x50 && buf[1] === 0x4b
}

function hasOleSignature(buf: Bytes): boolean {
  // Legacy .doc often starts with D0 CF 11 E0
  return buf.length >= 4 && buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0
}

export function cvBytesLookPlausible(buf: Bytes | Buffer, filename: string): boolean {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf)
  const name = filename.toLowerCase().trim()
  if (bytes.length < 5) return false

  if (hasPdfSignature(bytes)) {
    // Prefer .pdf, but accept mislabeled exports that are still PDF bytes.
    return name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx") || !name.includes(".")
  }

  if (hasZipSignature(bytes)) {
    return name.endsWith(".docx") || name.endsWith(".doc")
  }

  if (hasOleSignature(bytes)) {
    return name.endsWith(".doc")
  }

  return false
}

/** Browser-side check before marking the CV ready. */
export async function cvFileLooksPlausibleInBrowser(file: File): Promise<boolean> {
  const name = file.name.toLowerCase()
  const extOk = name.endsWith(".pdf") || name.endsWith(".doc") || name.endsWith(".docx")
  if (!extOk) return false
  try {
    const slice = file.slice(0, 1024)
    const ab = await slice.arrayBuffer()
    return cvBytesLookPlausible(new Uint8Array(ab), file.name)
  } catch {
    // If we cannot sniff in-browser, allow and let the API decide.
    return true
  }
}
