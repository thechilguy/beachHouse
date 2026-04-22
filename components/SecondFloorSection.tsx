"use client";

import { useState, useEffect, useRef } from "react";
import SecondFloorPlan from "./SecondFloorPlan";
import styles from "./FloorSection.module.css";

const ROOMS = [
  { id: "living",   label: "Living / Dining", size: "45 m²", color: "hsla(200,70%,50%,0.35)" },
  { id: "master",   label: "Master Bedroom",  size: "38 m²", color: "hsla(120,60%,40%,0.35)" },
  { id: "bedroom2", label: "Bedroom 2",        size: "22 m²", color: "hsla(0,65%,55%,0.35)"   },
  { id: "bedroom3", label: "Bedroom 3",        size: "20 m²", color: "hsla(270,55%,55%,0.35)" },
  { id: "bathroom", label: "Bathroom",         size: "12 m²", color: "hsla(30,80%,50%,0.35)"  },
  { id: "terrace",  label: "Terrace",          size: "30 m²", color: "hsla(60,75%,45%,0.35)"  },
] as const;

type RoomId = (typeof ROOMS)[number]["id"];

export default function SecondFloorSection() {
  const [active, setActive] = useState<Set<RoomId>>(new Set<RoomId>(["living"]));
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add(styles.visible); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function toggle(id: RoomId) {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <section className={styles.section}>
      <div className={styles.titleRow}>
        <h2 className={styles.floorTitle}>Second Floor</h2>
      </div>

      <div ref={bodyRef} className={styles.body}>
        <div className={styles.colLeft}>
          <div className={styles.overview}>
            <p className={styles.overviewLabel}>Floor overview</p>
            <p className={styles.overviewMain}>Second Floor — <strong>140 m²</strong></p>
            <p className={styles.overviewSub}>Private sleeping wing · 3 bedrooms · 2 bathrooms · terrace</p>
          </div>

          <div className={styles.descBlock}>
            <p className={styles.descText}>
              The second floor is dedicated to rest and privacy. The master
              bedroom opens onto a panoramic terrace with sea views, while two
              additional bedrooms share a well-appointed bathroom and a quiet
              corridor.
            </p>
            <div className={styles.specs}>
              <div className={styles.spec}>
                <span className={styles.specLabel}>Ceiling Height</span>
                <span className={styles.specValue}>2.9 m</span>
              </div>
              <div className={styles.spec}>
                <span className={styles.specLabel}>Terrace</span>
                <span className={styles.specValue}>Sea-facing</span>
              </div>
              <div className={styles.spec}>
                <span className={styles.specLabel}>Flooring</span>
                <span className={styles.specValue}>Oak · Stone</span>
              </div>
            </div>
          </div>

          <div className={styles.roomsGrid}>
            {ROOMS.map((r) => (
              <div
                key={r.id}
                className={`${styles.roomCard}${active.has(r.id) ? ` ${styles.roomCardActive}` : ""}`}
                style={active.has(r.id) ? { background: r.color, borderColor: "transparent" } : {}}
                onClick={() => toggle(r.id)}
              >
                <span className={styles.roomDot} style={{ background: r.color }} />
                <p className={styles.roomName}>{r.label}</p>
                <p className={styles.roomSize}>{r.size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.colRight}>
          <SecondFloorPlan active={active} />
        </div>
      </div>
    </section>
  );
}
