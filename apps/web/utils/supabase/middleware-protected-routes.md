W utils/supabase/middleware.ts dodaj logikę ochrony:

export async function updateSession(request) {
// ... existing code ...

    // refreshing the auth token
    const { data: { user } } = await supabase.auth.getUser()

    // Protected paths - require authentication
    const protectedPaths = ['/spots', '/instructors', '/account']
    const isProtectedPath = protectedPaths.some(path =>
      request.nextUrl.pathname.startsWith(path)
    )

    if (isProtectedPath && !user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return supabaseResponse
}

Alternatywnie możesz chronić na poziomie Page Components:

// app/spots/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function SpotsPage() {
const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      redirect('/auth/login')
    }

    // rendered only for authenticated users
    return <div>Protected Spots Content</div>
}
