import Hero from "@/components/Hero";
import FloorSection from "@/components/FloorSection";
import SecondFloorSection from "@/components/SecondFloorSection";
import ExteriorSection from "@/components/ExteriorSection";
import GallerySection from "@/components/GallerySection";
import InteriorTitle from "@/components/InteriorTitle";
import InteriorSection from "@/components/InteriorSection";
import ContactSection from "@/components/ContactSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.grid}>
      <Hero />
      <FloorSection />
      <SecondFloorSection />
      <ExteriorSection />
      <GallerySection />
      <InteriorTitle />
      <InteriorSection />
      <ContactSection />
    </main>
  );
}
