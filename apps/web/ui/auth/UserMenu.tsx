'use client'

import { MouseEvent, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PiWavesLight } from "react-icons/pi";
import {  FaUser, FaUserPlus, FaHeart, FaMapMarkerAlt, FaCog, FaSignOutAlt, FaGlobe, FaQuestionCircle } from "react-icons/fa";
import AuthDialog from './AuthDialog';
import { useAuth } from '@/hooks/useAuth';
import { clientLogout } from '@/lib/auth/client';

export default function UserMenu () {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const router = useRouter()

  const { user, isAuthenticated, isLoading, signOut } = useAuth()

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode)
    setIsAuthDialogOpen(true)
    setIsDropdownOpen(false)
  }

  const handleSignOut = async () => {
    try {
      await clientLogout()
      await signOut() // Update local state
      setIsDropdownOpen(false)
      router.refresh() // Refresh to update UI
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleCloseAuthDialog = (event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>) => {
      event?.preventDefault()
      setIsAuthDialogOpen(false)
  }

  if (isLoading) {
    return (
      <nav className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
      </nav>
    )
  }

  return(
    <nav className="flex items-center relative">
      <div className="relative">
        <div className="flex">
        {isAuthenticated  &&
          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white p-3 rounded-full mr-2 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-cyan-200 space-x-2">
          <FaUser className="w-4 h-4" />
        </button>
        }

        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white p-3 rounded-full mr-2 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-cyan-200 space-x-2">
            <PiWavesLight />
        </button>
        </div>
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              {isAuthenticated ? (
                // Authenticated user menu
                <div className="py-2">
                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs text-gray-500">Zalogowany użytkownik</p>
                  </div>

                  {/* Main options */}
                  <div className="py-1">
                    <Link
                      href="/favorites"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <FaHeart className="mr-3 text-gray-400" />
                      Listy życzeń
                    </Link>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <FaMapMarkerAlt className="mr-3 text-gray-400" />
                      Podróże
                    </button>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <FaUser className="mr-3 text-gray-400" />
                      Profil
                    </button>
                  </div>

                  <hr className="my-1" />

                  {/* Settings */}
                  <div className="py-1">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <FaCog className="mr-3 text-gray-400" />
                      Ustawienia konta
                    </button>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <FaGlobe className="mr-3 text-gray-400" />
                      Języki i waluta
                    </button>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <FaQuestionCircle className="mr-3 text-gray-400" />
                      Centrum pomocy
                    </button>
                  </div>

                  <hr className="my-1" />

                  {/* Sign out */}
                  <div className="py-1">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      <FaSignOutAlt className="mr-3 text-gray-400" />
                      Wyloguj się
                    </button>
                  </div>
                </div>
              ) : (
                // Unauthenticated user menu
                <div className="py-1">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <FaUser className="mr-3 text-gray-400" />
                    Zaloguj się
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <FaUserPlus className="mr-3 text-gray-400" />
                    Zarejestruj się
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <AuthDialog
        setIsAuthDialogOpen={setIsAuthDialogOpen}
        isOpen={isAuthDialogOpen}
        onClose={handleCloseAuthDialog}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </nav>
  )
}
