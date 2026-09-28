import React, { useEffect, useRef, useState } from 'react'
import { Spherical, Vector3 } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { createResetGroup } from './resetGroup'

// Starts slow, speeds up, then slows down again
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// OrbitControls that glide back to the starting view `delay` ms after the user lets go.
// Pass a shared `group` (see createResetGroup) to give several controls one common timer.
const ResettingControls = ({ group, delay = 5000, duration = 1.5, ...props }) => {
  const controls = useRef(null)
  const camera = useThree((state) => state.camera)
  const invalidate = useThree((state) => state.invalidate)
  const home = useRef(null)
  const from = useRef(null)
  const elapsed = useRef(0)
  const resetting = useRef(false)
  const [offset] = useState(() => new Vector3())
  const [current] = useState(() => new Spherical())
  const [ownGroup] = useState(() => createResetGroup(delay))
  const resetGroup = group ?? ownGroup

  useEffect(() => {
    const member = {
      reset() {
        const orbit = controls.current
        // Nothing to do for controls the user never touched
        if (!home.current || !orbit) return
        // Snapshot where the camera is now; the animation blends from here to home
        from.current = {
          target: orbit.target.clone(),
          offset: new Spherical().setFromVector3(offset.copy(camera.position).sub(orbit.target)),
        }
        elapsed.current = 0
        resetting.current = true
        invalidate()
      },
    }
    const remove = resetGroup.add(member)
    return () => {
      remove()
      if (resetGroup === ownGroup) ownGroup.dispose()
    }
  }, [resetGroup, ownGroup, camera, invalidate, offset])

  const handleStart = () => {
    resetGroup.start()
    resetting.current = false
    // Remember the view right before the first interaction
    if (!home.current) {
      home.current = {
        target: controls.current.target.clone(),
        offset: new Spherical().setFromVector3(offset.copy(camera.position).sub(controls.current.target)),
      }
    }
  }

  const handleEnd = () => resetGroup.end()

  useFrame((_, delta) => {
    if (!resetting.current || !home.current) return
    const orbit = controls.current
    const start = from.current
    const end = home.current

    // With frameloop='demand' the first delta can be seconds long, so cap it to one frame
    elapsed.current += Math.min(delta, 1 / 30)
    const progress = Math.min(elapsed.current / duration, 1)
    const eased = easeInOutCubic(progress)

    // Rotate around the target instead of moving in a straight line through the model
    let dTheta = end.offset.theta - start.offset.theta
    dTheta = Math.atan2(Math.sin(dTheta), Math.cos(dTheta)) // shortest way around
    current.theta = start.offset.theta + dTheta * eased
    current.phi = start.offset.phi + (end.offset.phi - start.offset.phi) * eased
    current.radius = start.offset.radius + (end.offset.radius - start.offset.radius) * eased

    orbit.target.lerpVectors(start.target, end.target, eased)
    camera.position.setFromSpherical(current).add(orbit.target)
    orbit.update()

    if (progress < 1) {
      invalidate() // frameloop='demand': keep requesting frames until the animation ends
    } else {
      resetting.current = false
    }
  })

  return <OrbitControls ref={controls} onStart={handleStart} onEnd={handleEnd} {...props} />
}

export default ResettingControls
