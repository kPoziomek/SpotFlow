import {Spot, SpotFilters, SpotsResponse} from "@/types/types";
import {createClient} from "@/utils/supabase/client";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'


class SpotFlowAPI {
  private baseURL: string
  private supabase: any
  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    this.supabase = createClient()
  }

  async getSpots(filters?: SpotFilters): Promise<SpotsResponse> {
    const params = new URLSearchParams()

    let query = this.supabase.from('spots').select('*').limit(20);

    if (filters?.country) {
      params.append('country', filters.country);
      query = query.eq('country', filters.country);
    }
    if (filters?.sport) {
      params.append('sport', filters.sport)
      query = query.contains('sports', [filters.sport]);
    }
    if (filters?.difficulty) {
      params.append('difficulty', filters.difficulty)
      query = query.contains('difficulty', [filters.difficulty]);
    }

    const { data, error  } = await query
    return { spots: data || [] }
  }

  async getSpot(id: string): Promise<Spot> {
    const {data, error} = await this.supabase.from('spots').select('*').eq('id', id);


    if (error) {
      if (error.code === 404) {
        throw new Error('Spot not found')
      }
      throw new Error(error.message)
    }
    return  data[0]
  }

}

export const spotFlowAPI = new SpotFlowAPI()
