import React, { Suspense, useEffect, useState } from 'react'
import '../customStyles/Computers.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'
import { log } from 'three'

const Computers = ({isMobile}) => {
  //scetchfab.com for more 3D models  
  // const [isMobile, setIsMobile] = useState(false)
  const computer = useGLTF('./desktop_pc/scene.gltf') 
  
  // useEffect(()=>{
  //   //Add a listener for changes to the screen size
  //   const mediaQuert = window.matchMedia('(max-width: 640px)')

  //   //set the initial value of the "isMobile" state variable
  //   setIsMobile(mediaQuert.matches)

  //   //Define a callback function to handle changes to the media query
  //   const handleMediaQueryChange = (event) => {
  //     setIsMobile(event.matches)
  //   }

  //   //Add the callback function as a listene for changes to the media query
  //   mediaQuert.addEventListener('change', handleMediaQueryChange);

  //   //remove the listener when the component is unmounted
  //   return () => {
  //     mediaQuert.removeEventListener('change', handleMediaQueryChange)
  //   }
  // },[])


  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* Lights */}
        {/* <mesh> */}
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
            scale={isMobile ? 0.5 : 0.75}             
            position={isMobile ? [0, -2, -1.2] : [0, -3.25, -1.5]}
            rotation={[-0.01, -0.2, -0.1]}
          />
        {/* </mesh>        */}
      </Suspense>

      <Preload all />
    </Canvas>
  )
}


export default Computers