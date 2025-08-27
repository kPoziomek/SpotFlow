/**
 * Individual spot page with SSR
 */
import { Metadata } from 'next'
import Image from 'next/image'

import { notFound } from 'next/navigation'
import {spotFlowAPI} from "@/lib/api";
import SpotHeader from "@/components/spots/SpotHeader";
import SpotDetails from "@/components/spots/SpotDetails";
import {getSpotImageUrl} from "@/lib/image_url";

interface Props {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params
    const spot = await spotFlowAPI.getSpot(id)

    return {
      title: `${spot.name} - ${spot.country} | SpotFlow`,
      description: spot.description || `${spot.name} is a ${spot.difficulty} level spot for ${spot.sports.join(', ')} in ${spot.country}.`,
      openGraph: {
        title: `${spot.name} - Water Sports Spot`,
        description: spot.description,
        images: spot.images.slice(0, 1), // First image dla OG
      }
    }
  } catch {
    return {
      title: 'Spot Not Found - SpotFlow'
    }
  }
}

export default async function SpotPage({ params }: Props) {

  try {
   const { id } = await params
    const spot = await spotFlowAPI.getSpot(id)
    console.log(spot)
    const primaryImage = getSpotImageUrl(spot.image_url!)

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Header */}
        <SpotHeader spot={spot} />
        {/* Image Gallery - Airbnb style */}
        <div className="mt-6 mb-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-xl overflow-hidden">
            {/* Main large image */}
            <div className="col-span-2 row-span-2">
              <div className="w-full h-full bg-gray-200 relative">
                <Image
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={primaryImage}
                  priority={false}
                  src={primaryImage}
                  alt={spot.name}
                  fill
                  quality={85}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {[1,2,3,4].map((i) => (
              <div key={i} className="relative">
                <div className="w-full h-full bg-gray-100 relative">
                  <img
                    src={`/api/placeholder/300/200?sig=${i}`}
                    alt={`${spot.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                  {i === 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <button className="text-white font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Show all photos
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <SpotDetails spot={spot} />
          </div>


        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
