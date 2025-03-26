export default function InstructionOverlay({ text }: { text: string }) {
  return (
    <div className="absolute top-6 w-full text-center z-10 pointer-events-none">
      <p className="text-white text-lg font-light tracking-widest uppercase font-mono"
      style={{
        textShadow: '0 0 8px #BFEFFF', // Baby blue glow
      }}>
        {text}</p>
    </div>
  )
}