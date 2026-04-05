'use client'

import Image from 'next/image'
import styles from './SecondFloorPlan.module.css'

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const ROOMS = [
  { id: 'living',   color: 'hsla(200,70%,50%,0.4)',  points: '254,147 970,151 970,742 256,742' },
  { id: 'master',   color: 'hsla(120,60%,40%,0.4)',  points: '991,577 1611,585 1613,1234 994,1249' },
  { id: 'bedroom2', color: 'hsla(0,65%,55%,0.4)',    points: '248,764 840,751 844,1151 244,1138' },
  { id: 'bedroom3', color: 'hsla(270,55%,55%,0.4)',  points: '384,1159 845,1163 840,1703 376,1695' },
  { id: 'bathroom', color: 'hsla(30,80%,50%,0.4)',   points: '1010,1285 855,1289 847,1698 1017,1699' },
  { id: 'terrace',  color: 'hsla(60,75%,45%,0.4)',   points: '1029,1263 1621,1266 1622,1676 1029,1679' },
] as const

type RoomId = typeof ROOMS[number]['id']

interface SecondFloorPlanProps {
  active: Set<RoomId>
}

export default function SecondFloorPlan({ active }: SecondFloorPlanProps) {
  return (
    <div className={styles.planWrapper}>
      <Image
        src={`${base}/image/secondFloor.png`}
        alt="Second Floor Plan"
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
