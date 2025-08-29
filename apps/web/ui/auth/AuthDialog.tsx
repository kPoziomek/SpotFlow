'use client'

import {useState, useEffect, MouseEvent} from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { FaTimes, FaUser, FaLock, FaEnvelope } from 'react-icons/fa'
import { clientLogin, clientSignup } from '@/lib/auth/client'

interface AuthDialogProps {
  isOpen: boolean
  onClose: (event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>) => void
  mode: 'login' | 'signup'
  onModeChange: (mode: 'login' | 'signup') => void
  setIsAuthDialogOpen: (isOpen: boolean) => void
}

export default function AuthDialog({ isOpen, onClose, mode, onModeChange, setIsAuthDialogOpen }: AuthDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      if (mode === 'login') {
        const { data, error } = await clientLogin(email, password)

        if (error) {
          setError(error.message)
          return
        }

        setIsAuthDialogOpen(false)
        router.refresh() // Refresh current page to update auth state

      } else {
        const name = formData.get('name') as string
        const lastName = formData.get('lastName') as string

        const { data, error } = await clientSignup(email, password, name, lastName)

        if (error) {
          setError(error.message)
          return
        }

        setIsAuthDialogOpen(false)
        router.refresh() // Refresh current page to update auth state
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted || !isOpen) return null

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-cyan-950 opacity-50 z-40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          data-testid="auth-dialog"
          className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
            </h2>
            <p className="text-gray-600">
              {mode === 'login'
                ? 'Wprowadź swoje dane aby się zalogować'
                : 'Stwórz nowe konto aby kontynuować'
              }
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form action={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div className="text-cyan-900">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  data-testid="auth-dialog-email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="twój@email.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Hasło
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Jan"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nazwisko
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Kowalski"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Przetwarzanie...</span>
                </>
              ) : (
                <>
                  <FaUser />
                  <span>{mode === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}</span>
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div className="mt-4 text-center text-sm text-gray-600">
            {mode === 'login' ? (
              <span>
                Nie masz konta?{' '}
                <button
                  onClick={() => onModeChange('signup')}
                  className="text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Zarejestruj się
                </button>
              </span>
            ) : (
              <span>
                Masz już konto?{' '}
                <button
                  onClick={() => onModeChange('login')}
                  className="text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Zaloguj się
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )

  return createPortal(modalContent, document.body)
}
