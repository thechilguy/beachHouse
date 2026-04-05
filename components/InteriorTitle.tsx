"use client";

import { useEffect, useRef } from "react";
import styles from "./InteriorTitle.module.css";

export default function InteriorTitle() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const word = wordRef.current;
    if (!section || !word) return;

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const total = section!.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      // translateY: від +70vh (знизу) до -70vh (вгору) — лінійно
      const translateY = (0.5 - progress) * 140;

      // fontSize: читабельний (52px) до 0.4, потім різко росте
      const maxSize = window.innerWidth * 0.2;
      const sizeP = Math.max(0, Math.min(1, (progress - 0.38) / 0.38));
      const ease = sizeP * sizeP * (3 - 2 * sizeP); // smoothstep
      const fontSize = 52 + (maxSize - 52) * ease;

      // letterSpacing: нормальний до 0.5, потім розширюється
      const spacingP = Math.max(0, Math.min(1, (progress - 0.5) / 0.35));
      const spacingEase = spacingP * spacingP * (3 - 2 * spacingP);
      const letterSpacing = 0.08 + 1.4 * spacingEase;

      // opacity: плавна поява, зникає в самому кінці
      const opacity =
        progress < 0.06
          ? progress / 0.06
          : progress > 0.9
          ? 1 - (progress - 0.9) / 0.1
          : 1;

      word!.style.transform = `translateY(${translateY}vh)`;
      word!.style.fontSize = `${fontSize}px`;
      word!.style.letterSpacing = `${letterSpacing}em`;
      word!.style.opacity = String(opacity);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <div ref={wordRef} className={styles.word}>
          INTERIOR
        </div>
      </div>
    </section>
  );
}
