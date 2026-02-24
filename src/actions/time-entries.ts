"use server"

import { isSupabaseConfigured, createClient } from "@/lib/supabase/server"
import { mockTimeEntries } from "@/lib/mock-data"
import { revalidatePath } from "next/cache"

export async function getTimeEntries(projectId?: string) {
  if (!isSupabaseConfigured) {
    if (projectId) return mockTimeEntries.filter((t) => t.project_id === projectId)
    return mockTimeEntries
  }
  const supabase = await createClient()
  let query = supabase
    .from("time_entries")
    .select("*, projects(name)")
    .order("start_time", { ascending: false })

  if (projectId) {
    query = query.eq("project_id", projectId)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data
}

export async function createTimeEntryAction(data: {
  project_id: string
  description?: string
  start_time: string
  end_time: string
  duration_minutes: number
  is_billable: boolean
}) {
  if (!isSupabaseConfigured) {
    revalidatePath("/time-tracking")
    return
  }
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Get hourly rate from project or profile
  const { data: project } = await supabase
    .from("projects")
    .select("hourly_rate")
    .eq("id", data.project_id)
    .single()

  let hourlyRate = project?.hourly_rate
  if (!hourlyRate) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("default_hourly_rate")
      .eq("id", user.id)
      .single()
    hourlyRate = profile?.default_hourly_rate || 0
  }

  const { error } = await supabase.from("time_entries").insert({
    user_id: user.id,
    project_id: data.project_id,
    description: data.description || null,
    start_time: data.start_time,
    end_time: data.end_time,
    duration_minutes: data.duration_minutes,
    is_billable: data.is_billable,
    hourly_rate: hourlyRate,
  })

  if (error) return { error: error.message }
  revalidatePath("/time-tracking")
}

export async function deleteTimeEntryAction(id: string) {
  if (!isSupabaseConfigured) {
    revalidatePath("/time-tracking")
    return
  }
  const supabase = await createClient()
  const { error } = await supabase.from("time_entries").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/time-tracking")
}

export async function getWeeklySummary() {
  if (!isSupabaseConfigured) {
    return mockTimeEntries.map((t) => ({
      duration_minutes: t.duration_minutes,
      is_billable: t.is_billable,
      projects: t.projects,
    }))
  }
  const supabase = await createClient()
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const { data, error } = await supabase
    .from("time_entries")
    .select("duration_minutes, is_billable, projects(name)")
    .gte("start_time", startOfWeek.toISOString())
    .order("start_time", { ascending: false })

  if (error) throw new Error(error.message)
  return data
}
