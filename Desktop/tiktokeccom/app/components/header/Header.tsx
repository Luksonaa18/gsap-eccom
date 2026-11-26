"use client";

import { useEffect, useRef, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scope = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const reduce = ctx.conditions?.reduce;

          gsap.set(overlayRef.current, { yPercent: -100 });
          gsap.set(".menu-link", { yPercent: 110 });

          tl.current = gsap
            .timeline({ paused: true, defaults: { ease: "power3.inOut" } })
            .set(overlayRef.current, { visibility: "visible" }, 0)
            .to(
              overlayRef.current,
              { yPercent: 0, duration: reduce ? 0.01 : 0.7 },
              0,
            )
            .to(
              ".menu-link",
              {
                yPercent: 0,
                duration: reduce ? 0.01 : 0.6,
                stagger: reduce ? 0 : 0.08,
                ease: "power4.out",
              },
              reduce ? 0 : 0.35,
            )
            .eventCallback("onReverseComplete", () => {
              gsap.set(overlayRef.current, { visibility: "hidden" });
            });
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  useEffect(() => {
    if (!tl.current) return;
    if (isOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div ref={scope}>
      <header
        className={`fixed top-0 z-50 h-16 w-full transition-all duration-300 `}
      >
        <nav className="flex h-full items-center justify-between px-4">
          <span className="text-sm font-bold tracking-[0.3em] text-white">
            ATELIER
          </span>

          <span className="text-[10px] tracking-[0.25em] text-white/70 md:text-xs">
            THE NEW COLLECTION — 2026
          </span>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative z-70 p-1 text-white"
          >
            {isOpen ? (
              <IoClose className="text-3xl" />
            ) : (
              <IoMenu className="text-3xl" />
            )}
          </button>
        </nav>
      </header>

      <div
        ref={overlayRef}
        aria-hidden={!isOpen}
        className="invisible fixed inset-0 z-60 bg-amber-100 text-neutral-900"
      >
        <div className="w-full absolute items-end flex justify-end p-4">
          <IoClose
            className="text-2xl"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
        <ul className="flex h-full flex-col items-center justify-center gap-6">
          {links.map((link) => (
            <li key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                tabIndex={isOpen ? 0 : -1}
                onClick={() => setIsOpen(false)}
                className="menu-link inline-block text-4xl font-bold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
