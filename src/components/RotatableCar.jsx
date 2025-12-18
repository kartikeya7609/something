import { useRef, useState, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import nvisionTexture from '../assets/Nvision_1st_slide.jpg'

function Car({ isDragging }) {
  const carRef = useRef()
  const texture = useLoader(THREE.TextureLoader, nvisionTexture)
  
  // Configure texture
  useMemo(() => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1, 1)
  }, [texture])
  
  // Auto-rotate when not being dragged
  useFrame((state, delta) => {
    if (carRef.current && !isDragging) {
      carRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={carRef}>
      {/* Main Car Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.9, 1.4]} />
        <meshStandardMaterial 
          map={texture}
          metalness={0.3} 
          roughness={0.4}
          envMapIntensity={1.0}
        />
      </mesh>

      {/* Car Roof */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.7, 1.2]} />
        <meshStandardMaterial 
          map={texture}
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Front Windshield */}
      <mesh position={[0.4, 0.5, 0]} castShadow>
        <boxGeometry args={[0.15, 0.6, 1.0]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.4}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>

      {/* Rear Windshield */}
      <mesh position={[-0.4, 0.5, 0]} castShadow>
        <boxGeometry args={[0.15, 0.6, 1.0]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.4}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>

      {/* Front Bumper */}
      <mesh position={[1.6, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.5, 1.5]} />
        <meshStandardMaterial 
          map={texture}
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Rear Bumper */}
      <mesh position={[-1.6, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.5, 1.5]} />
        <meshStandardMaterial 
          map={texture}
          metalness={0.3} 
          roughness={0.4}
        />
      </mesh>

      {/* Front Grille */}
      <mesh position={[1.55, 0.1, 0]} castShadow>
        <boxGeometry args={[0.1, 0.3, 1.2]} />
        <meshStandardMaterial 
          color="#2a2a3e" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>

      {/* Wheels */}
      {[
        { pos: [1.0, -0.5, 0.75] },
        { pos: [-1.0, -0.5, 0.75] },
        { pos: [1.0, -0.5, -0.75] },
        { pos: [-1.0, -0.5, -0.75] },
      ].map((wheel, i) => (
        <group key={i} position={wheel.pos}>
          {/* Wheel Rim */}
          <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.25, 32]} />
            <meshStandardMaterial 
              color="#c0c0c0" 
              metalness={1} 
              roughness={0.05}
            />
          </mesh>
          {/* Tire */}
          <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.3, 32]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
          </mesh>
          {/* Rim Detail */}
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.26, 16]} />
            <meshStandardMaterial 
              color="#e0e0e0" 
              metalness={1} 
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Headlights */}
      <mesh position={[1.6, 0.2, 0.45]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffcc" 
          emissive="#ffffaa" 
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[1.6, 0.2, -0.45]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffcc" 
          emissive="#ffffaa" 
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Side Mirrors */}
      <mesh position={[0.7, 0.4, 0.7]} castShadow>
        <boxGeometry args={[0.2, 0.12, 0.12]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.7, 0.4, -0.7]} castShadow>
        <boxGeometry args={[0.2, 0.12, 0.12]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Spoiler */}
      <mesh position={[-1.5, 0.6, 0]} castShadow>
        <boxGeometry args={[0.15, 0.25, 1.3]} />
        <meshStandardMaterial map={texture} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Side Skirts */}
      <mesh position={[0, -0.3, 0.75]} castShadow>
        <boxGeometry args={[2.5, 0.1, 0.05]} />
        <meshStandardMaterial map={texture} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.3, -0.75]} castShadow>
        <boxGeometry args={[2.5, 0.1, 0.05]} />
        <meshStandardMaterial map={texture} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Hood Details */}
      <mesh position={[0.8, 0.15, 0]} castShadow>
        <boxGeometry args={[0.05, 0.05, 0.8]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

export default function RotatableCar() {
  const controlsRef = useRef()
  const [isDragging, setIsDragging] = useState(false)

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, 6]} fov={60} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2.0} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={1.0} />
      <pointLight position={[0, 5, 0]} intensity={0.8} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.8} />
      <spotLight position={[-10, 5, -10]} angle={0.4} penumbra={1} intensity={0.5} />
      
      <Car isDragging={isDragging} />
      
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={10}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={false}
        onStart={() => setIsDragging(true)}
        onEnd={() => setIsDragging(false)}
      />
    </>
  )
}
