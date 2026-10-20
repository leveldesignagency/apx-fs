// sniff CV bytes — don't trust whatever MIME the browser claims

export function cvBytesLookPlausible(buf: Buffer, filename: string): boolean {
  const name = filename.toLowerCase()
  if (buf.length < 5) return false

  // PDF: %PDF-
  if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) {
    return true
  }

  // ZIP container used by .docx (PK..)
  if (buf[0] === 0x50 && buf[1] === 0x4b) {
    return name.endsWith(".docx") || name.endsWith(".doc")
  }

  // Legacy OLE .doc often starts with D0 CF 11 E0
  if (buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) {
    return name.endsWith(".doc")
  }

  return false
}
