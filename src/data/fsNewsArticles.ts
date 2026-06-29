export type NewsCategory =
  | "company-news"
  | "fire-alarm-systems"
  | "cctv-systems"
  | "access-control-systems"
  | "video-door-entry-systems"
  | "intruder-alarm-systems"
  | "disabled-refuge"
  | "products"

export type FsNewsArticleInlineLink = {
  paragraphIndex: number
  linkText: string
  href: string
}

export type FsNewsArticleQuote = {
  intro?: string
  paragraphs: string[]
  author: string
  role: string
}

export type FsNewsArticle = {
  slug: string
  title: string
  /** ISO date YYYY-MM-DD for sorting */
  publishedAt: string
  /** Display date e.g. 10th July 2023 */
  publishedLabel: string
  excerpt: string
  body: string[]
  inlineLinks?: FsNewsArticleInlineLink[]
  quote?: FsNewsArticleQuote
  imageSrc: string
  imageAlt: string
  categories: NewsCategory[]
}

export const NEWS_HUB_PATH = "/news" as const

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  "company-news": "Company news",
  "fire-alarm-systems": "Fire alarm systems",
  "cctv-systems": "CCTV systems",
  "access-control-systems": "Access control",
  "video-door-entry-systems": "Video door entry",
  "intruder-alarm-systems": "Intruder alarms",
  "disabled-refuge": "Disabled refuge",
  products: "Products & technology",
}

export const FS_NEWS_ARTICLES: FsNewsArticle[] = [
  {
    slug: "kings-academy-intruder-alarm-systems",
    title: "Intruder alarms systems for King's Academy",
    publishedAt: "2023-07-10",
    publishedLabel: "10th July 2023",
    excerpt:
      "We are delighted to mark the opening of the new King's Academy in London, part of King's College Hospital NHS Foundation Trust.",
    body: [
      "We are delighted to mark the opening of the new King's Academy in London, which is part of the King's College Hospital NHS Foundation Trust.",
      "APX Fire & Security were responsible for installing the intruder alarm security systems within the new training academy for nurses, midwives and allied healthcare professionals (AHPs).",
      "Her Royal Highness The Duchess of Edinburgh officially opened the brand-new King's Academy on the same day that the NHS celebrated its 75th anniversary.",
      "King's Academy provides dedicated simulation, teaching and conference rooms, as well as educational facilities, across a floor space of 820 m². It will be used by many of the Trust's 8,000 nurses, midwives and AHPs, and also be used by healthcare professionals from other parts of London and the south east.",
      "Dedicated debriefing rooms will also be used for expert staff and teams to review the activity undertaken, exploring performance and delivering education, so creating a completely safe environment to learn in.",
      "Separate teaching rooms will enable staff to practice their technical skills for procedures such as catheterisation and IV cannulation. The facility will also deliver in-person and online training and education opportunities for NHS staff from other Trusts, plus international nurses and organisations.",
      "The facility has been funded by King's Commercial Services, which works in the UK and internationally to generate funds for the Trust to support staff and improve care for NHS patients.",
    ],
    quote: {
      intro: "Professor Clive Kay, Chief Executive, said:",
      paragraphs: [
        "The King's Academy is a really exciting new project for the Trust, so we were delighted that Her Royal Highness was able to visit the new facility, and meet and talk to staff. The fact we were able to open the new facility on the NHS' 75th birthday made the day extra special, and we are looking forward to using the new facility to help train future generations of healthcare professionals, both at King's and further afield.",
      ],
      author: "Professor Clive Kay",
      role: "Chief Executive",
    },
    imageSrc: "/news/kings-academy-intruder-alarm-systems.jpg",
    imageAlt: "King's Academy security systems NHS",
    categories: ["intruder-alarm-systems", "company-news"],
  },
  {
    slug: "lewisham-council-bampton-estate",
    title: "Security systems installation for Lewisham Council",
    publishedAt: "2023-05-30",
    publishedLabel: "30th May 2023",
    excerpt:
      "APX Fire & Security has been chosen to install security and access control systems at the Bampton Estate redevelopment for Lewisham Council.",
    body: [
      "APX Fire & Security is pleased to announce we have been chosen to install the security and access control systems at the Bampton Estate redevelopment project for Lewisham Council in London. Working in partnership with Guildmore main contractors and BFT Electrical and Mechanical, we will be installing the fire alarm systems, video entry systems, access control and CCTV systems.",
      "The new social homes will provide much needed, high quality homes to people who are over 55 years of age. The building will be three to five storeys in height, comprising 39 one-bed self-contained flats. The project will include landscaping, a new ball court, and a communal courtyard which looks out onto Bampton Green. The red-brick, U-shaped building will complement the existing homes and spaces in and around Bampton Estate.",
      "For more information please read the article on the Lewisham Council website.",
      "The project will be starting in a couple of weeks and we will keep you updated on its progress.",
    ],
    inlineLinks: [
      {
        paragraphIndex: 2,
        linkText: "the Lewisham Council website",
        href: "https://lewisham.gov.uk/inmyarea/regeneration/building-affordable-homes/bampton-estate",
      },
    ],
    imageSrc: "/news/lewisham-council-bampton-estate.jpg",
    imageAlt: "Security systems installation at Bampton Estate Lewisham Council",
    categories: [
      "company-news",
      "fire-alarm-systems",
      "cctv-systems",
      "access-control-systems",
      "video-door-entry-systems",
    ],
  },
  {
    slug: "smart-building-127-charing-cross-road",
    title: "APX Fire & Security to install ‘Smart Building’ security solution",
    publishedAt: "2023-04-28",
    publishedLabel: "28th April 2023",
    excerpt:
      "APX Fire & Security has been appointed to install the fire and security systems at 127 Charing Cross Road WC2, working in partnership with LJJ Electrical and Mechanical Ltd.",
    body: [
      "APX Fire & Security is pleased to announce that we have been appointed to install the fire and security systems at 127 Charing Cross Road WC2, working in partnership with LJJ Electrical and Mechanical Ltd.",
      "APX Fire & Security will be installing a ‘smart building’ security solution which includes access control, CCTV system, fire alarm system, refuge system and intruder alarms.",
      "The circa 40,000 sq.ft property has consent to extend to around 60,000 sq.ft with retail and leisure facilities on the ground and lower ground levels and a further 6 floors of high specification offices above. The refurbishment and extensions to the existing building includes three additional floors at roof level and rooftop plant enclosure.",
      "The freehold site occupies a prime location close to Tottenham Court Road underground station.",
      "To learn more about this project please check back soon as we will be posting photos of our work as it is carried out.",
    ],
    imageSrc: "/news/smart-building-127-charing-cross-road.jpg",
    imageAlt: "Smart building security solution 127 Charing Cross Road",
    categories: [
      "company-news",
      "fire-alarm-systems",
      "cctv-systems",
      "access-control-systems",
      "intruder-alarm-systems",
      "disabled-refuge",
    ],
  },
  {
    slug: "portobello-square-wornington-green",
    title: "APX Fire & Security chosen for next phase of Portobello Square",
    publishedAt: "2023-04-18",
    publishedLabel: "18th April 2023",
    excerpt:
      "APX Fire & Security has been chosen to install Fire Alarm, Disabled Refuge and CCTV systems for the next phase of the Portobello Square regeneration at Wornington Green.",
    body: [
      "APX Fire & Security is proud to announce it has been chosen to install the Fire Alarm systems, Disabled Refuge and CCTV Systems for the next phase of the Portobello Square regeneration at the Wornington Green estate in North Kensington.",
      "Once complete, the Portobello Square regeneration project will deliver around 1,000 new homes, with no loss of social housing, new commercial and community spaces and 2.3 acres of new public park. This phase of the regeneration will deliver 230 new homes, including 108 homes for social rent alongside 11 homes for shared ownership.",
      "The new neighbourhood will have no discernible difference between the private homes and affordable homes from the outside. The regeneration will also deliver a host of new community facilities and dramatically improved public realm and green space.",
      "As well as providing regeneration, the project will offer employment, training and social value opportunities which will enhance the lives of local people long after the construction works have completed. These will include new apprenticeship positions, support for job seekers, new community and youth initiatives as well as more investment in the local area.",
    ],
    imageSrc: "/news/portobello-square-wornington-green.jpg",
    imageAlt: "Security systems installation for Wornington Green",
    categories: ["company-news", "fire-alarm-systems", "cctv-systems", "disabled-refuge"],
  },
  {
    slug: "custom-screen-layouts-xts-monitors",
    title: "Custom Screen Layouts for XTS Monitors",
    publishedAt: "2023-03-29",
    publishedLabel: "29th March 2023",
    excerpt:
      "The 7″ XTS from Came BPT lets installers customise video door entry screens with custom layouts, backgrounds and function buttons on every XTS IP monitor.",
    body: [
      "There are a number of quality Video Door Entry Monitors available, however the one we are using a lot of at the moment is the 7″ XTS from Came BPT. The XTS graphic user interface (GUI) software will allow the system installer to customise the screen like never before. This unique feature is available on all XTS IP monitors.",
      "Home and operational screens can be personalised with any background image, custom buttons and layout design imaginable. Unused function buttons can be removed to simplify the user experience, background images and custom button graphic sets can be imported to make each installation truly unique.",
      "Function buttons can be assigned to any action and any image can be used as a function. Load in an image of the actual entrance and press that image to activate the camera preview. Change the page order and layout to suit the installation when swiping between screens. Design schemes can be applied to individual monitors, or a shared scheme can be applied to a whole building incorporating logos or complementary colour palettes. Give each floor of a building a unique design, offer the penthouse an exclusive interface with additional features, the possibilities are endless with XTS.",
      "Schemes (including function button operations) can be pre-designed and saved to be imported later. Contact details or maintenance company details can be set as the background image in industrial or commercial settings. The only limitation of XTS is your creativity.",
    ],
    imageSrc: "/news/custom-screen-layouts-xts-monitors.jpg",
    imageAlt: "XTS video door entry monitors",
    categories: ["video-door-entry-systems"],
  },
]

export function getNewsArticleBySlug(slug: string): FsNewsArticle | undefined {
  return FS_NEWS_ARTICLES.find((article) => article.slug === slug)
}

export function getLatestNewsArticle(): FsNewsArticle {
  return [...FS_NEWS_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0]
}

export function getNewsArticlesSorted(): FsNewsArticle[] {
  return [...FS_NEWS_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}
