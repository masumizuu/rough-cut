import { TitleOverlayProps } from '../types'

function TitleOverlay({ fadeOut = false }: TitleOverlayProps) {
  return (
    <div className={`absolute bottom-4 left-4 w-max z-10 pointer-events-none flex flex-col transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        {/* title */}
      <p className="text-white text-6xl tracking-widest uppercase"
      style={{
        textShadow: '0 0 8px #BFEFFF', // Baby blue glow
        fontFamily: 'Rubik Glitch, system-ui'
      }}>
        rough cut</p>
    
    {/* subtitle */}
    <p className="text-white text-xl tracking-widest font-mono">
        unfinished, unpolished, but real.<br/>
        a portfolio by ceanne "masumizuu" arenas.<br/>
        (this is still being developed...)</p>
    </div>
  )
}

export default TitleOverlay