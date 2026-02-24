"use server"

import { isSupabaseConfigured, createClient } from "@/lib/supabase/server"
import { mockInvoices } from "@/lib/mock-data"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getInvoices(status?: string) {
  if (!isSupabaseConfigured) {
    if (status && status !== "all") return mockInvoices.filter((i) => i.status === status)
    return mockInvoices
  }
  const supabase = await createClient()
  let query = supabase.from("invoices").select("*, clients(company_name)").order("created_at", { ascending: false })
  if (status && status !== "all") query = query.eq("status", status)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data
}

export async function getInvoice(id: string) {
  if (!isSupabaseConfigured) return mockInvoices.find((i) => i.id === id) || mockInvoices[0]
  const supabase = await createClient()
  const { data, error } = await supabase.from("invoices").select("*, clients(company_name, email, address, business_registration_number), invoice_items(*)").eq("id", id).single()
  if (error) throw new Error(error.message)
  return data
}

export async function createInvoiceAction(data: {
  client_id: string; project_id?: string; issue_date: string; due_date: string; tax_rate: number; notes?: string
  items: { description: string; quantity: number; unit_price: number }[]
}) {
  if (!isSupabaseConfigured) redirect("/invoices")
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")
  const { count } = await supabase.from("invoices").select("*", { count: "exact", head: true })
  const invoiceNumber = `INV-${new Date().getFullYear()}-${String((count ?? 0) + 1).padStart(3, "0")}`
  const subtotal = data.items.reduce((sum, item) => sum + Math.round(item.quantity * item.unit_price), 0)
  const taxAmount = Math.round(subtotal * (data.tax_rate / 100))
  const total = subtotal + taxAmount
  const { data: invoice, error: invoiceError } = await supabase.from("invoices").insert({
    user_id: user.id, client_id: data.client_id, project_id: data.project_id || null, invoice_number: invoiceNumber,
    issue_date: data.issue_date, due_date: data.due_date, tax_rate: data.tax_rate, subtotal, tax_amount: taxAmount, total, notes: data.notes || null,
  }).select().single()
  if (invoiceError) return { error: invoiceError.message }
  const items = data.items.map((item, index) => ({
    invoice_id: invoice.id, user_id: user.id, description: item.description, quantity: item.quantity,
    unit_price: item.unit_price, amount: Math.round(item.quantity * item.unit_price), sort_order: index,
  }))
  const { error: itemsError } = await supabase.from("invoice_items").insert(items)
  if (itemsError) return { error: itemsError.message }
  revalidatePath("/invoices")
  redirect("/invoices")
}

export async function updateInvoiceStatusAction(id: string, status: string) {
  if (!isSupabaseConfigured) { revalidatePath(`/invoices/${id}`); return }
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")
  const updateData: Record<string, unknown> = { status }
  if (status === "paid") {
    updateData.payment_date = new Date().toISOString().split("T")[0]
    const { data: invoice } = await supabase.from("invoices").select("total, project_id, invoice_number").eq("id", id).single()
    if (invoice) {
      await supabase.from("transactions").insert({
        user_id: user.id, project_id: invoice.project_id, invoice_id: id, type: "income", category: "프로젝트 수입",
        description: `청구서 ${invoice.invoice_number} 결제`, amount: invoice.total, transaction_date: new Date().toISOString().split("T")[0],
      })
    }
  }
  const { error } = await supabase.from("invoices").update(updateData).eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/invoices")
  revalidatePath(`/invoices/${id}`)
}

export async function deleteInvoiceAction(id: string) {
  if (!isSupabaseConfigured) redirect("/invoices")
  const supabase = await createClient()
  const { error } = await supabase.from("invoices").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/invoices")
  redirect("/invoices")
}
