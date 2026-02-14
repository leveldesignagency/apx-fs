"use client";

import { useRef, useEffect, useState } from "react";

const HOVER_TEXT_TAGS = "p, span, h1, h2, h3, h4, h5, h6, li, td, th, label, figcaption, caption, blockquote";

/** Section IDs / selectors we care about for cursor behaviour (header, hero, services, etc.) */
export type CursorSection = "header" | "hero" | "services" | "services-drawer" | "services-benefits" | "logo-marquee" | "projects" | "why-mep" | "about" | "testimonials" | "contact" | null;

function isHoverTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof Element)) return false;
  const node = el as HTMLElement;
  const isInteractive =
    node.tagName === "A" ||
    node.tagName === "BUTTON" ||
    node.getAttribute("role") === "button" ||
    node.classList.contains("cursor-pointer") ||
    node.closest("a, button, [role='button'], .cursor-pointer") !== null;
  const isText = node.closest(HOVER_TEXT_TAGS) !== null;
  return isInteractive || isText;
}

function getSectionFromElement(el: EventTarget | null): CursorSection {
  if (!el || !(el instanceof Element)) return null;
  const node = el as HTMLElement;
  const header = node.closest("header");
  if (header) return "header";
  const section = node.closest("section[id]");
  if (section && section.id) return section.id as CursorSection;
  return null;
}

export default function CustomCursor() {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [section, setSection] = useState<CursorSection>(null);

  useEffect(() => {
    document.documentElement.classList.add("curzr-big-circle-active");
    return () => document.documentElement.classList.remove("curzr-big-circle-active");
  }, []);

  useEffect(() => {
    const circle = circleRef.current;
    const dot = dotRef.current;
    if (!circle || !dot) return;

    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const hover = isHoverTarget(e.target);
      const nextSection = getSectionFromElement(e.target);
      setIsHover(hover);
      setSection(nextSection);
      // Circle and dot are offset in CSS so their center is at (0,0); translate to pointer
      circle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    const click = () => {
      const t = circle.style.transform;
      if (t) {
        circle.style.transform = `${t} scale(0.75)`;
        setTimeout(() => {
          circle.style.transform = t.replace(/\s*scale\(0\.75\)\s*$/, "");
        }, 35);
      }
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("click", click);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("click", click);
    };
  }, []);

  const sectionClass = section ? `apx-cursor-big-circle--${section}` : "";
  return (
    <div
      className={`apx-cursor-big-circle${isHover ? " apx-cursor-big-circle--hover" : ""}${sectionClass ? ` ${sectionClass}` : ""}`}
      aria-hidden
      hidden={!visible}
      style={{ opacity: visible ? 1 : 0 }}
      data-section={section ?? undefined}
    >
      <div ref={circleRef} className="apx-cursor-big-circle__circle" />
      <div ref={dotRef} className="apx-cursor-big-circle__dot" />
    </div>
  );
}
