/**
 * Dedicated CCTV camera-type pages - slugs match `/services/cctv/camera-types/[slug]`.
 * Images: `public/cctv camera types/*.png`
 *
 * Retained as short guides linked from CCTV hubs. Confirm with client whether all six
 * should stay long-term (especially thermal-imaging) vs consolidating into the advice page.
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
    imageAlt: "Dome CCTV camera for discreet ceiling mounting, APX Fire & Security.",
    title: "Dome CCTV cameras",
    heroIntro:
      "Dome cameras house the lens behind a tinted cover, a common choice for retail, receptions and corridors where you want visible monitoring without an aggressive appearance. We specify and install dome cameras as part of a survey-led CCTV design across London and the Home Counties.",
    sections: [
      {
        heading: "Where dome cameras work best",
        body:
          "Indoor public areas, suspended ceilings and covered entrances often suit domes. For external use we select weather- and vandal-rated housings matched to mounting height and exposure. Camera type is chosen on survey, not as a one-size-fits-all kit.",
      },
      {
        heading: "Design and placement",
        body:
          "Effective installation is about height, field of view and avoiding backlight and glare. We survey sightlines and lighting so day and night footage stays usable, and match fixed or varifocal lenses to corridor width and target zones.",
      },
      {
        heading: "Recording, retention and privacy",
        body:
          "Cameras are only part of the system. Recording quality, time sync, user access and retention must support how you operate the site. We configure NVR (or other platform) paths, explain signage and lawful use at handover, and document settings for estates teams. The customer remains responsible for lawful CCTV operation under UK GDPR.",
      },
    ],
  },
  {
    slug: "bullet",
    file: "cctv-camera-bullett.png",
    label: "Bullet",
    imageAlt: "Bullet CCTV camera for wall-mounted surveillance, APX Fire & Security.",
    title: "Bullet CCTV cameras",
    heroIntro:
      "Bullet cameras mount on walls or parapets with a clear aiming profile. They are widely used for perimeters, alleys, loading bays and rear elevations where longer sightlines and weather exposure matter.",
    sections: [
      {
        heading: "Perimeter and external use",
        body:
          "Bullets are often chosen for fence lines, yards and approaches with a defined field of view. We match IP rating and mounting to the site, and plan cable containment so installations stay maintainable.",
      },
      {
        heading: "Optics and night performance",
        body:
          "Lens choice and infrared (IR) range determine usable detail at distance. We avoid over-specifying resolution without storage and bandwidth planning, and check scenes at night as well as by day before sign-off.",
      },
      {
        heading: "Integration with wider security",
        body:
          "Bullets frequently sit alongside intruder detection, access control and lighting. Where required we align naming, events and monitoring workflows so security teams get coherent video and alarms.",
      },
    ],
  },
  {
    slug: "pan-tilt",
    file: "cctv-camera-pan-tilt.png",
    label: "PTZ",
    imageAlt: "PTZ (pan, tilt and zoom) CCTV camera for steerable coverage, APX Fire & Security.",
    title: "PTZ CCTV cameras (pan, tilt and zoom)",
    heroIntro:
      "PTZ cameras, pan, tilt and zoom, let operators or presets sweep wide areas from a single mounting point. They suit car parks, courtyards and estates where fixed cameras alone would need many heads to achieve the same coverage.",
    sections: [
      {
        heading: "When PTZ is justified",
        body:
          "PTZ adds mechanical complexity and ongoing commissioning. We recommend it where active steering or preset tours genuinely reduce camera count, or where monitoring staff need to follow incidents. For many corridors and rooms, fixed dome or bullet cameras remain simpler and more predictable.",
      },
      {
        heading: "Presets, tours and privacy",
        body:
          "Well-configured PTZ relies on sensible preset positions, dwell times and privacy masking where views cross neighbouring property. We document tours, user permissions and maintenance expectations so the system stays reliable after handover.",
      },
      {
        heading: "Bandwidth and storage",
        body:
          "Moving streams can increase network load. We size switches and recording retention with realistic bitrate assumptions so recording and live view remain stable under load.",
      },
    ],
  },
  {
    slug: "wireless",
    file: "cctv-camera-wireless.png",
    label: "Wireless",
    imageAlt: "Wireless CCTV camera, APX Fire & Security, London and Home Counties.",
    title: "Wireless CCTV cameras",
    heroIntro:
      "Wireless (typically Wi-Fi or dedicated radio) cameras can reduce data cabling where containment is impractical. They are not cable-free installs: cameras still need a reliable power supply (mains, PoE nearby, or battery with charging cycles). We assess radio conditions, encryption and resilience on survey.",
    sections: [
      {
        heading: "Site survey and radio conditions",
        body:
          "Concrete, foil insulation and competing access points affect reliability. We survey signal paths and, where needed, prefer dedicated links over consumer Wi-Fi for critical views.",
      },
      {
        heading: "Power is still required",
        body:
          "Wireless does not mean no cabling. Most commercial and residential cameras need continuous power. Battery models introduce charging and maintenance cycles; mains or local PoE injectors must be safe and accessible. We clarify power and maintenance access at design stage so facilities teams are not surprised later.",
      },
      {
        heading: "Hardening and policy",
        body:
          "Encryption, firmware updates and strong credentials are essential. We align wireless segments with your network policy and document segmentation so CCTV traffic does not weaken wider IT security.",
      },
    ],
  },
  {
    slug: "infra-red",
    file: "cctv-camera-infra-red.png",
    label: "Infrared",
    imageAlt: "Infrared CCTV camera for night vision, APX Fire & Security.",
    title: "Infrared CCTV cameras",
    heroIntro:
      "Infrared (IR) cameras use supplementary infrared illumination for scenes with little visible light. They are common on rear elevations, yards and internal routes where lights are off out of hours but you still need usable imagery.",
    sections: [
      {
        heading: "IR range and hotspots",
        body:
          "IR performance depends on scene reflectivity and distance. We position cameras to minimise hot spots on nearby walls and avoid pointing IR at windows where reflections can wash out the image. Lens and IR pairing are checked on site, not only on datasheets.",
      },
      {
        heading: "Colour at night and hybrid modes",
        body:
          "Many modern sensors offer colour-in-low-light or white-light assist modes. We explain trade-offs for light spill and privacy, and configure schedules where appropriate so modes match operational hours.",
      },
      {
        heading: "Evidence and export",
        body:
          "For incidents, export paths matter. We train users on clipping footage and avoiding destructive recompression so material remains usable for insurers and authorities, within your lawful-use responsibilities under UK GDPR.",
      },
    ],
  },
  {
    slug: "thermal-imaging",
    file: "cctv-camera-thermal-imaging.png",
    label: "Thermal",
    imageAlt: "Thermal imaging CCTV for detection, APX Fire & Security.",
    title: "Thermal imaging CCTV",
    heroIntro:
      "Thermal sensors detect heat contrast and can support perimeter detection in darkness, fog and glare-heavy scenes where visible cameras struggle. This is a specialised option, suitability is confirmed on survey for sites that genuinely need thermal detection alongside a clear alarm-response design.",
    sections: [
      {
        heading: "Detection vs identification",
        body:
          "Thermal excels at detection and tracking; identifying individuals usually still needs visible-light coverage elsewhere. We set expectations so analytics rules and response procedures match what each sensor can prove.",
      },
      {
        heading: "Calibration and environment",
        body:
          "Temperature contrast changes with season and weather. We plan mounting height, scene width and analytics thresholds with maintenance in mind, including periodic checks where required by the manufacturer or insurer.",
      },
      {
        heading: "Integration and governance",
        body:
          "Thermal feeds can integrate with VMS and monitoring workflows. We document zones, privacy considerations and retention alongside your wider CCTV policy so use stays lawful and proportionate. Confirm with APX whether thermal is appropriate for your project before specifying it.",
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
