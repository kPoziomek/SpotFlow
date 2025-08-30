'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaHeart,
  FaPlane,
  FaComments,
  FaUser,
  FaHome
} from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import AuthDialog from '../auth/AuthDialog'

const navItems = [
  {
    icon: FaHome,
    label: 'Odkrywaj',
    href: '/',
  },
  {
    icon: FaHeart,
    label: 'Ulubione',
    href: '/user/favorites',
    requiresAuth: true
  },
  {
    icon: FaPlane,
    label: 'Podróże',
    href: '/user/travels',
    requiresAuth: true
  },
  {
    icon: FaComments,
    label: 'Wiadomości',
    href: '/messages',
    requiresAuth: true
  },
  {
    icon: FaUser,
    label: 'Profil',
    href: '/user',
    requiresAuth: true
  }
]


export default function MobileBottomNav() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')

  const handleAuthRequiredAction = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault()
      setAuthMode('login')
      setIsAuthModalOpen(true)
    }
  }
  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon
            const isActive = pathname === item.href
            const activeClass = isActive ? 'text-cyan-500' : 'text-gray-500'

            const content = (
              <>
                <div className="flex flex-col items-center space-y-1">
                  <IconComponent
                    className={`w-5 h-5 ${activeClass}`}
                  />
                  <span className={`text-xs ${
                    isActive 
                      ? 'text-cyan-500 font-medium' 
                      : 'text-gray-500'
                  }`}>
                    {item.label}
                  </span>
                </div>
              </>
            )

            if (item.requiresAuth && !isAuthenticated) {
              return (
                <button
                  key={item.href}
                  onClick={handleAuthRequiredAction}
                  className="flex-1 py-2 px-1"
                >
                  {content}
                </button>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 py-2 px-1"
              >
                {content}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Padding na dole dla mobile, żeby content nie był zakryty */}
      <div className="md:hidden h-16" />

      {/* Auth Modal */}
      <AuthDialog
        setIsAuthDialogOpen={setIsAuthModalOpen}
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
