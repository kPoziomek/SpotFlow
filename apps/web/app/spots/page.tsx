/**
 * Spots listing page with SSR
 */
import { Metadata } from 'next'
import {getSpots} from "@/lib/data/spots";
import {SpotsGrid} from "@/components/spots/SpotsGrid";
import {SpotFilters} from "@/types/types";

interface Props {
  searchParams: {
    country?: string
    sport?: string
    difficulty?: string
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const {country, sport} = await searchParams
  let title = 'Water Sports Spots - SpotFlow'
  if (country) title = `${country} Water Sports Spots - SpotFlow`
  if (sport) title = `${sport} Spots - SpotFlow`

  return {
    title,
    description: 'Discover the best water sports spots around the world. Find perfect locations for windsurfing, kitesurfing, and SUP.',
  }
}

export default async function SpotsPage({ searchParams }: Props) {

const   {country, sport, difficulty} = await searchParams
  const filters: SpotFilters = {
    country: country,
    sport: sport,
    difficulty: difficulty,
  }

  try {
    const spotsData = (await getSpots(filters)).spots
    return (
      <div className="container">

        {/* Spots Grid */}
        <SpotsGrid spots={spotsData} />
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Spots
          </h1>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      </div>
    )
  }
}
