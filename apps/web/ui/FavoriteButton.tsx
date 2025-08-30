'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import AuthDialog from './auth/AuthDialog'
import {spotFlowAPI} from "@/lib/api";

interface FavoriteButtonProps {
  spotId: string
  isFavorite?: boolean
  className?: string
}

export default function FavoriteButton({ spotId, isFavorite = false, className = "" }: FavoriteButtonProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { isAuthenticated, userId } = useAuth()

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated ) {
      setAuthMode('login')
      setIsAuthModalOpen(true)
      return
    }

    if(!userId){
      console.error('User ID is not available')
      return
    }

    setIsLoading(true)
    try {
      await spotFlowAPI.toggleFavorite(userId, spotId)
      router.refresh()

    } catch (error) {
      console.error('Error toggling favorite:', error)
      // TODO: Show toast notification here
    } finally {
      setIsLoading(false)
    }
  }
  const isFavoriteIcon = isFavorite ? <FaHeart className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />: <FaRegHeart className="w-4 h-4 text-cyan-600 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-200" />

  return (
    <div className="absolute top-2 right-2">
      <button
        data-testid={`favorite-button-${spotId}`}
        onClick={handleFavoriteClick}
        disabled={isLoading}
        className={`group relative p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 ${className}`}
        title={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
      >
        {isFavoriteIcon}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        )}
      </button>

      <AuthDialog
        setIsAuthDialogOpen={setIsAuthModalOpen}
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  )
}
