import React, { Component, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { Box3, Euler, Matrix4, PMREMGenerator, Quaternion, Vector3 } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import '../customStyles/Computers.css'
import { Canvas, useThree } from '@react-three/fiber'
import { Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'
import ResettingControls from './ResettingControls'
import { INITIAL_MODEL_ID, modelConfigs } from './models'
import { createDisplayCounts, incrementCount, pickNextModelId } from '../../utils/pickNextModel'

// How long after the user lets go of the model it returns to its starting view
const RESET_DELAY = 5000
// How long the glide back to the starting view takes, in seconds
const RESET_DURATION = 1.5

// The models and their settings are in models.js
const findModel = (id) => modelConfigs.find((model) => model.id === id)

// useGLTF suspends while the model loads, so this component must render inside <Suspense>
// How much of the canvas width the model may fill (1 = touches the edges); the model is scaled
// and placed at the bottom of the canvas, so it works on any screen size without breakpoints
const FIT_WIDTH = 0.9
// Space between the text above and the top of the model, in pixels
const TOP_GAP = 32
// Space between the desk's front edge and the bottom of the canvas (share of the canvas height)
const BOTTOM_GAP = 0.03

// The model's meshes (with their place inside the model) and its size and center at scale 1,
// measured with the model's own transform cleared
const measure = (scene) => {
  const saved = { scale: scene.scale.clone(), rotation: scene.rotation.clone(), position: scene.position.clone() }
  scene.scale.set(1, 1, 1)
  scene.rotation.set(0, 0, 0)
  scene.position.set(0, 0, 0)
  scene.updateMatrixWorld(true)
  const box = new Box3().setFromObject(scene)
  const meshes = []
  scene.traverse((child) => {
    if (child.isMesh) meshes.push({ positions: child.geometry.attributes.position, matrix: child.matrixWorld.clone() })
  })
  scene.scale.copy(saved.scale)
  scene.rotation.copy(saved.rotation)
  scene.position.copy(saved.position)
  scene.updateMatrixWorld(true)
  return { meshes, size: box.getSize(new Vector3()), center: box.getCenter(new Vector3()) }
}

// Lowest and highest point of the model on screen, from -1 (bottom edge of the canvas) to 1 (top edge).
// Uses the real vertices, not a bounding box: cables hidden behind the desk hang lower than its
// front edge, and a box would count them as if they were visible
const screenSpan = (meshes, placement, camera) => {
  const matrix = new Matrix4()
  const point = new Vector3()
  let bottom = Infinity
  let top = -Infinity
  for (const mesh of meshes) {
    matrix.multiplyMatrices(placement, mesh.matrix)
    for (let i = 0; i < mesh.positions.count; i++) {
      const y = point.fromBufferAttribute(mesh.positions, i).applyMatrix4(matrix).project(camera).y
      bottom = Math.min(bottom, y)
      top = Math.max(top, y)
    }
  }
  return { bottom, top }
}

// onModelResize gets the model's height on screen and the canvas height it needs (in pixels),
// so the HTML around it can follow
const Computers = ({ model, onModelResize }) => {
  const computer = useGLTF(model.url)
  const invalidate = useThree((state) => state.invalidate)
  // Visible area (in 3D units) at the orbit target; updates when the canvas is resized
  const viewport = useThree((state) => state.viewport)
  const camera = useThree((state) => state.camera)
  const canvasHeight = useThree((state) => state.size.height)
  const bounds = useMemo(() => measure(computer.scene), [computer])

  // Scale the model to fit the canvas and put the desk's front edge near its bottom,
  // where the scroll hint (positioned in Hero.css) sits on it
  const { scale, position, modelHeight, idealHeight } = useMemo(() => {
    camera.updateMatrixWorld()
    const rotation = new Quaternion().setFromEuler(new Euler(...model.rotation))
    const placement = new Matrix4()
    const span = (scale, offset) =>
      screenSpan(bounds.meshes, placement.compose(offset, rotation, new Vector3(scale, scale, scale)), camera)

    // The user can spin the model, so its widest side seen from above must fit too
    const widthScale = (viewport.width * FIT_WIDTH) / Math.hypot(bounds.size.x, bounds.size.z)
    // Screen height goes from -1 to 1, so the full canvas height is 2
    const { bottom, top } = span(widthScale, bounds.center.clone().multiplyScalar(-widthScale))
    const room = 2 * (1 - BOTTOM_GAP) - (2 * TOP_GAP) / canvasHeight
    const scale = Math.min(widthScale, (widthScale * room) / (top - bottom))

    const offset = bounds.center.clone().multiplyScalar(-scale)
    // Perspective makes one step slightly off, the second one lands it
    for (let step = 0; step < 2; step++) {
      const { bottom } = span(scale, offset)
      // Screen units to 3D units at the orbit target
      offset.y -= ((bottom + 1 - BOTTOM_GAP * 2) * viewport.height) / 2
    }
    // Model height in pixels when it fills the canvas width; it doesn't depend on the canvas height
    const fullWidthHeight = ((top - bottom) / 2) * canvasHeight
    return {
      scale,
      position: offset.toArray(),
      modelHeight: Math.round((fullWidthHeight * scale) / widthScale),
      // Canvas height that fits the model at full width with the gaps around it; any taller
      // would only add empty space above the model
      idealHeight: Math.round((fullWidthHeight + TOP_GAP) / (1 - BOTTOM_GAP)),
    }
  }, [bounds, camera, viewport, canvasHeight, model.rotation])

  useEffect(() => {
    onModelResize?.({ modelHeight, idealHeight })
  }, [onModelResize, modelHeight, idealHeight])

  useEffect(() => {
    computer.scene.traverse((child) => {
      if (!child.isMesh || child.material.userData.desaturated) return
      const material = child.material
      material.userData.desaturated = true

      if (material.emissive) {
        material.emissiveIntensity = model.emissiveIntensity
      }

      // Blend the final pixel color toward gray; works for plain colors and textures alike
      material.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <dithering_fragment>',
          `#include <dithering_fragment>
          float gray = dot(gl_FragColor.rgb, vec3(0.2126, 0.7152, 0.0722));
          gl_FragColor.rgb = mix(vec3(gray), gl_FragColor.rgb, ${model.saturation.toFixed(2)});`
        )
      }
      material.needsUpdate = true
    })
    // frameloop='demand' only redraws on request, so ask for a new frame after changing materials
    invalidate()
  }, [computer, invalidate, model.emissiveIntensity, model.saturation])

  return (
    <mesh>
      {/* Lights */}
      <hemisphereLight intensity={model.lights.hemisphere} groundColor="black" />
      <pointLight intensity={model.lights.point} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={model.lights.spot}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* 3D object properties */}
      <primitive object={computer.scene}
        scale={scale}
        position={position}
        rotation={model.rotation}
      />
    </mesh>
  )
}

// Soft studio reflections built locally from three's RoomEnvironment (no HDR file to download)
const StudioEnvironment = ({ intensity }) => {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    if (!intensity) return
    const pmrem = new PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const texture = pmrem.fromScene(room, 0.04).texture
    scene.environment = texture
    scene.environmentIntensity = intensity
    invalidate()
    return () => {
      scene.environment = null
      texture.dispose()
      room.dispose()
      pmrem.dispose()
    }
  }, [gl, scene, invalidate, intensity])

  return null
}

// Downloads the next model without showing it, so the current one stays on screen until it is ready.
// useGLTF caches the result, so the visible model then appears without loading again
const ModelPreloader = ({ url, onLoaded }) => {
  useGLTF(url)
  useEffect(() => {
    onLoaded()
  }, [onLoaded])
  return null
}

// Catches a model that fails to download or parse, so the scene keeps the current model
class LoadErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.error(error)
    this.props.onError()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

const ComputersCanvas = ({ onModelResize }) => {
  // One state object, so the shown model, the one loading and the counts always change together.
  // Counts last for this page session only: a reload starts again from the first model
  const [models, setModels] = useState(() => ({
    currentId: INITIAL_MODEL_ID,
    pendingId: null,
    counts: createDisplayCounts(modelConfigs, INITIAL_MODEL_ID),
    failedIds: [],
    failed: false,
  }))
  const current = findModel(models.currentId)
  const pending = models.pendingId ? findModel(models.pendingId) : null
  const hasOtherModel = modelConfigs.some(({ id }) => id !== models.currentId && !models.failedIds.includes(id))

  // Picked here in the click handler, not inside a state updater, so Strict Mode can't pick twice
  const handleRandomize = () => {
    if (models.pendingId) return
    const nextId = pickNextModelId({
      models: modelConfigs,
      counts: models.counts,
      currentId: models.currentId,
      excludedIds: models.failedIds,
    })
    if (!nextId || nextId === models.currentId) return
    setModels((prev) =>
      prev.pendingId ? prev : { ...prev, pendingId: nextId, counts: incrementCount(prev.counts, nextId), failed: false }
    )
  }

  const handleLoaded = useCallback(() => {
    setModels((prev) => (prev.pendingId ? { ...prev, currentId: prev.pendingId, pendingId: null } : prev))
  }, [])

  // A model that fails is left out of the next picks for this session
  const handleFailed = useCallback(() => {
    setModels((prev) =>
      prev.pendingId
        ? { ...prev, pendingId: null, failedIds: [...prev.failedIds, prev.pendingId], failed: true }
        : prev
    )
  }, [])

  return (
    <>
      <Canvas
        frameloop='demand'
        shadows
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <ResettingControls
            resetKey={current.id}
            delay={RESET_DELAY}
            duration={RESET_DURATION}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <StudioEnvironment intensity={current.environment} />
          {/* The key gives every model a fresh component, so none of the previous model's state carries over */}
          <Computers key={current.id} model={current} onModelResize={onModelResize} />
        </Suspense>

        {pending && (
          <LoadErrorBoundary key={pending.id} onError={handleFailed}>
            <Suspense fallback={null}>
              <ModelPreloader url={pending.url} onLoaded={handleLoaded} />
            </Suspense>
          </LoadErrorBoundary>
        )}

        <Preload all />
      </Canvas>

      {/* Bottom-right corner of the 3D stage. Below md the model fills the whole stage, so the button
          sits just under it instead (Hero.css leaves room for it). Only the button takes clicks,
          so dragging the model and scrolling work everywhere else */}
      {modelConfigs.length > 1 && (
        <div className='pointer-events-none absolute right-5 top-full mt-1.5 md:top-auto md:mt-0 md:right-6 md:bottom-6 z-10 flex flex-col items-end gap-1.5'>
          {/* Shown from lg up, where the corner is free; an error shows on every screen */}
          <p
            aria-live='polite'
            className={`${models.failed ? 'block' : 'hidden lg:block'} text-[11px] uppercase tracking-[0.12em] text-secondary/70`}
          >
            {models.failed ? 'Model unavailable' : current.name}
          </p>
          <button
            type='button'
            onClick={handleRandomize}
            disabled={Boolean(pending) || !hasOtherModel}
            aria-busy={Boolean(pending)}
            aria-label='Randomize 3D – display another 3D model'
            className='pointer-events-auto rounded-lg border border-[#915eff]/40 bg-primary/70 px-3.5 py-2 text-[13px] font-medium text-secondary backdrop-blur-sm transition-colors hover:border-[#915eff]/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary disabled:cursor-not-allowed disabled:opacity-60 aria-busy:cursor-wait'
          >
            {pending ? 'Loading 3D…' : 'Randomize 3D'}
          </button>
        </div>
      )}
    </>
  )
}

export default ComputersCanvas
