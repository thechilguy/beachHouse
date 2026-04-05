"use client";

import { useEffect, useRef } from "react";
import styles from "./InteriorTitle.module.css";

// Лінії: кожна має start/end прогрес малювання
const LINES = [
  { d: "M 0,540 L 1920,540",            start: 0,    end: 0.55 }, // горизонталь центр
  { d: "M 960,0 L 960,1080",            start: 0.05, end: 0.55 }, // вертикаль центр
  { d: "M 0,0 L 1920,1080",             start: 0.1,  end: 0.65 }, // діагональ ↘
  { d: "M 1920,0 L 0,1080",             start: 0.1,  end: 0.65 }, // діагональ ↙
  { d: "M 200,0 L 200,1080",            start: 0.18, end: 0.7  }, // ліва вертикаль
  { d: "M 1720,0 L 1720,1080",          start: 0.18, end: 0.7  }, // права вертикаль
  { d: "M 0,180 L 1920,180",            start: 0.22, end: 0.72 }, // горизонталь верх
  { d: "M 0,900 L 1920,900",            start: 0.22, end: 0.72 }, // горизонталь низ
  { d: "M 200,180 L 960,540",           start: 0.3,  end: 0.78 }, // промінь ↗ вліво
  { d: "M 1720,180 L 960,540",          start: 0.3,  end: 0.78 }, // промінь ↗ вправо
  { d: "M 200,900 L 960,540",           start: 0.3,  end: 0.78 }, // промінь ↘ вліво
  { d: "M 1720,900 L 960,540",          start: 0.3,  end: 0.78 }, // промінь ↘ вправо
  { d: "M 860,440 A 100,100 0 1 1 860,641 A 100,100 0 1 1 860,440", start: 0.4, end: 0.85 }, // коло
];

export default function InteriorTitle() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef    = useRef<HTMLDivElement>(null);
  const pathRefs   = useRef<(SVGPathElement | null)[]>([]);
  const lengths    = useRef<number[]>([]);

  useEffect(() => {
    // Рахуємо довжини ліній
    lengths.current = pathRefs.current.map(p => p?.getTotalLength() ?? 0);
    // Ставимо початковий dasharray/offset
    pathRefs.current.forEach((p, i) => {
      if (!p) return;
      const len = lengths.current[i];
      p.style.strokeDasharray  = String(len);
      p.style.strokeDashoffset = String(len);
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const word    = wordRef.current;
    if (!section || !word) return;

    function onScroll() {
      const rect     = section!.getBoundingClientRect();
      const total    = section!.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      // ── Текст ──
      const translateY  = (0.5 - progress) * 140;
      const maxSize     = window.innerWidth * 0.2;
      const sizeP       = Math.max(0, Math.min(1, (progress - 0.38) / 0.38));
      const ease        = sizeP * sizeP * (3 - 2 * sizeP);
      const fontSize    = 52 + (maxSize - 52) * ease;
      const spacingP    = Math.max(0, Math.min(1, (progress - 0.5) / 0.35));
      const spacingEase = spacingP * spacingP * (3 - 2 * spacingP);
      const letterSpacing = 0.08 + 1.4 * spacingEase;
      const opacity =
        progress < 0.06 ? progress / 0.06
        : progress > 0.9 ? 1 - (progress - 0.9) / 0.1
        : 1;

      word!.style.transform    = `translateY(${translateY}vh)`;
      word!.style.fontSize     = `${fontSize}px`;
      word!.style.letterSpacing = `${letterSpacing}em`;
      word!.style.opacity      = String(opacity);

      // ── Лінії ──
      LINES.forEach((line, i) => {
        const p = pathRefs.current[i];
        if (!p) return;
        const len = lengths.current[i];
        const local = Math.max(0, Math.min(1, (progress - line.start) / (line.end - line.start)));
        p.style.strokeDashoffset = String(len * (1 - local));
        p.style.opacity = String(Math.min(1, local * 3) * 0.18);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>

        {/* SVG лінії */}
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className={styles.svg}
        >
          {LINES.map((line, i) => (
            <path
              key={i}
              ref={(el) => { pathRefs.current[i] = el; }}
              d={line.d}
              stroke="white"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div ref={wordRef} className={styles.word}>
          INTERIOR
        </div>
      </div>
    </section>
  );
}
