import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {getSpots} from "@/lib/data/spots";
import {SpotsGrid} from "@/ui/spots/SpotsGrid";
import {SpotFilters} from "@/types/types";
import { createClient } from '@/utils/supabase/server';

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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { country, sport, difficulty } = await searchParams
  const filters: SpotFilters = {
    country: country,
    sport: sport,
    difficulty: difficulty,
  }

  try {
    const spotsData = (await getSpots(filters, user?.id)).spots

    const hasSearchFilters = country || sport || difficulty
    if (hasSearchFilters && spotsData.length === 0) {
      notFound()
    }

    return (
      <div className="container">
        <SpotsGrid spots={spotsData} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}
