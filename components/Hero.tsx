import styles from './Hero.module.css'

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function Hero() {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${base}/image/bg.png)` }}
    >
      <div className={styles.title}>
        <h1>
          Beach
          <br />
          House
        </h1>
        <p className={styles.subtitle}>by the mediterranean</p>
      </div>

      <div className={styles.badge}>RESIDENTIAL</div>

      <div className={styles.card}>
        <div
          className={styles.cardBlur}
          style={{ backgroundImage: `url(${base}/image/bg.png)` }}
        />
        <div className={styles.cardInner}>
          <p className={styles.cardLabel}>Location</p>
          <h2 className={styles.cardLocation}>Mediterranean Coastline</h2>
          <p className={styles.cardDetails}>Private Villa · 4 Bedrooms · 320 m²</p>
          <hr className={styles.cardDivider} />
          <p className={styles.cardPrice}>Price</p>
          <div className={styles.cardPriceRow}>
            <p className={styles.cardPriceValue}>€ 1 250 000</p>
            <button className={styles.cardButton}>Learn More ↗</button>
          </div>
        </div>
      </div>
    </section>
  )
}
