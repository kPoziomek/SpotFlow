import Link from 'next/link'
import Image from 'next/image'
import {Spot} from "@/types/types";
import {getSpotImageUrl} from "@/lib/image_url";


interface SpotsProps {
  spots: Spot[];
}

export function SpotsGrid({spots}: SpotsProps) {
  console.log(spots)

  if(!spots) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">We could not find any spots. Please contact with admins</p>
      </div>
    )
  }

  console.log(spots)
  if (spots.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No spots found matching your criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  )
}

function SpotCard({ spot }: { spot: Spot }) {


  const primaryImage = getSpotImageUrl(spot.image_url!)

  return (
    <Link href={`/spots/${spot.id}`} target="_blank" className="group block">
      <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-100 border border-gray-100 hover:border-cyan-200">
        {/* Image with wishlist button */}
        <div className="aspect-square relative">
          <Image
            loading="lazy"
            placeholder="blur"
            blurDataURL={primaryImage}
            priority={false}
            src={primaryImage}
            alt={spot.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={85}
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />

          {/* Wishlist heart button - Airbnb style */}
          <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
            <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location and rating */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-gray-600 text-sm font-medium">
              {spot.region ? `${spot.region}, ` : ''}{spot.country}
            </p>
            <div className="flex items-center text-sm">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="ml-1 text-gray-700">4.8</span>
            </div>
          </div>

          {/* Spot name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
            {spot.name}
          </h3>

          {/* Sports tags - more compact */}
          <div className="flex flex-wrap gap-1 mb-3">
            {spot.sports.slice(0, 2).map((sport) => (
              <span
                key={sport}
                className="px-2 py-1 bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs rounded-md font-medium"
              >
                {sport}
              </span>
            ))}
            {spot.sports.length > 2 && (
              <span className="px-2 py-1 bg-cyan-50 text-cyan-600 border border-cyan-200 text-xs rounded-md">
                +{spot.sports.length - 2}
              </span>
            )}
          </div>

          {/* Difficulty and price */}
          <div className="flex justify-between items-center">
            <span className={`px-2 py-1 text-xs rounded-md font-medium ${
              spot.difficulty === 'beginner' ? 'bg-teal-100 text-teal-700 border border-teal-200' :
                spot.difficulty === 'intermediate' ? 'bg-cyan-100 text-cyan-700 border border-cyan-200' :
                  'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {spot.difficulty}
            </span>

          </div>
        </div>
      </div>
    </Link>
  )
}
