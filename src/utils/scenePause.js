import { useSyncExternalStore } from 'react'

// Shared "pause the 3D backgrounds" switch, e.g. while a modal is open.
// It is a counter, so overlapping requests (two modals) only resume when all of them are done.
let pauseCount = 0
const listeners = new Set()

const notify = () => listeners.forEach((listener) => listener())

// Call to pause; returns a function that releases this pause request
export const pauseScenes = () => {
  pauseCount += 1
  notify()

  let released = false
  return () => {
    if (released) return
    released = true
    pauseCount -= 1
    notify()
  }
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// true while at least one pause request is active
export const useScenesPaused = () => useSyncExternalStore(subscribe, () => pauseCount > 0)
