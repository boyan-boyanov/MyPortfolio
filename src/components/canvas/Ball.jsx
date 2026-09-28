import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Decal,
  Float,
  OrbitControls,
  PerspectiveCamera,
  Preload,
  useTexture,
  View,
} from '@react-three/drei'

// useTexture suspends while the icon loads, so this component must render inside <Suspense>
const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl])

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* The technology logo printed on the front of the ball */}
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  )
}

// A normal page element; BallsCanvas draws the ball inside its box.
// Each view gets its own camera so OrbitControls rotates only this ball.
export const BallView = ({ icon, className }) => {
  return (
    <View className={className}>
      {/* Same camera a standalone <Canvas> gets by default */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      {/* Rotate only: panning (right mouse button) would move the ball out of its box */}
      <OrbitControls enableZoom={false} enablePan={false} />
      <Suspense fallback={null}>
        <Ball imgUrl={icon} />
      </Suspense>
    </View>
  )
}

// One shared WebGL canvas that renders every BallView on the page,
// instead of one canvas per ball (browsers allow only ~16 at a time).
// It covers the viewport, so it is hidden while its section is off screen.
export const BallsCanvas = ({ eventSource, active = true }) => {
  return (
    <Canvas
      eventSource={eventSource}
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 2]}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        visibility: active ? 'visible' : 'hidden',
      }}
    >
      <View.Port />
      <Preload all />
    </Canvas>
  )
}
