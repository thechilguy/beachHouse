"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ExteriorSection.module.css";

export default function ExteriorSection() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <Image
        src="/image/blured.png"
        alt="Exterior view"
        fill
        className={styles.image}
        priority={false}
      />
      <div ref={gradientRef} className={styles.gradient}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <span className={styles.label}>LOCATION</span>
            <h2 className={styles.title}>
              Mediterranean Coastline Private Villa · 4 Bedrooms · 320 m²
            </h2>
          </div>
          <div className={styles.textBlock}>
            <p className={styles.description}>
              Nestled on a sun-drenched hillside, this private villa offers
              uninterrupted views of the Mediterranean coastline. Designed for
              those who seek solitude without sacrificing elegance.
            </p>
            <p className={styles.tagline}>
              Every detail crafted for the ones who know the difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
