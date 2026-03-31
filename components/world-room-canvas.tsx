'use client'

import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function CameraAnimator({
  animateIn,
  onComplete,
}: {
  animateIn: boolean
  onComplete?: () => void
}) {
  const { camera } = useThree()
  const progressRef = useRef(0)
  const doneRef = useRef(false)
  const DURATION = 2.2

  const startPos = useRef(new THREE.Vector3(0, 1.2, 3.2))
  const endPos = useRef(new THREE.Vector3(0, 2.4, 8.5))
  const lookAtStart = useRef(new THREE.Vector3(0, 1.2, -1.5))
  const lookAtEnd = useRef(new THREE.Vector3(0, 1.5, 0))
  const tempLook = useRef(new THREE.Vector3())

  useEffect(() => {
    if (animateIn) {
      camera.position.copy(startPos.current)
      camera.lookAt(lookAtStart.current)
      progressRef.current = 0
      doneRef.current = false
    }
  }, [animateIn, camera])

  useFrame((_, delta) => {
    if (!animateIn || doneRef.current) return
    progressRef.current = Math.min(progressRef.current + delta / DURATION, 1)
    const t = easeOutExpo(progressRef.current)
    camera.position.lerpVectors(startPos.current, endPos.current, t)
    tempLook.current.lerpVectors(lookAtStart.current, lookAtEnd.current, t)
    camera.lookAt(tempLook.current)
    if (progressRef.current >= 1) {
      doneRef.current = true
      onComplete?.()
    }
  })

  return null
}

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

function Monitor({ captureCanvas }: { captureCanvas?: HTMLCanvasElement | null }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null)

  const texture = useMemo(() => {
    if (!captureCanvas) return null
    const t = new THREE.CanvasTexture(captureCanvas)
    t.colorSpace = THREE.SRGBColorSpace
    t.needsUpdate = true
    return t
  }, [captureCanvas])

  // R3F reconciler doesn't always trigger material.needsUpdate when map changes.
  // Explicitly push the texture and force re-upload every time it changes.
  useEffect(() => {
    const mat = matRef.current
    if (!mat) return
    mat.map = texture
    mat.color.set(texture ? 0xffffff : 0x050816)
    mat.needsUpdate = true
  }, [texture])

  return (
    <group position={[0, 1.2, -1.5]}>
      <RoundedBox args={[7.2, 4.2, 0.24]} radius={0.12} smoothness={4} castShadow>
        <meshStandardMaterial color="#111827" metalness={0.35} roughness={0.4} />
      </RoundedBox>

      <mesh position={[0, 0, 0.16]}>
        <planeGeometry args={[6.4, 3.5]} />
        <meshBasicMaterial
          ref={matRef}
          map={texture ?? undefined}
          color={texture ? '#ffffff' : '#050816'}
          toneMapped={false}
        />
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

export function WorldRoomCanvas({
  captureCanvas,
  animateIn,
  onAnimationComplete,
}: {
  captureCanvas?: HTMLCanvasElement | null
  animateIn?: boolean
  onAnimationComplete?: () => void
}) {
  const initPos: [number, number, number] = animateIn ? [0, 1.2, 3.2] : [0, 2.4, 8.5]

  return (
    <Canvas shadows camera={{ position: initPos, fov: 42, near: 0.1, far: 50 }}>
      <color attach="background" args={['#05070d']} />
      <fog attach="fog" args={['#05070d', 8, 22]} />
      <ambientLight intensity={1.05} />
      <directionalLight
        position={[5, 10, 6]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[0, 2.6, -1.1]} intensity={3.6} color="#9fb3ff" />

      <RoomShell />
      <Monitor captureCanvas={captureCanvas} />
      <AccentObjects />

      {animateIn && (
        <CameraAnimator animateIn onComplete={onAnimationComplete} />
      )}

      <OrbitControls
        enabled={!animateIn}
        enablePan={false}
        minDistance={6}
        maxDistance={11}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  )
}
