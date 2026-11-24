"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import heroImage from "@/public/videos/selector-idioma-imagenes-desktop.webp";
import campaignImageOne from "@/public/videos/m-desktop-app-menu-02.jpg";
import campaignImageTwo from "@/public/videos/m-desktop-app-menu-01.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type Card = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export const cards: Card[] = [
  {
    id: 1,
    name: "The Essential",
    description: "Timeless silhouettes designed for everyday elegance.",
    image: "/videos/m-desktop-app-menu-02.jpg",
  },
  {
    id: 2,
    name: "Urban Motion",
    description: "Contemporary streetwear inspired by city life.",
    image: "/videos/m-desktop-menu-03.jpg",
  },
  {
    id: 3,
    name: "Soft Structure",
    description: "Minimal forms with refined textures and details.",
    image: "/videos/m-desktop-app-menu-01.jpg",
  },
  {
    id: 4,
    name: "Monochrome",
    description: "A bold expression of contrast, simplicity, and balance.",
    image: "/videos/0327543471907-o7.webp",
  },
  {
    id: 5,
    name: "The Essential",
    description: "Timeless silhouettes designed for everyday elegance.",
    image: "/videos/m-desktop-app-menu-02.jpg",
  },
];

const ContentPage = () => {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // --------------------------------
      // 1. HERO
      // --------------------------------

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".fashion-section",
          start: "top top",
          end: "+=1800",
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      heroTl.to(".hero-image", { scale: 1.18, ease: "none" }, 0);
      heroTl.to(
        ".hero-line-one",
        { xPercent: -30, opacity: 0, ease: "none" },
        0,
      );
      heroTl.to(
        ".hero-line-two",
        { xPercent: 30, opacity: 0, ease: "none" },
        0,
      );
      heroTl.to(".hero-kicker", { y: -30, opacity: 0, ease: "none" }, 0);

      // --------------------------------
      // 2. COLLECTION
      // --------------------------------

      const collectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".collection-section",
          start: "top 75%",
          end: "bottom 35%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      collectionTl.fromTo(
        ".collection-heading",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, ease: "none" },
        0,
      );

      collectionTl.fromTo(
        ".collection-description",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "none" },
        0.1,
      );

      collectionTl.fromTo(
        ".image-one-frame",
        { y: 20, clipPath: "inset(0 0 100% 0)" },
        { y: 0, clipPath: "inset(0 0 0% 0)", ease: "none" },
        0,
      );

      collectionTl.to(".campaign-image-one", { scale: 1.12, ease: "none" }, 0);

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".collection-visuals",
            start: "top 55%",
            end: "bottom 60%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          ".image-two-frame",
          { y: 60, clipPath: "inset(100% 0 0 0)" },
          { y: 0, clipPath: "inset(0% 0 0 0)", duration: 1 },
          0,
        )
        .fromTo(
          ".campaign-image-two",
          { scale: 1.2 },
          { scale: 1, duration: 1 },
          0,
        );

      // --------------------------------
      // 3. CARDS: pinned horizontal scroll
      // --------------------------------

      const section =
        container.current?.querySelector<HTMLElement>(".card-section");
      const track =
        container.current?.querySelector<HTMLElement>(".cards-track");

      if (section && track) {
        const getDistance = () => {
          const styles = getComputedStyle(section);
          const padding =
            parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
          const visibleWidth = section.clientWidth - padding;
          return Math.max(0, track.scrollWidth - visibleWidth);
        };

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: 1 / (cards.length - 1),
              duration: 0.5,
            },
          },
        });
      }

      const circle = container.current?.querySelector<HTMLElement>(".circle");

      if (circle) {
        const getFillScale = () =>
          (Math.hypot(window.innerWidth, window.innerHeight) /
            circle.offsetWidth) *
          1.05;

        const circleTl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".circle-section",
            start: "top top",
            end: "+=2500",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        circleTl.to(".circle", { scale: getFillScale, duration: 1 }, 0);

        circleTl.fromTo(
          ".circle-text-left",
          { xPercent: -120, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.8 },
          1,
        );
        circleTl.fromTo(
          ".circle-button-left",
          { xPercent: -120, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.8 },
          1,
        );

        circleTl.fromTo(
          ".circle-text-right",
          { xPercent: 120, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.8 },
          1,
        );
      }
    },
    { scope: container },
  );

  return (
    <main
      ref={container}
      className="overflow-hidden bg-[#eeeae2] text-[#181815]"
    >
      <section className="fashion-section relative isolate h-screen min-h-[650px] overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Fashion campaign"
            fill
            priority
            sizes="100vw"
            className="hero-image object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

        <div className="hero-kicker absolute left-6 right-6 top-7 z-20 flex items-center justify-between md:left-12 md:right-12"></div>

        <div className="absolute bottom-20 left-5 z-10 md:bottom-24 md:left-12">
          <p className="mb-7 text-[10px] font-medium uppercase tracking-[0.5em] text-white/70 md:text-xs">
            A new perspective on fashion
          </p>

          <h1 className="text-[clamp(5rem,17vw,16rem)] font-black uppercase leading-[0.75] tracking-[-0.09em]">
            <span className="hero-line-one block">New</span>

            <span className="hero-line-two block">Form.</span>
          </h1>
        </div>
      </section>

      <section className="collection-section relative min-h-screen overflow-hidden px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="collection-copy max-w-xl">
            <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.4em] text-neutral-500">
              01 / The collection
            </p>

            <h2 className="collection-heading text-6xl font-black uppercase leading-[0.85] tracking-[-0.07em] md:text-8xl">
              A study
              <br />
              in{" "}
              <span className="font-serif font-normal normal-case italic">
                contrast.
              </span>
            </h2>

            <p className="collection-description mt-10 max-w-sm text-sm leading-7 text-neutral-600 md:text-base">
              Where structure meets freedom. Discover a new expression of
              contemporary style through form, texture, and movement.
            </p>

            <div className="collection-description mt-12 flex max-w-sm items-center justify-between border-t border-black/20 pt-5">
              <span className="text-[10px] uppercase tracking-[0.3em]">
                Spring / Summer
              </span>

              <span className="text-[10px] uppercase tracking-[0.3em]">
                MMXXVI
              </span>
            </div>
          </div>

          <div className="collection-visuals relative mx-auto min-h-[550px] w-full max-w-2xl md:min-h-[700px]">
            <div className="image-one-frame absolute left-0 top-0 h-[68%] w-[72%] overflow-hidden bg-neutral-300">
              <Image
                src={campaignImageOne}
                alt="Fashion editorial campaign photograph"
                fill
                sizes="(max-width: 768px) 75vw, 40vw"
                className="campaign-image-one object-cover"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>

            <div className="image-two-frame absolute bottom-0 right-0 h-[48%] w-[58%] overflow-hidden border-[8px] border-[#eeeae2] bg-neutral-300 md:border-[12px]">
              <Image
                src={campaignImageTwo}
                alt="Fashion collection detail photograph"
                fill
                sizes="(max-width: 768px) 60vw, 30vw"
                className="campaign-image-two object-cover"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>

            <p className="absolute bottom-1 left-0 text-[9px] uppercase tracking-[0.3em] text-neutral-500">
              FIG. 01 — Form and movement
            </p>
          </div>
        </div>
      </section>

      <section className="card-section relative flex h-screen min-h-[650px] flex-col justify-center overflow-hidden bg-[#181815] px-6 py-16 text-white md:px-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-white/40">
              ATELIER — 2026
            </p>

            <h2 className="text-4xl font-black uppercase tracking-[-0.06em] md:text-7xl">
              Explore
              <span className="font-serif font-normal italic">
                {" "}
                Collections.
              </span>
            </h2>
          </div>

          <p className="hidden text-xs uppercase tracking-[0.3em] text-white/40 md:block">
            01 — {String(cards.length).padStart(2, "0")}
          </p>
        </div>

        <div className="cards-track flex w-max gap-5 will-change-transform">
          {cards.map((card, index) => (
            <article
              key={card.id}
              className="group relative h-[55vh] min-h-[350px] w-[78vw] max-w-[400px] shrink-0 overflow-hidden bg-neutral-800 md:w-[32vw]"
            >
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes="(max-width: 768px) 78vw, 32vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                    Collection / 0{index + 1}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    ↗
                  </span>
                </div>

                <h3 className="text-3xl font-black uppercase tracking-[-0.05em] md:text-4xl">
                  {card.name}
                </h3>

                <p className="mt-3 max-w-xs text-xs leading-6 text-white/70">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="circle-section relative flex h-screen items-center justify-center overflow-hidden">
        <div className="circle absolute h-[14vmin] w-[14vmin] rounded-full bg-black will-change-transform" />

        <div className="flex flex-col items-center gap-4">
          <h2 className="relative z-10 text-center text-[clamp(3.5rem,12vw,11rem)] font-black uppercase leading-[0.85] tracking-[-0.06em] text-white">
            <span className="circle-text-left block">Beyond</span>
            <span className="circle-text-right block">Ordinary.</span>
          </h2>
          <button className="circle-button-left relative z-10 flex h-14 w-50 items-center justify-center rounded-full bg-white text-sm font-extrabold uppercase tracking-[0.2em] text-black transition-colors duration-300 hover:bg-[#eeeae2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:h-36 md:w-36">
            Contact
          </button>
        </div>
      </section>
    </main>
  );
};

export default ContentPage;
