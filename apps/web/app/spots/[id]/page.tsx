import { Metadata } from 'next'
import Image from 'next/image'

import { notFound } from 'next/navigation'
import {spotFlowAPI} from "@/lib/api";
import SpotHeader from "@/ui/spots/SpotHeader";
import SpotDetails from "@/ui/spots/SpotDetails";
import {getSpotImageUrl} from "@/lib/image_url";
import SpotImages from "@/ui/spots/SpotImages";

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
        images: spot.images.slice(0, 1),
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
    const primaryImage = getSpotImageUrl(spot.image_url!)

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
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
            <SpotImages spotName={spot.name} spotImages={[1,2,3,4]}/>
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
