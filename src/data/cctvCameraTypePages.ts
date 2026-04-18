/**
 * Dedicated CCTV camera-type pages - slugs match `/services/cctv/camera-types/[slug]`.
 * Images: `public/cctv camera types/*.png`
 */
export type CctvCameraTypeSection = {
  heading: string
  body: string
}

export type CctvCameraTypePage = {
  slug: string
  file: string
  label: string
  imageAlt: string
  title: string
  heroIntro: string
  sections: CctvCameraTypeSection[]
}

export const CCTV_CAMERA_TYPE_PAGES: CctvCameraTypePage[] = [
  {
    slug: "dome",
    file: "cctv-camera-dome.png",
    label: "Dome",
    imageAlt:
      "Dome CCTV camera for discreet ceiling mounting - APX Fire and Security, London and South East.",
    title: "Dome CCTV cameras",
    heroIntro:
      "Dome cameras house the lens behind a tinted cover, making them a popular choice for retail, receptions and corridors where you want visible security without an aggressive appearance. We specify and install dome systems aligned to BS EN 62676 and your coverage plan across London and the Home Counties.",
    sections: [
      {
        heading: "Where dome cameras work best",
        body:
          "Indoor public areas, ceilings with suspended grids, and covered entrances often suit domes: the form factor blends with interior design while still signalling that the space is monitored. For external use we select vandal-resistant rated housings and IP-rated models matched to your exposure and mounting height.",
      },
      {
        heading: "Design and placement",
        body:
          "Effective dome installation is about height, field of view and avoiding backlight and glare. We survey sightlines, reflectance from glass and signage, and coordinate with lighting so night-time footage stays usable. Lens choice (fixed or varifocal) is matched to corridor width and target zones rather than generic defaults.",
      },
      {
        heading: "Recording, retention and compliance",
        body:
          "Domes are only part of the system: recording quality, time synchronisation, user access and retention must support operational use and GDPR. We configure NVR or cloud paths with role-based access, explain signage and lawful use at handover, and document settings for estates and facilities teams.",
      },
    ],
  },
  {
    slug: "bullet",
    file: "cctv-camera-bullett.png",
    label: "Bullet",
    imageAlt: "Bullet CCTV camera for wall-mounted surveillance - APX Fire and Security.",
    title: "Bullet CCTV cameras",
    heroIntro:
      "Bullet cameras mount on walls or parapets and typically offer a clear deterrent profile with flexible aiming. They are widely used for perimeters, alleys, loading bays and rear elevations where long sightlines and weather exposure matter.",
    sections: [
      {
        heading: "Perimeter and external use",
        body:
          "Bullets are often chosen when you need to cover a fence line, yard or approach with a defined field of view. We match IP rating, heater options and sun shields to the site, and coordinate mounting with structural fixing and cable containment so installations stay maintainable.",
      },
      {
        heading: "Optics and night performance",
        body:
          "IR range and lens selection determine whether you capture usable detail at distance. We avoid over-specifying resolution without storage and bandwidth planning, and we test scenes at night as well as by day so motion blur and flare are understood before sign-off.",
      },
      {
        heading: "Integration with wider security",
        body:
          "Bullets frequently sit alongside intruder detection, access control and lighting. Where required we align inputs, naming and monitoring workflows so security teams get coherent alarms and video, not isolated silos.",
      },
    ],
  },
  {
    slug: "pan-tilt",
    file: "cctv-camera-pan-tilt.png",
    label: "Pan / tilt",
    imageAlt: "Pan-tilt CCTV camera for steerable coverage - APX Fire and Security.",
    title: "Pan-tilt CCTV cameras",
    heroIntro:
      "Pan-tilt (and pan-tilt-zoom) units let operators or presets sweep wide areas from a single mounting point. They suit car parks, courtyards and estates where static cameras would need many heads to achieve the same coverage.",
    sections: [
      {
        heading: "When PTZ is justified",
        body:
          "PTZ adds mechanical complexity and ongoing commissioning: we recommend it where active steering or preset tours genuinely reduce camera count or where monitoring staff need to follow incidents. For many internal corridors, fixed domes remain simpler and more predictable.",
      },
      {
        heading: "Presets, tours and limits",
        body:
          "Well-configured PTZ relies on sensible preset positions, dwell times and privacy masking where lines cross neighbouring property. We document tours, user permissions and maintenance expectations so the system stays reliable after handover.",
      },
      {
        heading: "Bandwidth and storage",
        body:
          "Moving streams can spike network load; we size switches and recording retention with realistic bitrate assumptions and failover behaviour so the VMS remains stable under load.",
      },
    ],
  },
  {
    slug: "wireless",
    file: "cctv-camera-wireless.png",
    label: "Wireless",
    imageAlt: "Wireless CCTV camera - APX Fire and Security, London and Home Counties.",
    title: "Wireless CCTV cameras",
    heroIntro:
      "Wireless (often Wi-Fi bridged) cameras can reduce cabling where containment is impractical or where rapid deployment is needed. We assess spectrum contention, power supply, encryption and resilience - wireless is never a shortcut on security design.",
    sections: [
      {
        heading: "Site survey and radio conditions",
        body:
          "Concrete, foil insulation and competing access points affect reliability. We survey signal paths, plan channel use and, where needed, prefer dedicated point-to-point links over ad hoc consumer Wi-Fi for critical views.",
      },
      {
        heading: "Power and maintenance",
        body:
          "Wireless still needs power: battery models introduce charging cycles; mains or PoE-derived supplies must be safe and accessible. We clarify maintenance access and expected battery life so facilities teams are not surprised in operation.",
      },
      {
        heading: "Hardening and policy",
        body:
          "Encryption, firmware updates and strong credentials are non-negotiable. We align wireless segments with your network policy and document segmentation so CCTV traffic does not weaken wider IT security.",
      },
    ],
  },
  {
    slug: "infra-red",
    file: "cctv-camera-infra-red.png",
    label: "Infra-red",
    imageAlt: "Infra-red CCTV camera for night vision - APX Fire and Security.",
    title: "Infra-red CCTV cameras",
    heroIntro:
      "IR-enhanced cameras use supplementary infrared illumination for scenes with little visible light. They are common on rear elevations, yards and internal routes where lights are off out of hours but you still need identifiable imagery.",
    sections: [
      {
        heading: "IR range and hotspots",
        body:
          "IR performance depends on scene reflectivity and distance. We position cameras to minimise hot spots on nearby walls and avoid pointing IR at windows where reflections blind the sensor. Lens and IR pairing are checked on site, not only on datasheets.",
      },
      {
        heading: "Colour at night and hybrid modes",
        body:
          "Many modern sensors offer colour-in-low-light or white-light assist modes. We explain trade-offs for light pollution and privacy, and configure schedules where appropriate so modes match your operational hours.",
      },
      {
        heading: "Evidence and export",
        body:
          "For incidents, export paths and chain-of-custody matter. We train users on clipping footage, metadata and avoiding destructive recompression so material remains usable for insurers and authorities.",
      },
    ],
  },
  {
    slug: "thermal-imaging",
    file: "cctv-camera-thermal-imaging.png",
    label: "Thermal imaging",
    imageAlt: "Thermal imaging CCTV for detection - APX Fire and Security, South East England.",
    title: "Thermal imaging CCTV",
    heroIntro:
      "Thermal sensors detect heat contrast and can support perimeter detection in darkness, fog and glare-heavy scenes where visible cameras struggle. They are used in critical infrastructure, long perimeters and some high-security estates - always alongside a clear alarm-response design.",
    sections: [
      {
        heading: "Detection vs identification",
        body:
          "Thermal excels at detection and tracking; identification of individuals usually requires visible-light coverage elsewhere. We set expectations with stakeholders so analytics rules and response procedures match what each sensor can prove.",
      },
      {
        heading: "Calibration and environment",
        body:
          "Temperature contrast changes with season and weather. We plan mounting height, scene width and analytics thresholds with maintenance in mind, including periodic checks where required by the manufacturer or insurer.",
      },
      {
        heading: "Integration and governance",
        body:
          "Thermal feeds often integrate with VMS and PSIM-style workflows. We document zones, privacy considerations and retention alongside your wider CCTV policy so use stays lawful and proportionate.",
      },
    ],
  },
]

export const CCTV_CAMERA_TYPES_FOLDER = "/cctv%20camera%20types" as const

/** Hero quick-nav pills on `/services/cctv/camera-types/[slug]` - jump between camera-type guides. */
export const CCTV_CAMERA_TYPE_QUICK_LINKS = CCTV_CAMERA_TYPE_PAGES.map((p) => ({
  href: `/services/cctv/camera-types/${p.slug}`,
  label: p.label,
}))

export function getCctvCameraTypePage(slug: string): CctvCameraTypePage | undefined {
  return CCTV_CAMERA_TYPE_PAGES.find((p) => p.slug === slug)
}

export function getAllCctvCameraTypeSlugs(): string[] {
  return CCTV_CAMERA_TYPE_PAGES.map((p) => p.slug)
}
