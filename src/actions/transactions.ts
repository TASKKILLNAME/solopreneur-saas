"use server"

import { isSupabaseConfigured, createClient } from "@/lib/supabase/server"
import { mockTransactions, getMockFinancialSummary } from "@/lib/mock-data"
import { revalidatePath } from "next/cache"
import { transactionSchema } from "@/lib/validators"

export async function getTransactions(type?: string) {
  if (!isSupabaseConfigured) {
    if (type && type !== "all") return mockTransactions.filter((t) => t.type === type)
    return mockTransactions
  }
  const supabase = await createClient()
  let query = supabase
    .from("transactions")
    .select("*, projects(name)")
    .order("transaction_date", { ascending: false })

  if (type && type !== "all") {
    query = query.eq("type", type)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data
}

export async function createTransactionAction(formData: FormData) {
  if (!isSupabaseConfigured) {
    revalidatePath("/finances")
    revalidatePath("/finances/transactions")
    return
  }
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const raw = Object.fromEntries(formData.entries())
  const validated = transactionSchema.parse(raw)

  const { error } = await supabase.from("transactions").insert({
    ...validated,
    user_id: user.id,
    project_id: validated.project_id || null,
    invoice_id: validated.invoice_id || null,
  })

  if (error) return { error: error.message }
  revalidatePath("/finances")
  revalidatePath("/finances/transactions")
}

export async function deleteTransactionAction(id: string) {
  if (!isSupabaseConfigured) {
    revalidatePath("/finances")
    revalidatePath("/finances/transactions")
    return
  }
  const supabase = await createClient()
  const { error } = await supabase.from("transactions").delete().eq("id", id)
  if (error) return { error: error.message }
  revalidatePath("/finances")
  revalidatePath("/finances/transactions")
}

export async function getFinancialSummary() {
  if (!isSupabaseConfigured) {
    return getMockFinancialSummary()
  }
  const supabase = await createClient()
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0]
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString().split("T")[0]

  // Monthly totals
  const { data: monthlyData } = await supabase
    .from("transactions")
    .select("type, amount")
    .gte("transaction_date", startOfMonth)

  const monthlyIncome = (monthlyData || [])
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
  const monthlyExpense = (monthlyData || [])
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  // Yearly totals
  const { data: yearlyData } = await supabase
    .from("transactions")
    .select("type, amount")
    .gte("transaction_date", startOfYear)

  const yearlyIncome = (yearlyData || [])
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
  const yearlyExpense = (yearlyData || [])
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  // Monthly chart data (last 12 months)
  const chartData: { month: string; income: number; expense: number }[] = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthStart = d.toISOString().split("T")[0]
    const nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1)
    const monthEnd = nextMonth.toISOString().split("T")[0]

    const monthLabel = `${d.getMonth() + 1}월`

    const { data: mData } = await supabase
      .from("transactions")
      .select("type, amount")
      .gte("transaction_date", monthStart)
      .lt("transaction_date", monthEnd)

    const income = (mData || []).filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0)
    const expense = (mData || []).filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0)
    chartData.push({ month: monthLabel, income, expense })
  }

  return {
    monthlyIncome,
    monthlyExpense,
    monthlyNet: monthlyIncome - monthlyExpense,
    yearlyIncome,
    yearlyExpense,
    yearlyNet: yearlyIncome - yearlyExpense,
    chartData,
  }
}
