import Link from "next/link";

export default function PopularSpotsList () {
  return(
    <div className="mt-12 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-3">
        Najpopularniejsze spoty
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        <Link
          href="/spots?country=Spain"
          className="px-3 py-1 bg-white hover:bg-gray-50 text-cyan-600 text-sm rounded-full border border-cyan-200 hover:border-cyan-300 transition-colors duration-200"
        >
          Hiszpania
        </Link>
        <Link
          href="/spots?country=Poland"
          className="px-3 py-1 bg-white hover:bg-gray-50 text-cyan-600 text-sm rounded-full border border-cyan-200 hover:border-cyan-300 transition-colors duration-200"
        >
          Polska
        </Link>
        <Link
          href="/spots?country=Egipt"
          className="px-3 py-1 bg-white hover:bg-gray-50 text-cyan-600 text-sm rounded-full border border-cyan-200 hover:border-cyan-300 transition-colors duration-200"
        >
          Egipt
        </Link>
        <Link
          href="/spots?country=Brazil"
          className="px-3 py-1 bg-white hover:bg-gray-50 text-cyan-600 text-sm rounded-full border border-cyan-200 hover:border-cyan-300 transition-colors duration-200"
        >
          Brazylia
        </Link>
      </div>
    </div>
  )
}
