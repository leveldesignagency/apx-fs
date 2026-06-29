"use client"

import { useEffect, useMemo, useState } from "react"
import { FS_PROJECTS_CONTENT_MAX, FS_PROJECTS_SECTION_PX } from "@/lib/fsProjectsLayout"
import {
  buildSocialShareTargets,
  resolveClientShareUrl,
  toAbsoluteUrl,
  type SocialSharePayload,
} from "@/lib/socialShare"
import { SocialShareCheckIcon, SocialShareIcon, SocialShareLinkIcon } from "@/components/news/SocialShareIcons"

type NewsArticleShareBannerProps = Omit<SocialSharePayload, "url"> & {
  /** Server-rendered fallback when window is unavailable */
  fallbackUrl: string
  siteOrigin: string
}

export function NewsArticleShareBanner({
  title,
  description,
  imageUrl,
  fallbackUrl,
  siteOrigin,
}: NewsArticleShareBannerProps) {
  const [shareUrl, setShareUrl] = useState(fallbackUrl)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setShareUrl(resolveClientShareUrl(fallbackUrl))
  }, [fallbackUrl])

  const payload = useMemo(
    (): SocialSharePayload => ({
      url: shareUrl,
      title,
      description,
      imageUrl: imageUrl ? toAbsoluteUrl(imageUrl, siteOrigin) : undefined,
    }),
    [description, imageUrl, shareUrl, siteOrigin, title],
  )

  const targets = useMemo(() => buildSocialShareTargets(payload), [payload])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt("Copy this link:", shareUrl)
    }
  }

  return (
    <div className={`news-article-share ${FS_PROJECTS_SECTION_PX} border-t border-black/10 bg-[#f0f0f0]`}>
      <div className={`${FS_PROJECTS_CONTENT_MAX} py-6 md:py-7`}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/55">Share this article</p>
            <p className="mt-1 text-sm text-black/65">Post the headline and link to your network.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
            {targets.map((target) => (
              <a
                key={target.platform}
                href={target.href}
                target={target.openInNewTab ? "_blank" : undefined}
                rel={target.openInNewTab ? "noopener noreferrer" : undefined}
                className="news-article-share__btn"
                aria-label={target.label}
                title={target.label}
              >
                <SocialShareIcon platform={target.platform} className="h-5 w-5" />
              </a>
            ))}
            <button
              type="button"
              onClick={copyLink}
              className="news-article-share__btn"
              aria-label={copied ? "Link copied" : "Copy article link"}
              title={copied ? "Link copied" : "Copy article link"}
            >
              {copied ? (
                <SocialShareCheckIcon className="h-5 w-5" />
              ) : (
                <SocialShareLinkIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
