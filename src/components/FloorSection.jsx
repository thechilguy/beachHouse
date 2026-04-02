import styles from './FloorSection.module.css'

export default function FloorSection() {
  return (
    <section className={styles.section}>

      {/* ── Left Column ── */}
      <div className={styles.colLeft}>

        {/* Header */}
        <div className={styles.headerRow}>
          <h2 className={styles.floorTitle}>First Floor</h2>
          <span className={styles.arrow}>↓</span>
        </div>

        {/* Overview */}
        <div className={styles.overview}>
          <p className={styles.overviewLabel}>Floor overview</p>
          <p className={styles.overviewMain}>First Floor — <strong>160 m²</strong></p>
          <p className={styles.overviewSub}>Open-plan living · 4 rooms · 2 bathrooms</p>
        </div>

        {/* Content Row */}
        <div className={styles.contentRow}>

          {/* Description + Specs */}
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

          {/* Rooms Grid */}
          <div className={styles.roomsGrid}>
            <div className={styles.roomCard}>
              <p className={styles.roomName}>Living Room</p>
              <p className={styles.roomSize}>32 m²</p>
            </div>
            <div className={styles.roomCard}>
              <p className={styles.roomName}>Master Bedroom</p>
              <p className={styles.roomSize}>28 m²</p>
            </div>
            <div className={styles.roomCard}>
              <p className={styles.roomName}>Kitchen</p>
              <p className={styles.roomSize}>18 m²</p>
            </div>
            <div className={`${styles.roomCard} ${styles.roomCardGreen}`}>
              <p className={styles.roomName}>Garage</p>
              <p className={styles.roomSize}>24 m²</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Right Column — 3D placeholder ── */}
      <div className={styles.colRight}>
        <div className={styles.cubeWrapper}>
          <div className={styles.cubeScene}>
            <div className={styles.cube}>
              <div className={`${styles.face} ${styles.faceFront}`} />
              <div className={`${styles.face} ${styles.faceBack}`} />
              <div className={`${styles.face} ${styles.faceLeft}`} />
              <div className={`${styles.face} ${styles.faceRight}`} />
              <div className={`${styles.face} ${styles.faceTop}`} />
              <div className={`${styles.face} ${styles.faceBottom}`} />
            </div>
          </div>
          <p className={styles.cubeLabel}>3D Model</p>
        </div>
      </div>

    </section>
  )
}
