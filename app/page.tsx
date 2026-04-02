import Hero from "@/src/components/Hero";
import FloorSection from "@/src/components/FloorSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.grid}>
      <Hero />
      <FloorSection />
    </main>
  );
}
