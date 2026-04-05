"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./InteriorSection.module.css";

const SLIDES = [
  {
    image: "/image/interier1.png",
    reverse: false,
    title: "The space between walls and sky",
    desc: "A terrace that dissolves into the horizon. Morning light, sea wind, and the kind of stillness that only stone and silence can hold.\nThis is not a house. This is a feeling.",
  },
  {
    image: "/image/interier2.png",
    reverse: true,
    title: "Warm light. Raw wood. Open sky.",
    desc: "Inside, every surface tells a story — polished concrete underfoot, solid timber overhead, and through the open frame, the desert slowly becomes the sea.\nA room that knows when to be quiet.",
  },
  {
    image: "/image/interier3.png",
    reverse: false,
    title: "Terracotta walls. Stone floors. Art that breathes.",
    desc: "A living room built around one idea — that beauty should feel effortless. Textured plaster catches the last light of day while the landscape outside does the rest.\nNothing excess. Nothing missing.",
  },
];

const PARALLAX = 0.18;

export default function InteriorSection() {
  const imgRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ── Parallax via scroll ──
    function onScroll() {
      imgRefs.current.forEach((img) => {
        if (!img) return;
        const rect = img.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        img.style.transform = `translateY(${center * PARALLAX}px)`;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ── IntersectionObserver for text ──
    const observers: IntersectionObserver[] = [];

    textRefs.current.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add(styles.visible);
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <section className={styles.section}>
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`${styles.row} ${slide.reverse ? styles.reverse : ""}`}
        >
          {/* Image with parallax */}
          <div className={styles.imgOuter}>
            <div
              ref={(el) => { imgRefs.current[i] = el; }}
              className={styles.imgInner}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className={styles.img}
              />
            </div>
          </div>

          {/* Text with slideIn */}
          <div
            ref={(el) => { textRefs.current[i] = el; }}
            className={styles.text}
          >
            <h3 className={styles.title}>{slide.title}</h3>
            <p className={styles.desc}>{slide.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
