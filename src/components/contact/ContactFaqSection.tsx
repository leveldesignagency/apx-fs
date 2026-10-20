"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { CONTACT_FAQ_ITEMS, type ContactFaqItem } from "@/lib/contact-faq-content"
import { cn } from "@/lib/utils"

type Props = {
  items?: ContactFaqItem[]
}

function FaqColumn({
  items,
  columnIndex,
  openKey,
  onToggle,
}: {
  items: ContactFaqItem[]
  columnIndex: number
  openKey: string | null
  onToggle: (key: string) => void
}) {
  return (
    <div className="contact-faq__col min-w-0">
      <div className="contact-faq__accent" aria-hidden />
      <ul className="contact-faq__list m-0 list-none p-0">
        {items.map((item, i) => {
          const key = `${columnIndex}-${i}`
          const isOpen = openKey === key
          const panelId = `contact-faq-panel-${key}`
          const buttonId = `contact-faq-trigger-${key}`
          return (
            <li key={item.question} className="contact-faq__item">
              <button
                id={buttonId}
                type="button"
                className="contact-faq__trigger"
                onClick={() => onToggle(key)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span
                  className={cn("contact-faq__icon", isOpen && "contact-faq__icon--open")}
                  aria-hidden
                >
                  {isOpen ? (
                    <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  )}
                </span>
                <span className="contact-faq__question">{item.question}</span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
                aria-hidden={!isOpen}
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="contact-faq__answer"
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Contact page FAQ - two-column accordion (reference layout, APX black/white).
 */
export function ContactFaqSection({ items = CONTACT_FAQ_ITEMS }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null)
  const mid = Math.ceil(items.length / 2)
  const left = items.slice(0, mid)
  const right = items.slice(mid)

  return (
    <section className="contact-faq" aria-labelledby="contact-faq-heading">
      <div className="site-container">
        <header className="contact-faq__header">
          <h2 id="contact-faq-heading" className="contact-faq__title font-title">
            Looking for answers?
          </h2>
          <p className="contact-faq__subtitle">
            Common questions about surveys, quotes, coverage and getting in touch with APX Fire &amp; Security.
          </p>
        </header>

        <div className="contact-faq__grid">
          <FaqColumn
            items={left}
            columnIndex={0}
            openKey={openKey}
            onToggle={(key) => setOpenKey((v) => (v === key ? null : key))}
          />
          <FaqColumn
            items={right}
            columnIndex={1}
            openKey={openKey}
            onToggle={(key) => setOpenKey((v) => (v === key ? null : key))}
          />
        </div>

        <p className="contact-faq__cta">
          Still have a question?{" "}
          <a href="tel:02083032280" className="contact-faq__cta-link">
            Call 020 8303 2280
          </a>{" "}
          or{" "}
          <Link href="#contact" className="contact-faq__cta-link">
            send us a message
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
