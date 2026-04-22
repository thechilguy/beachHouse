"use client";

import { useState, useEffect, useRef } from "react";
import FloorPlan from "./FloorPlan";
import styles from "./FloorSection.module.css";

const ROOMS = [
  { id: "living",   label: "Living Room",    size: "32 m²", color: "rgba(176,80,80,0.35)"  },
  { id: "bedroom",  label: "Master Bedroom", size: "28 m²", color: "rgba(74,154,48,0.35)"  },
  { id: "kitchen",  label: "Kitchen",        size: "18 m²", color: "rgba(42,138,170,0.35)" },
  { id: "room2",    label: "Bathroom",       size: "24 m²", color: "rgba(74,74,170,0.35)"  },
] as const;

type RoomId = (typeof ROOMS)[number]["id"];

export default function FloorSection() {
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
        <h2 className={styles.floorTitle}>First Floor</h2>
      </div>

      <div ref={bodyRef} className={styles.body}>
        <div className={styles.colLeft}>
          <div className={styles.overview}>
            <p className={styles.overviewLabel}>Floor overview</p>
            <p className={styles.overviewMain}>First Floor — <strong>160 m²</strong></p>
            <p className={styles.overviewSub}>Open-plan living · 4 rooms · 2 bathrooms</p>
          </div>

          <div className={styles.descBlock}>
            <p className={styles.descText}>
              The first floor is designed around natural light and open flow.
              Floor-to-ceiling windows connect the living area to the terrace,
              while the kitchen opens directly to the dining space.
            </p>
            <div className={styles.specs}>
              <div className={styles.spec}>
                <span className={styles.specLabel}>Ceiling Height</span>
                <span className={styles.specValue}>3.2 m</span>
              </div>
              <div className={styles.spec}>
                <span className={styles.specLabel}>Windows</span>
                <span className={styles.specValue}>Floor-to-ceiling</span>
              </div>
              <div className={styles.spec}>
                <span className={styles.specLabel}>Flooring</span>
                <span className={styles.specValue}>Oak · Marble</span>
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
          <FloorPlan active={active} />
        </div>
      </div>
    </section>
  );
}
