import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { ExperienceProps, Phase } from './types'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'


export default function Experience({ phase }: ExperienceProps) {
    // Add screen area light
    const width = 2
    const height = 1.5
    const intensity = 300
    const screenLight = new THREE.RectAreaLight(0x87ceeb, intensity, width, height)
    const screenLightRef = useRef<THREE.RectAreaLight>(null!)

    const group = useRef<THREE.Group>(null)
    const cameraPositions: Record<Phase, { position: [number, number, number]; lookAt: [number, number, number] }> = {
    start: { position: [0, 7, -7], lookAt: [0, 7, 7] },
    vhs: {position: [0, 0, 5], lookAt: [0, -1, 0]},
    'tv-closeup': {position: [0, 1.5, 2], lookAt: [0, 1, 0]},
    'tv-content': {position: [0, 1.3, 0.1], lookAt: [0, 1.3, 0]},
    }
    const { camera } = useThree()
    const { scene } = useGLTF('/concept.glb') // Ensure concept.glb is in /public
    const { position } = useSpring({
    position: cameraPositions[phase].position,
    config: { mass: 2, tension: 100, friction: 40 },
    })
    
    useFrame(() => {
        position.get().forEach((v, i) => {
        camera.position.setComponent(i, v)
    })
    camera.lookAt(...cameraPositions[phase].lookAt)
    })

    useEffect(() => {
    scene.traverse((child) => {
        if ((child as any).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        }
    })

    // add light to scene
    screenLight.position.set(0, 0, -7.5) // adjust based on actual screen position
    screenLight.lookAt(0, 0, 0) // aim at the center of the room
    scene.add(screenLight)
    screenLightRef.current = screenLight

    // ✅ Center the model at (0,0,0)
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    scene.position.sub(center)
    scene.rotation.x = -Math.PI
    }, [scene])

    // glitch fx
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()
        if (screenLightRef.current) {
            // Burst timing logic
            const burstInterval = 1 // every 5 seconds
            const burstDuration = 2 // 1 second flicker

            const inBurst = (time % burstInterval) < burstDuration

            if (inBurst) {
                // During burst: erratic flicker
                const base = 1 + Math.sin(time * 30) * 0.2
                const random = (Math.random() - 0.5) * 5
                screenLightRef.current.intensity = 80 * (base + random)
            } else {
                // Outside burst: stable screen
                screenLightRef.current.intensity = 80
            }

            const hueShift = (Math.sin(time * 5) * 0.05)
            screenLightRef.current.color.setHSL(0.55 + hueShift, 1, 0.6)
        }
        
    })

    // sound fx
    useEffect(() => {
        const audio = new Audio('/static.mp3')
        audio.loop = true // 🔁 loop it
        audio.volume = 0.6
        audio.play().catch((e) => {
        console.warn('Audio playback blocked until user interaction.', e)
        })
    }, [])

    // useEffect(() => {
    // const audio = new Audio('/static.mp3')

    // const unlock = () => {
    //     audio.play()
    //     window.removeEventListener('click', unlock)
    // }

    // window.addEventListener('click', unlock)
    // }, [])


    return (
        <group ref={group}>
        <primitive object={scene} />
        
        {/* Simulated lighting (lamp + screen glow) */}
        <pointLight
            position={[0, 7, 7.7374]} // Converted from Blender
            intensity={100}
            distance={20}
            decay={2}
            color="#87CEEB"
            castShadow
            />
        </group>
    )
}
