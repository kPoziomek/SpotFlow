import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refreshing the auth token
  const {data: {user}} = await supabase.auth.getUser()

  // Only protect user dashboard paths, not auth paths
  const protectedPaths = ['/user', '/favorites']
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  console.log('🔍 Middleware - User:', user?.id, 'Path:', request.nextUrl.pathname, 'Protected:', isProtectedPath);

  if(isProtectedPath && !user) {
    console.log('🔍 Redirecting to auth');
    return NextResponse.redirect(new URL('/spots', request.url))
  }
  return supabaseResponse
}
