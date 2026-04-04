"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const HOVER_TEXT_TAGS =
  "p, span, h1, h2, h3, h4, h5, h6, li, td, th, label, figcaption, caption, blockquote";

/** Section IDs / selectors for optional styling hooks */
export type CursorSection =
  | "header"
  | "hero"
  | "services"
  | "services-drawer"
  | "services-benefits"
  | "logo-marquee"
  | "projects"
  | "why-mep"
  | "about"
  | "testimonials"
  | "contact"
  | null;

export type CursorSurface = "image" | "dark" | "light";

function parseCssColor(bg: string): { r: number; g: number; b: number; a: number } | null {
  const m = bg.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+)\s*)?\)/);
  if (!m) return null;
  return {
    r: Number(m[1]),
    g: Number(m[2]),
    b: Number(m[3]),
    a: m[4] !== undefined ? Number(m[4]) : 1,
  };
}

function relativeLuminance(r: number, g: number, b: number): number {
  const lin = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0]! + 0.7152 * lin[1]! + 0.0722 * lin[2]!;
}

/** Approximate perceived background lightness (0 = black, 1 = white) under the cursor */
function luminanceFromBackground(el: Element | null): number {
  let node: HTMLElement | null = el as HTMLElement;
  while (node && node !== document.documentElement) {
    const bg = getComputedStyle(node).backgroundColor;
    const p = parseCssColor(bg);
    if (p && p.a >= 0.06) {
      let lum = relativeLuminance(p.r, p.g, p.b);
      if (p.a < 0.98) {
        lum = lum * p.a + (1 - p.a) * 1;
      }
      return lum;
    }
    node = node.parentElement;
  }
  return 1;
}

function isOverImage(clientX: number, clientY: number): boolean {
  const stack = document.elementsFromPoint(clientX, clientY);
  for (const node of stack) {
    if (!(node instanceof Element)) continue;
    if (node.closest("[data-cursor-surface-ignore]")) continue;
    const tag = node.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS") return true;
    if (tag === "SVG" && node.getAttribute("role") === "img") return true;
  }
  return false;
}

function isInteractiveTarget(el: EventTarget | null): boolean {
  if (!el || !(el instanceof Element)) return false;
  const node = el as HTMLElement;
  return (
    node.tagName === "A" ||
    node.tagName === "BUTTON" ||
    node.getAttribute("role") === "button" ||
    node.tagName === "INPUT" ||
    node.tagName === "TEXTAREA" ||
    node.tagName === "SELECT" ||
    node.classList.contains("cursor-pointer") ||
    node.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer") !== null
  );
}

function isTextMagnify(el: EventTarget | null, clientX: number, clientY: number): boolean {
  if (!el || !(el instanceof Element)) return false;
  if (isOverImage(clientX, clientY)) return false;
  if (isInteractiveTarget(el)) return false;
  const n = el as HTMLElement;
  return n.closest(HOVER_TEXT_TAGS) !== null || n.closest(".section-label") !== null;
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

function getSurface(el: Element, clientX: number, clientY: number): CursorSurface {
  if (isOverImage(clientX, clientY)) return "image";
  if (el.closest("header")) return "dark";
  return luminanceFromBackground(el) < 0.34 ? "dark" : "light";
}

const TEXT_MAG_DOT_SCALE = 2.25;

export default function CustomCursor() {
  const circleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [useFinePointer, setUseFinePointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pack, setPack] = useState<{
    surface: CursorSurface;
    hover: boolean;
    textMag: boolean;
    section: CursorSection;
  }>({
    surface: "light",
    hover: false,
    textMag: false,
    section: null,
  });

  useEffect(() => {
    setMounted(true);
    setUseFinePointer(typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || !useFinePointer) return;
    document.documentElement.classList.add("curzr-big-circle-active");
    return () => document.documentElement.classList.remove("curzr-big-circle-active");
  }, [mounted, useFinePointer]);

  useEffect(() => {
    const circle = circleRef.current;
    const dot = dotRef.current;
    if (!circle || !dot || !mounted || !useFinePointer) return;

    dot.style.transformOrigin = "center center";

    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const target = e.target instanceof Element ? e.target : null;
      if (!target) return;

      const surface = getSurface(target, x, y);
      const hover = isInteractiveTarget(target);
      const textMag = isTextMagnify(target, x, y);
      const section = getSectionFromElement(target);
      setPack({ surface, hover, textMag, section });

      const scale = textMag ? TEXT_MAG_DOT_SCALE : 1;
      circle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
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
  }, [mounted, useFinePointer]);

  if (!mounted || !useFinePointer) return null;

  const { surface, hover, textMag, section } = pack;
  const surfaceClass =
    surface === "dark"
      ? "apx-cursor-big-circle--surface-dark"
      : surface === "image"
        ? "apx-cursor-big-circle--surface-image"
        : "apx-cursor-big-circle--surface-light";
  const sectionClass = section ? `apx-cursor-big-circle--${section}` : "";

  const node = (
    <div
      className={`apx-cursor-big-circle${hover ? " apx-cursor-big-circle--hover" : ""} ${surfaceClass}${
        textMag ? " apx-cursor-big-circle--text-mag" : ""
      }${sectionClass ? ` ${sectionClass}` : ""}`}
      aria-hidden
      hidden={!visible}
      style={{ opacity: visible ? 1 : 0 }}
      data-section={section ?? undefined}
      data-surface={surface}
    >
      <div ref={circleRef} className="apx-cursor-big-circle__circle" />
      <div ref={dotRef} className="apx-cursor-big-circle__dot" />
    </div>
  );

  return createPortal(node, document.body);
}
