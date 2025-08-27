export function HeaderLocation({location}: {location: string}) {
  return (
    <div className="flex items-center text-sm text-gray-600 space-x-4">
    <div className="flex items-center">
    <svg className="w-4 h-4 text-yellow-400 fill-current mr-1" viewBox="0 0 24 24">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
    <span className="font-semibold text-gray-900">4.8</span>
    <span className="mx-1">·</span>
  <button className="underline hover:text-gray-800">127 reviews</button>
  </div>

  <div className="flex items-center">
  <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
    <span>{location}</span>
    </div>
    </div>

  )
}
