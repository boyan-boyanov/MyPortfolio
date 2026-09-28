import React, { Suspense, useEffect, useRef, useState } from 'react'
import '../customStyles/Computers.css'
import { Spherical, Vector3 } from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'

// 1 = original colors, 0 = black and white
const SATURATION = 0.7
// 1 = original glow of the RGB parts, 0 = no glow
const EMISSIVE_INTENSITY = 0.6
// How long after the user lets go of the model it returns to its starting view
const RESET_DELAY = 5000

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
        scale={isMobile ? 0.3 : 0.75}
        position={isMobile ? [0, -0.5, -0.5] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

// OrbitControls that glide back to the starting view RESET_DELAY ms after the user lets go
const ResettingControls = (props) => {
  const controls = useRef(null)
  const camera = useThree((state) => state.camera)
  const invalidate = useThree((state) => state.invalidate)
  const home = useRef(null)
  const resetting = useRef(false)
  const timer = useRef(null)
  const [offset] = useState(() => new Vector3())
  const [current] = useState(() => new Spherical())

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleStart = () => {
    clearTimeout(timer.current)
    resetting.current = false
    // Remember the view right before the first interaction
    if (!home.current) {
      home.current = {
        target: controls.current.target.clone(),
        offset: new Spherical().setFromVector3(offset.copy(camera.position).sub(controls.current.target)),
      }
    }
  }

  const handleEnd = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      resetting.current = true
      invalidate()
    }, RESET_DELAY)
  }

  useFrame((_, delta) => {
    if (!resetting.current || !home.current) return
    const orbit = controls.current
    // Frame-rate independent easing: covers ~95% of the way in about one second
    const t = 1 - Math.pow(0.05, delta)

    // Rotate around the target instead of moving in a straight line through the model
    current.setFromVector3(offset.copy(camera.position).sub(orbit.target))
    let dTheta = home.current.offset.theta - current.theta
    dTheta = Math.atan2(Math.sin(dTheta), Math.cos(dTheta)) // shortest way around
    current.theta += dTheta * t
    current.phi += (home.current.offset.phi - current.phi) * t
    current.radius += (home.current.offset.radius - current.radius) * t

    orbit.target.lerp(home.current.target, t)
    camera.position.setFromSpherical(current).add(orbit.target)
    orbit.update()

    const done = Math.abs(dTheta) < 0.001 && orbit.target.distanceTo(home.current.target) < 0.001
    if (done) {
      resetting.current = false
    } else {
      invalidate() // frameloop='demand': keep requesting frames until the animation ends
    }
  })

  return <OrbitControls ref={controls} onStart={handleStart} onEnd={handleEnd} {...props} />
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
