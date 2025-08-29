'use client'
import { createClient } from '@/utils/supabase/client'

export async function clientLogin(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function clientSignup(email: string, password: string, name: string, lastName: string) {
  const supabase = createClient()

  // Step 1: Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: `${name} ${lastName}`,
        name: name,
        last_name: lastName,
      }
    }
  })

  if (authError) {
    return { data: null, error: authError }
  }

  // Step 2: Create user profile (if user was created successfully)
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        full_name: `${name} ${lastName}`,
        name: name,
        last_name: lastName,
        username: null, // User can set this later
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Note: Auth user is already created, profile can be created later
    }
  }

  return { data: authData, error: null }
}

export async function clientLogout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  return { error }
}
