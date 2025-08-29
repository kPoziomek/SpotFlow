import Link from "next/link";
import {FaMapMarkerAlt, FaSearch} from "react-icons/fa";

export default function SpotNotFoundActions(){
  return(
    <div className="space-y-4">
      <Link
        href="/spots"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
      >
        <FaMapMarkerAlt className="w-4 h-4" />
        Zobacz wszystkie spoty
      </Link>
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors duration-200"
        >
          <FaSearch className="w-4 h-4" />
          Nowe wyszukiwanie
        </Link>
      </div>
    </div>

  )
}
