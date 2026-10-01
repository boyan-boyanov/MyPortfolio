import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'
import { useScenesPaused } from '../../utils/scenePause'

// useGLTF suspends while the model loads, so this component must render inside <Suspense>
const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf')

  return <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
}

const EarthCanvas = () => {
  const paused = useScenesPaused()

  return (
    <Canvas
      shadows
      // Paused (e.g. a modal is open): stop drawing; the controls would otherwise keep requesting frames
      frameloop={paused ? 'never' : 'demand'}
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* autoRotate keeps requesting frames on its own, even with frameloop='demand' */}
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default EarthCanvas
