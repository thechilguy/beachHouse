"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./GallerySection.module.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function GallerySection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const text = textRef.current;
    if (!grid || !text) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add(styles.visible);
          text.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>Exterior</span>
        <h2 className={styles.headerTitle}>The Architecture</h2>
      </div>

      <div ref={gridRef} className={styles.grid}>

        {/* Top-left */}
        <div className={styles.imgTopLeft}>
          <Image src={`${base}/image/exterier1.png`} alt="Exterior view 1" fill className={styles.img} />
        </div>

        {/* Top-right */}
        <div className={styles.imgTopRight}>
          <Image src={`${base}/image/exterier2.png`} alt="Exterior view 2" fill className={styles.img} />
        </div>

        {/* Bottom-left */}
        <div className={styles.imgBottomLeft}>
          <Image src={`${base}/image/exterier3.png`} alt="Exterior view 3" fill className={styles.img} />
        </div>

        {/* Bottom-right: text */}
        <div ref={textRef} className={styles.textBlock}>
          <div className={styles.heading}>
            <p className={styles.label}>VILLA NOVA 04</p>
            <p className={styles.sublabel}>Hillside Estate, Tuscany</p>
          </div>

          <div className={styles.descriptions}>
            <p className={styles.desc1}>
              Three volumes. One vision. A home that belongs to the landscape as
              much as it rises above it. Raw concrete, warm light, endless
              horizon. Where the boundaries between inside and outside dissolve
              into something rare — a space that breathes with you.
            </p>
            <p className={styles.desc2}>
              Conceived as a retreat from the noise of the world, every room
              frames a different view of the valley below. Stone underfoot, sky
              overhead, stillness all around.
            </p>
          </div>

          <p className={styles.tagline}>Built for silence. Designed for life.</p>
        </div>

      </div>
    </section>
  );
}
