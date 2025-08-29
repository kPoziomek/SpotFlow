export interface Spot {
  id: string
  name: string
  description?: string
  latitude: number
  longitude: number
  country: string
  region?: string
  sports: string[]
  image_url?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  images: string[]
  created_at?: string
  isFavorite?: boolean
}

export interface SpotFilters {
  country?: string
  sport?: string
  difficulty?: string
}

export interface SpotsResponse {
  spots: Spot[]
}
