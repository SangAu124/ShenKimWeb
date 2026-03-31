'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'

function RoomShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#0b1020" />
      </mesh>

      <mesh position={[0, 2.8, -6]} receiveShadow>
        <boxGeometry args={[16, 8, 0.3]} />
        <meshStandardMaterial color="#0d1424" />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-8, 2.8, 0]} receiveShadow>
        <boxGeometry args={[12, 8, 0.3]} />
        <meshStandardMaterial color="#0c1322" />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} position={[8, 2.8, 0]} receiveShadow>
        <boxGeometry args={[12, 8, 0.3]} />
        <meshStandardMaterial color="#0c1322" />
      </mesh>
    </group>
  )
}

function Monitor() {
  return (
    <group position={[0, 1.2, -1.5]}>
      <RoundedBox args={[7.2, 4.2, 0.24]} radius={0.12} smoothness={4} castShadow>
        <meshStandardMaterial color="#111827" metalness={0.35} roughness={0.4} />
      </RoundedBox>

      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[6.4, 3.5]} />
        <meshBasicMaterial color="#050816" />
      </mesh>

      <mesh position={[0, -2.55, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 1.5, 24]} />
        <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.45} />
      </mesh>

      <mesh position={[0, -3.35, 0.1]} rotation={[-0.12, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.25, 1.5, 0.18, 32]} />
        <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.55} />
      </mesh>
    </group>
  )
}

function AccentObjects() {
  return (
    <group>
      <mesh position={[-3.6, -0.15, 1.2]} castShadow>
        <boxGeometry args={[1.5, 0.25, 1.5]} />
        <meshStandardMaterial color="#172033" />
      </mesh>
      <mesh position={[3.9, -0.1, 0.8]} castShadow>
        <boxGeometry args={[1.2, 0.2, 1.2]} />
        <meshStandardMaterial color="#1b2540" />
      </mesh>
      <mesh position={[4.2, 1.2, -3.8]} castShadow>
        <boxGeometry args={[1.2, 2.4, 0.8]} />
        <meshStandardMaterial color="#131c2f" />
      </mesh>
    </group>
  )
}

export function WorldRoomCanvas() {
  return (
    <Canvas shadows camera={{ position: [0, 2.4, 8.5], fov: 42 }}>
      <color attach="background" args={['#05070d']} />
      <fog attach="fog" args={['#05070d', 8, 22]} />
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 10, 6]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 3.2, -1]} intensity={2.2} color="#7c8dff" />

      <RoomShell />
      <Monitor />
      <AccentObjects />

      <OrbitControls enablePan={false} minDistance={6} maxDistance={11} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  )
}
