"use server"

import { isSupabaseConfigured, createClient } from "@/lib/supabase/server"
import { mockProjects, mockTasks } from "@/lib/mock-data"
import { revalidatePath } from "next/cache"
import { projectSchema, taskSchema } from "@/lib/validators"
import { redirect } from "next/navigation"

export async function getProjects(status?: string) {
  if (!isSupabaseConfigured) {
    if (status && status !== "all") return mockProjects.filter((p) => p.status === status)
    return mockProjects
  }
  const supabase = await createClient()
  let query = supabase.from("projects").select("*, clients(company_name)").order("created_at", { ascending: false })
  if (status && status !== "all") query = query.eq("status", status)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data
}

export async function getProject(id: string) {
  if (!isSupabaseConfigured) return mockProjects.find((p) => p.id === id) || mockProjects[0]
  const supabase = await createClient()
  const { data, error } = await supabase.from("projects").select("*, clients(company_name)").eq("id", id).single()
  if (error) throw new Error(error.message)
  return data
}

export async function getProjectTasks(projectId: string) {
  if (!isSupabaseConfigured) return mockTasks.filter((t) => t.project_id === projectId)
  const supabase = await createClient()
  const { data, error } = await supabase.from("tasks").select("*").eq("project_id", projectId).order("sort_order", { ascending: true })
  if (error) throw new Error(error.message)
  return data
}

export async function createProjectAction(formData: FormData) {
  if (!isSupabaseConfigured) redirect("/projects")
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")
  const raw = Object.fromEntries(formData.entries())
  const validated = projectSchema.parse(raw)
  const insertData: Record<string, unknown> = { ...validated, user_id: user.id, client_id: validated.client_id || null, start_date: validated.start_date || null, end_date: validated.end_date || null }
  const { error } = await supabase.from("projects").insert(insertData)
  if (error) return { error: error.message }
  revalidatePath("/projects")
  redirect("/projects")
}

export async function updateProjectAction(id: string, formData: FormData) {
  if (!isSupabaseConfigured) redirect(`/projects/${id}`)
  const supabase = await createClient()
  const raw = Object.fromEntries(formData.entries())
  const validated = projectSchema.parse(raw)
  const updateData: Record<string, unknown> = { ...validated, client_id: validated.client_id || null, start_date: validated.start_date || null, end_date: validated.end_date || null }
  const { error } = await supabase.from("projects").update(updateData).eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/projects")
  redirect(`/projects/${id}`)
}

export async function deleteProjectAction(id: string) {
  if (!isSupabaseConfigured) redirect("/projects")
  const supabase = await createClient()
  const { error } = await supabase.from("projects").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/projects")
  redirect("/projects")
}

export async function addTaskAction(projectId: string, formData: FormData) {
  if (!isSupabaseConfigured) { revalidatePath(`/projects/${projectId}`); return }
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")
  const raw = Object.fromEntries(formData.entries())
  const validated = taskSchema.parse(raw)
  const { error } = await supabase.from("tasks").insert({ ...validated, project_id: projectId, user_id: user.id, due_date: validated.due_date || null })
  if (error) return { error: error.message }
  revalidatePath(`/projects/${projectId}`)
}

export async function toggleTaskAction(taskId: string, projectId: string, completed: boolean) {
  if (!isSupabaseConfigured) { revalidatePath(`/projects/${projectId}`); return }
  const supabase = await createClient()
  const { error } = await supabase.from("tasks").update({ is_completed: completed }).eq("id", taskId)
  if (error) return { error: error.message }
  revalidatePath(`/projects/${projectId}`)
}

export async function deleteTaskAction(taskId: string, projectId: string) {
  if (!isSupabaseConfigured) { revalidatePath(`/projects/${projectId}`); return }
  const supabase = await createClient()
  const { error } = await supabase.from("tasks").delete().eq("id", taskId)
  if (error) return { error: error.message }
  revalidatePath(`/projects/${projectId}`)
}
