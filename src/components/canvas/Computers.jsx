import React, { Suspense, useEffect } from 'react'
import '../customStyles/Computers.css'
import { Canvas, useThree } from '@react-three/fiber'
import { Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'
import ResettingControls from './ResettingControls'

// 1 = original colors, 0 = black and white
const SATURATION = 0.7
// 1 = original glow of the RGB parts, 0 = no glow
const EMISSIVE_INTENSITY = 0.6
// How long after the user lets go of the model it returns to its starting view
const RESET_DELAY = 5000
// How long the glide back to the starting view takes, in seconds
const RESET_DURATION = 1.5

//scetchfab.com for more 3D models
// useGLTF suspends while the model loads, so this component must render inside <Suspense>
const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    computer.scene.traverse((child) => {
      if (!child.isMesh || child.material.userData.desaturated) return
      const material = child.material
      material.userData.desaturated = true

      if (material.emissive) {
        material.emissiveIntensity = EMISSIVE_INTENSITY
      }

      // Blend the final pixel color toward gray; works for plain colors and textures alike
      material.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <dithering_fragment>',
          `#include <dithering_fragment>
          float gray = dot(gl_FragColor.rgb, vec3(0.2126, 0.7152, 0.0722));
          gl_FragColor.rgb = mix(vec3(gray), gl_FragColor.rgb, ${SATURATION.toFixed(2)});`
        )
      }
      material.needsUpdate = true
    })
    // frameloop='demand' only redraws on request, so ask for a new frame after changing materials
    invalidate()
  }, [computer, invalidate])

  return (
    <mesh>
      {/* Lights */}
      <hemisphereLight intensity={5.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* 3D object properties */}
      <primitive object={computer.scene}
        scale={isMobile ? 0.3 : 0.60}
        position={isMobile ? [0, -0.3, -0.5] : [0, -2.05, -1.05]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = ({ isMobile }) => {

  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ResettingControls
          delay={RESET_DELAY}
          duration={RESET_DURATION}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas
