function ExitButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-6 right-6 z-50 bg-white text-black px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition"
    >
      Exit
    </button>
  )
}

export default ExitButton
