"use client";

import { useRef, useState } from "react";
import { IoLogoTiktok, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BRAND = "Brandname";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "#new" },
      { label: "Best sellers", href: "#best-sellers" },
      { label: "As seen on TikTok", href: "#tiktok" },
      { label: "Gift cards", href: "#gift-cards" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "#shipping" },
      { label: "Returns", href: "#returns" },
      { label: "Track my order", href: "#track" },
      { label: "Contact us", href: "#contact" },
    ],
  },
];

const socials = [
  { label: "TikTok", href: "https://tiktok.com/", Icon: IoLogoTiktok },
  { label: "Instagram", href: "https://instagram.com/", Icon: IoLogoInstagram },
  { label: "YouTube", href: "https://youtube.com/", Icon: IoLogoYoutube },
];

const Footer = () => {
  const scope = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".wordmark-letter", { yPercent: 110 });

        ScrollTrigger.create({
          trigger: scope.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(".wordmark-letter", {
              yPercent: 0,
              duration: 0.9,
              stagger: 0.05,
              ease: "power4.out",
            });
          },
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer ref={scope} className="bg-amber-100 text-neutral-900">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-10 md:grid-cols-[1.4fr_1fr_1fr_auto]">
        <div className="max-w-sm">
          <h2 className="text-2xl font-bold leading-tight">
            Get first access to new drops
          </h2>
          <p className="mt-2 text-sm text-neutral-700">
            Join the list and see products before they hit the feed.
          </p>

          {subscribed ? (
            <p role="status" className="mt-5 text-sm font-medium">
              You&apos;re on the list. Check your inbox to confirm.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-5 flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-full border border-neutral-900/30 bg-white/60 px-4 py-2.5 text-sm outline-none placeholder:text-neutral-500 focus-visible:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900/20"
              />
              <button
                type="submit"
                className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-amber-100 transition-colors hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-100"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="mb-4 text-sm font-bold">{col.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="underline-offset-4 hover:underline focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="mb-4 text-sm font-bold">Follow</h3>
          <ul className="flex gap-3 md:flex-col md:gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm underline-offset-4 hover:underline focus-visible:underline"
                >
                  <Icon className="text-xl" aria-hidden="true" />
                  <span className="max-md:sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="overflow-hidden px-4 select-none"
        aria-label={BRAND}
        role="img"
      >
        <div
          className="flex justify-center text-[clamp(3rem,18vw,16rem)] font-black leading-[0.9] tracking-tighter"
          aria-hidden="true"
        >
          {BRAND.split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em]">
              <span className="wordmark-letter inline-block">{char}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-neutral-700 sm:flex-row sm:items-center sm:justify-between">
        <p></p>
        <ul className="flex gap-5">
          <li>
            <a href="#privacy" className="hover:underline">
              Privacy policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:underline">
              Terms of service
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
