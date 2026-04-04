'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

export default function FloorPlanEditor() {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [polygons, setPolygons] = useState<string[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = wrapperRef.current!.getBoundingClientRect()
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 2000)
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 2000)
    setPoints(prev => [...prev, { x, y }])
  }

  function finish() {
    if (points.length < 3) return
    const str = points.map(p => `${p.x},${p.y}`).join(' ')
    setPolygons(prev => [...prev, str])
    setPoints([])
  }

  function undo() {
    setPoints(prev => prev.slice(0, -1))
  }

  function clear() {
    setPoints([])
    setPolygons([])
  }

  const currentPoints = points.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div style={{ padding: 24, fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <button onClick={finish} style={btnStyle('#2a8')} disabled={points.length < 3}>
          Завершити зону ({points.length} точок)
        </button>
        <button onClick={undo} style={btnStyle('#a82')} disabled={points.length === 0}>
          Відмінити останню
        </button>
        <button onClick={clear} style={btnStyle('#a33')}>
          Очистити все
        </button>
      </div>

      <div
        ref={wrapperRef}
        onClick={handleClick}
        style={{ position: 'relative', width: '100%', cursor: 'crosshair', userSelect: 'none' }}
      >
        <Image
          src="/image/plan-1_floor.png"
          alt="Floor Plan"
          width={1486}
          height={1492}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <svg
          viewBox="0 0 2000 2000"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          {/* Збережені зони */}
          {polygons.map((pts, i) => (
            <polygon key={i} points={pts} fill={`hsla(${i * 60}, 70%, 50%, 0.35)`} stroke="white" strokeWidth={6} />
          ))}
          {/* Поточна зона */}
          {points.length > 0 && (
            <polygon points={currentPoints} fill="rgba(255,200,0,0.3)" stroke="gold" strokeWidth={6} />
          )}
          {/* Крапки */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={18} fill="gold" stroke="white" strokeWidth={4} />
          ))}
        </svg>
      </div>

      {/* Вивід координат */}
      {polygons.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <p style={{ marginBottom: 8, color: '#555' }}>Координати зон (скопіюй в FloorPlan.tsx):</p>
          {polygons.map((pts, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <span style={{ color: '#888' }}>зона {i + 1}: </span>
              <code style={{ background: '#f0f0f0', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>
                &apos;{pts}&apos;
              </code>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function btnStyle(color: string): React.CSSProperties {
  return {
    padding: '8px 16px',
    background: color,
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 13,
  }
}
