"use server"

import { isSupabaseConfigured, createClient } from "@/lib/supabase/server"
import { mockProfile } from "@/lib/mock-data"
import { revalidatePath } from "next/cache"
import { profileSchema } from "@/lib/validators"

export async function getProfile() {
  if (!isSupabaseConfigured) {
    return mockProfile
  }
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()
  return data
}

export async function updateProfileAction(formData: FormData) {
  if (!isSupabaseConfigured) {
    revalidatePath("/settings")
    return
  }
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const raw = Object.fromEntries(formData.entries())
  const validated = profileSchema.parse(raw)

  const { error } = await supabase
    .from("profiles")
    .update(validated)
    .eq("id", user.id)

  if (error) return { error: error.message }
  revalidatePath("/settings")
}
