'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

const ROOMS = [
  { id: 'living',   label: 'Living / Dining',  hsl: '200, 70%, 50%' },
  { id: 'master',   label: 'Master Bedroom',   hsl: '120, 60%, 40%' },
  { id: 'bedroom2', label: 'Bedroom 2',         hsl: '0,   65%, 55%' },
  { id: 'bedroom3', label: 'Bedroom 3',         hsl: '270, 55%, 55%' },
  { id: 'bathroom', label: 'Bathroom',          hsl: '30,  80%, 50%' },
  { id: 'terrace',  label: 'Terrace',           hsl: '60,  75%, 45%' },
]

function fillColor(hsl: string) { return `hsla(${hsl}, 0.4)` }
function solidColor(hsl: string) { return `hsl(${hsl})` }

export default function SecondFloorEditor() {
  const [points, setPoints]   = useState<{ x: number; y: number }[]>([])
  const [polygons, setPolygons] = useState<string[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  const nextIndex = polygons.length
  const done = nextIndex >= ROOMS.length

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (done) return
    const rect = wrapperRef.current!.getBoundingClientRect()
    const x = Math.round(((e.clientX - rect.left) / rect.width)  * 2000)
    const y = Math.round(((e.clientY - rect.top)  / rect.height) * 2000)
    setPoints(prev => [...prev, { x, y }])
  }

  function finish() {
    if (points.length < 3) return
    setPolygons(prev => [...prev, points.map(p => `${p.x},${p.y}`).join(' ')])
    setPoints([])
  }

  function undoPoint() { setPoints(prev => prev.slice(0, -1)) }

  function undoZone() {
    setPolygons(prev => prev.slice(0, -1))
    setPoints([])
  }

  function clear() { setPoints([]); setPolygons([]) }

  const currentPts = points.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div style={{ display: 'flex', gap: 24, padding: 24, fontFamily: 'monospace', alignItems: 'flex-start' }}>

      {/* ── LEFT: plan ── */}
      <div style={{ flex: '1 1 60%', minWidth: 0 }}>

        {/* Header */}
        <div style={{ marginBottom: 12, fontSize: 15, fontWeight: 700 }}>
          {done
            ? '✅ Всі зони намальовано'
            : <>Малюєш: <span style={{ color: solidColor(ROOMS[nextIndex].hsl) }}>{ROOMS[nextIndex].label}</span>{' '}
              <span style={{ color: '#888', fontWeight: 400 }}>({nextIndex + 1} / {ROOMS.length})</span></>
          }
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <button onClick={finish}    style={btn('#2a8')} disabled={points.length < 3 || done}>
            ✓ Завершити зону ({points.length} точок)
          </button>
          <button onClick={undoPoint} style={btn('#a82')} disabled={points.length === 0}>
            ← Відмінити точку
          </button>
          <button onClick={undoZone}  style={btn('#88a')} disabled={polygons.length === 0}>
            ↩ Скасувати зону
          </button>
          <button onClick={clear}     style={btn('#a33')}>
            ✕ Очистити все
          </button>
        </div>

        {/* Plan image */}
        <div
          ref={wrapperRef}
          onClick={handleClick}
          style={{ position: 'relative', width: '100%', cursor: done ? 'default' : 'crosshair', userSelect: 'none' }}
        >
          <Image
            src="/image/secondFloor__.png"
            alt="Second Floor Plan"
            width={1486}
            height={1492}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <svg
            viewBox="0 0 2000 2000"
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            {/* Finished zones */}
            {polygons.map((pts, i) => (
              <polygon
                key={i}
                points={pts}
                fill={fillColor(ROOMS[i].hsl)}
                stroke="white"
                strokeWidth={8}
              />
            ))}
            {/* Current zone */}
            {points.length > 0 && (
              <polygon points={currentPts} fill="rgba(255,220,0,0.28)" stroke="gold" strokeWidth={8} />
            )}
            {/* Dots */}
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={20} fill="gold" stroke="white" strokeWidth={5} />
            ))}
          </svg>
        </div>
      </div>

      {/* ── RIGHT: coordinate table ── */}
      <div style={{ flex: '0 0 340px', position: 'sticky', top: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Координати зон</div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={th}>#</th>
              <th style={th}>id</th>
              <th style={th}>Назва</th>
              <th style={th}>Статус</th>
            </tr>
          </thead>
          <tbody>
            {ROOMS.map((room, i) => {
              const isDone   = i < polygons.length
              const isActive = i === nextIndex && !done
              return (
                <tr key={room.id} style={{ background: isActive ? '#fffbe6' : 'white' }}>
                  <td style={td}>{i + 1}</td>
                  <td style={{ ...td, color: solidColor(room.hsl), fontWeight: 700 }}>{room.id}</td>
                  <td style={td}>{room.label}</td>
                  <td style={{ ...td, color: isDone ? '#2a8' : isActive ? '#a82' : '#bbb' }}>
                    {isDone ? '✓' : isActive ? '✎ зараз' : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Coords output */}
        {polygons.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#333' }}>
              Скопіюй у SecondFloorPlan.tsx:
            </div>
            <div style={{
              background: '#1a1a1a', color: '#d4f0c0', borderRadius: 8,
              padding: '12px 14px', fontSize: 11, lineHeight: 1.7, overflowX: 'auto',
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>
              {polygons.map((pts, i) =>
                `{ id: '${ROOMS[i].id}', points: '${pts}' }`
              ).join('\n')}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

function btn(color: string): React.CSSProperties {
  return { padding: '8px 14px', background: color, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }
}

const th: React.CSSProperties = { padding: '6px 8px', textAlign: 'left', borderBottom: '1px solid #ddd', fontWeight: 700 }
const td: React.CSSProperties = { padding: '6px 8px', borderBottom: '1px solid #eee' }
