import Hero from "@/components/Hero";
import FloorSection from "@/components/FloorSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.grid}>
      <Hero />
      <FloorSection />
    </main>
  );
}
