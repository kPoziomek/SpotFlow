/**
 * User favorites page with SSR
 */
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { spotFlowAPI } from '@/lib/api'
import { SpotsGrid } from '@/ui/spots/SpotsGrid'

export const metadata: Metadata = {
  title: 'Moje ulubione spoty - SpotFlow',
  description: 'Przeglądaj swoje ulubione miejsca do uprawiania sportów wodnych',
}

export default async function FavoritesPage() {
  // Get current user from server - required for this page
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  // Redirect if not authenticated
  if (error || !user) {
    redirect('/spots')
  }

  try {
    // Fetch user's favorite spots
    const favoriteSpots = await spotFlowAPI.getUserFavorites(user.id)

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Moje ulubione spoty
          </h1>
          <p className="text-gray-600">
            {favoriteSpots.length > 0
              ? `Masz ${favoriteSpots.length} ulubionych ${favoriteSpots.length === 1 ? 'spot' : favoriteSpots.length < 5 ? 'spoty' : 'spotów'}`
              : 'Nie masz jeszcze żadnych ulubionych spotów'
            }
          </p>
        </div>

        {/* Spots Grid */}
        {favoriteSpots.length > 0 ? (
          <SpotsGrid spots={favoriteSpots} />
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Brak ulubionych spotów
              </h3>
              <p className="text-gray-500 mb-6">
                Zacznij eksplorować spoty i dodawaj je do ulubionych klikając w ikonę serca.
              </p>
              <a
                href="/spots"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Przeglądaj spoty
              </a>
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Błąd podczas ładowania ulubionych
          </h1>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : 'Coś poszło nie tak'}
          </p>
        </div>
      </div>
    )
  }
}
