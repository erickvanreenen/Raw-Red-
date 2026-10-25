"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Announcements go to one hidden status region (rendered in the layout) so visible messages are never read twice.
export function announce(text: string) {
  const el = document.getElementById("announcer");
  if (!el) return;
  el.textContent = "";
  window.setTimeout(() => {
    el.textContent = text;
  }, 30);
}

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Scroll to a section and move focus to its heading, so keyboard and screen-reader users land where sighted users do.
export function goTo(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  const heading = id === "main" ? section : section.querySelector<HTMLElement>("h1, h2");
  section.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  heading?.focus({ preventScroll: true });
}

// A confirmation that shows for a few seconds, restarts on repeat, and waits while focus is inside it.
export function useFlash(ms = 4000) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const hide = useCallback(() => {
    const el = ref.current;
    if (el && el.contains(document.activeElement)) {
      el.addEventListener("focusout", () => window.setTimeout(hide, 0), { once: true });
      return;
    }
    setVisible(false);
  }, []);

  const show = useCallback(() => {
    setVisible(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(hide, ms);
  }, [hide, ms]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { visible, show, ref };
}

// Native <dialog> as a controlled modal: focus trapping and Esc come from the browser; focus returns to the opener.
export function useDialog(
  isOpen: boolean,
  onRequestClose: () => void,
  fallbackFocus?: () => HTMLElement | null
) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const requestClose = useRef(onRequestClose);
  requestClose.current = onRequestClose;
  const fallback = useRef(fallbackFocus);
  fallback.current = fallbackFocus;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen) {
      d.classList.remove("is-closing");
      if (!d.open) {
        opener.current = document.activeElement as HTMLElement | null;
        d.showModal();
      }
      return;
    }
    if (!d.open) return;
    if (prefersReducedMotion()) {
      d.close();
      return;
    }
    d.classList.add("is-closing");
    const t = window.setTimeout(() => {
      d.classList.remove("is-closing");
      d.close();
    }, 160);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      const o = opener.current;
      const target = o && document.contains(o) && o.offsetParent !== null ? o : fallback.current?.();
      target?.focus();
    };
    const onCancel = (e: Event) => {
      e.preventDefault();
      requestClose.current();
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === d) requestClose.current();
    };
    d.addEventListener("close", onClose);
    d.addEventListener("cancel", onCancel);
    d.addEventListener("click", onClick);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("cancel", onCancel);
      d.removeEventListener("click", onClick);
    };
  }, []);

  return ref;
}
