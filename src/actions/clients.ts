"use server"

import { isSupabaseConfigured, createClient } from "@/lib/supabase/server"
import { mockClients } from "@/lib/mock-data"
import { revalidatePath } from "next/cache"
import { clientSchema } from "@/lib/validators"
import { redirect } from "next/navigation"

export async function getClients(search?: string) {
  if (!isSupabaseConfigured) {
    if (search) return mockClients.filter((c) => c.company_name.includes(search) || c.contact_name?.includes(search))
    return mockClients
  }
  const supabase = await createClient()
  let query = supabase.from("clients").select("*").order("created_at", { ascending: false })
  if (search) query = query.or(`company_name.ilike.%${search}%,contact_name.ilike.%${search}%,email.ilike.%${search}%`)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data
}

export async function getClient(id: string) {
  if (!isSupabaseConfigured) return mockClients.find((c) => c.id === id) || mockClients[0]
  const supabase = await createClient()
  const { data, error } = await supabase.from("clients").select("*").eq("id", id).single()
  if (error) throw new Error(error.message)
  return data
}

export async function createClientAction(formData: FormData) {
  if (!isSupabaseConfigured) redirect("/clients")
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")
  const raw = Object.fromEntries(formData.entries())
  const validated = clientSchema.parse(raw)
  const { error } = await supabase.from("clients").insert({ ...validated, user_id: user.id })
  if (error) return { error: error.message }
  revalidatePath("/clients")
  redirect("/clients")
}

export async function updateClientAction(id: string, formData: FormData) {
  if (!isSupabaseConfigured) redirect("/clients")
  const supabase = await createClient()
  const raw = Object.fromEntries(formData.entries())
  const validated = clientSchema.parse(raw)
  const { error } = await supabase.from("clients").update(validated).eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/clients")
  redirect("/clients")
}

export async function deleteClientAction(id: string) {
  if (!isSupabaseConfigured) redirect("/clients")
  const supabase = await createClient()
  const { error } = await supabase.from("clients").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/clients")
  redirect("/clients")
}
