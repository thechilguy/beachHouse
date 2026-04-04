'use client'

import Image from 'next/image'
import styles from './FloorPlan.module.css'

const ROOMS = [
  { id: 'kitchen', color: 'rgba(42,138,170,0.45)',  points: '41,422 1092,423 1103,1251 42,1255' },
  { id: 'living',  color: 'rgba(176,80,80,0.45)',   points: '1108,424 1115,1244 1954,1266 1954,428' },
  { id: 'bedroom', color: 'rgba(74,154,48,0.45)',   points: '877,1948 878,1280 45,1292 39,1949' },
  { id: 'room2',   color: 'rgba(74,74,170,0.45)',   points: '908,1279 1951,1281 1952,1951 907,1950' },
] as const

type RoomId = typeof ROOMS[number]['id']

interface FloorPlanProps {
  active: Set<RoomId>
}

export default function FloorPlan({ active }: FloorPlanProps) {
  return (
    <div className={styles.planWrapper}>
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
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {ROOMS.map(r => (
          <polygon
            key={r.id}
            points={r.points}
            style={{ fill: active.has(r.id) ? r.color : 'transparent', transition: 'fill 0.25s' }}
          />
        ))}
      </svg>
    </div>
  )
}
