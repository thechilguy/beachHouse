'use client'

import { useEffect } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let rafId: number
    let lenisInstance: { raf: (t: number) => void; destroy: () => void } | null = null

    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenisInstance = lenis

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenisInstance?.destroy()
    }
  }, [])

  return <>{children}</>
}
