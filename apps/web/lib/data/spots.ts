import {spotFlowAPI} from "../api";
import {SpotFilters, SpotsResponse} from "@/types/types";
import { createClient } from '@/utils/supabase/server';

// Server-side data fetching with proper auth context
export async function getSpots(filters?: SpotFilters, userId?: string): Promise<SpotsResponse> {
  const supabase = await createClient();

  // Base query with LEFT JOIN to check if spot is favorited by current user
  let query = supabase
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
  }

  const { data, error } = await query;


  if (error) {
    console.error('Error fetching spots:', error);
    return { spots: [] };
  }

  // Transform data to include isFavorite boolean
  const spotsWithFavorites = data.map((spot: any) => ({
    ...spot,
    isFavorite: spot.user_favorites && spot.user_favorites.length > 0,
    user_favorites: undefined // Remove the join data from final response
  }));

  return { spots: spotsWithFavorites || [] };
}

// Keep client-side API for client ui

export function getClientSpots(filters?: SpotFilters, userId?: string) {
  return spotFlowAPI.getSpots(filters, userId)
}
