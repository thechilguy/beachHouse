'use client'

import { useEffect, useState } from 'react'
import styles from './Loader.module.css'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Animate progress to ~85% while waiting for window.load
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 12
      if (current >= 85) {
        current = 85
        clearInterval(interval)
      }
      setProgress(Math.round(current))
    }, 120)

    function onLoad() {
      clearInterval(interval)
      setProgress(100)
      // Give time to show 100%, then fade out
      setTimeout(() => setHidden(true), 400)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  if (hidden) return null

  return (
    <div className={`${styles.overlay} ${progress === 100 ? styles.done : ''}`}>
      <div className={styles.content}>
        <p className={styles.title}>Beach House</p>
        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.percent}>{progress}%</p>
      </div>
    </div>
  )
}
