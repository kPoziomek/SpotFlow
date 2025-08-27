import { PiWavesLight } from "react-icons/pi";

export default function UserMenu () {
  return(
    <nav className="flex items-center">
      <button
        className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white p-3 rounded-full mr-2 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-cyan-200"
      >
        <PiWavesLight />
      </button>
    </nav>
  )
}
