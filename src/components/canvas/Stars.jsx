import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PointMaterial, Points, Preload } from '@react-three/drei'
import { inSphere } from 'maath/random'

import { useScenesPaused } from '../../utils/scenePause'

const STAR_COUNT = 1700
const STAR_FIELD_RADIUS = 1.2

const Stars = (props) => {
  const ref = useRef(null)
  // Three coordinates per star; inSphere fills the buffer in steps of 3
  const [positions] = useState(() =>
    inSphere(new Float32Array(STAR_COUNT * 3), { radius: STAR_FIELD_RADIUS })
  )

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

// Fills its positioned parent as a background behind the content
const StarsCanvas = () => {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)
  const paused = useScenesPaused()

  // The stars animate every frame, so stop rendering while they are off screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }} frameloop={inView && !paused ? 'always' : 'never'}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  )
}

export default StarsCanvas
