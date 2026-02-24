import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured =
  !!SUPABASE_URL &&
  !!SUPABASE_KEY &&
  SUPABASE_URL !== "your-supabase-url" &&
  SUPABASE_KEY !== "your-supabase-anon-key"

export async function createClient() {
  if (!isSupabaseConfigured) {
    // Return a mock client when Supabase is not configured
    return null as never
  }

  const cookieStore = await cookies()

  return createServerClient(
    SUPABASE_URL!,
    SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  )
}
