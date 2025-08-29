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

  async getSpots(filters?: SpotFilters, userId?: string): Promise<SpotsResponse> {
    let query = this.supabase
      .from('spots')
      .select(`
       *,
        user_favorites!left(user_id)
      `)
      .limit(20);

    // Apply filters
    if (filters?.country) {
      query = query.eq('country', filters.country);
    }
    if (filters?.sport) {
      query = query.contains('sports', [filters.sport]);
    }
    if (filters?.difficulty) {
      query = query.eq('difficulty', filters.difficulty);
    }

    // Filter favorites by current user if userId provided
    if (userId) {
      query = query.eq('user_favorites.user_id', userId);
      console.log('🔍 Filtering by userId:', userId);
    }

    const { data, error } = await query;

    // Debug auth context in Supabase
    if (error) {
      const { data: authData } = await this.supabase.auth.getUser();
      console.log('🔍 Current auth user:', authData.user?.id);
      console.log('🔍 Passed userId:', userId);
      console.log('🔍 Query error:', error);
    }

    if (error) {
      console.error('Error fetching spots:', error);
      return { spots: [] };
    }
    console.log(data)
    // Transform data to include isFavorite boolean
    const spotsWithFavorites = data.map((spot: any) => ({
      ...spot,
      isFavorite: spot.user_favorites && spot.user_favorites.length > 0,
      user_favorites: undefined // Remove the join data from final response
    }));

    return { spots: spotsWithFavorites || [] }
  }

  async getSpot(id: string): Promise<Spot> {
    const {data, error} = await this.supabase
      .from('spots')
      .select('id, name, description, latitude, longitude, country, region, sports, image_url, difficulty, images, created_at')
      .eq('id', id);


    if (error) {
      if (error.code === 404) {
        throw new Error('Spot not found')
      }
      throw new Error(error.message)
    }
    return  data[0]
  }

  async toggleFavorite(userId: string, spotId: string): Promise<{ isFavorite: boolean }> {
    // First check if favorite exists
    console.log('userId, spotId', userId, spotId)

    const { data: existing } = await this.supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('spot_id', spotId)
      .single();

    if (existing) {
      // Remove from favorites
      const { error } = await this.supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', userId)
        .eq('spot_id', spotId);

      if (error) {
        throw new Error(error.message);
      }
      return { isFavorite: false };
    } else {
      // Add to favorites
      const { error } = await this.supabase
        .from('user_favorites')
        .insert({ user_id: userId, spot_id: spotId });

      if (error) {
        throw new Error(error.message);
      }
      return { isFavorite: true };
    }
  }

  async getUserFavorites(userId: string): Promise<Spot[]> {
    const { data, error } = await this.supabase
      .from('user_favorites')
      .select(`
        spots (*)
      `)
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    // Extract spots from the nested structure
    return data?.map((favorite: any) => ({
      ...favorite.spots,
      isFavorite: true
    })) || [];
  }

}

export const spotFlowAPI = new SpotFlowAPI()
