import React, { useState, useEffect } from 'react'
import { Html, useProgress } from '@react-three/drei'

const Loader = () => {
const [loading, setLoading] = useState(true);
const {progress} = useProgress()
  useEffect(() => {
    // simulate loading for 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;
  console.log('Loader rendered');  

  return (
    <Html>
      <span className='canvas-loader'></span>
      <p style={{ fontSize: 14, color: '#f1f1f1', fontWeight: 800, marginTop: 40 }}>{progress.toFixed(2)}%</p>
    </Html>
  )
}

export default Loader