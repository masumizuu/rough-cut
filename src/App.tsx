import { Canvas } from '@react-three/fiber'
import { Loader, OrbitControls, useProgress } from '@react-three/drei'
import Experience from './Experience'
import LoadingScreen from './components/LoadingScreen'
import ExitButton from './components/ExitButton'
import InstructionOverlay from './components/InstructionOverlay'
import { useEffect, useState } from 'react'
import { Phase } from './types'
import TitleOverlay from './components/TitleOverlay'

function Loading({ onFinish }: { onFinish: () => void }) {
  const { active, progress } = useProgress()
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (!active && progress === 100) {
      setFadeOut(true)
      const timeout = setTimeout(() => {
        setVisible(false)
        onFinish() // notify App that loading is complete
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [active, progress, onFinish])

  if (!visible) return null

  return <LoadingScreen percentage={progress.toFixed(0)} fadeOut={fadeOut} />
}

const getInstruction = (phase: Phase) => {
  switch (phase) {
    case 'start': return 'Click anywhere on the TV to start'
    case 'vhs': return 'Insert VHS cassettes into the VCR to view them'
    case 'tv-closeup': return ''
    case 'tv-content': return ''
    default: return ''
  }
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('start')
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [titleShown, setTitleShown] = useState(true)
  const [titleFadeOut, setTitleFadeOut] = useState(false)

  const handleGlobalClick = () => {
    if (titleShown) {
      setTitleFadeOut(true)
      setTimeout(() => {
        setTitleShown(false)
      }, 1000) // match fade-out duration
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden"  onClick={handleGlobalClick}>
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 60 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <OrbitControls />
        <Experience phase={phase} />
      
      </Canvas>

      <Loader />
      <Loading onFinish={() => setLoadingComplete(true)} />

      {loadingComplete && getInstruction(phase) && (
        <InstructionOverlay text={getInstruction(phase)} />
      )}

      {titleShown && (
        <TitleOverlay fadeOut={titleFadeOut}/>
      )}

      {getInstruction(phase) && (
        <InstructionOverlay text={getInstruction(phase)} />
      )}

      {phase === 'tv-content' && (
        <ExitButton onClick={() => setPhase('vhs')} />
      )}
    </div>
  )
}