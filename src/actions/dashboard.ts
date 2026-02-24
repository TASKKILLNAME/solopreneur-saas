"use server"

import { isSupabaseConfigured, createClient } from "@/lib/supabase/server"
import { getMockDashboardData } from "@/lib/mock-data"

export async function getDashboardData() {
  if (!isSupabaseConfigured) {
    return getMockDashboardData()
  }
  const supabase = await createClient()
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0]
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  // Monthly revenue
  const { data: monthlyTransactions } = await supabase
    .from("transactions")
    .select("amount")
    .eq("type", "income")
    .gte("transaction_date", startOfMonth)

  const monthlyRevenue = (monthlyTransactions || []).reduce((sum, t) => sum + t.amount, 0)

  // Active projects
  const { count: activeProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("status", "in_progress")

  // Pending invoices
  const { data: pendingInvoices } = await supabase
    .from("invoices")
    .select("total, invoice_number, clients(company_name), due_date")
    .in("status", ["sent", "overdue"])
    .order("due_date", { ascending: true })

  const pendingTotal = (pendingInvoices || []).reduce((sum, i) => sum + i.total, 0)

  // Hours this week
  const { data: weeklyEntries } = await supabase
    .from("time_entries")
    .select("duration_minutes")
    .gte("start_time", startOfWeek.toISOString())

  const weeklyMinutes = (weeklyEntries || []).reduce((sum, e) => sum + (e.duration_minutes || 0), 0)

  // Recent projects
  const { data: recentProjects } = await supabase
    .from("projects")
    .select("id, name, status, clients(company_name), end_date")
    .order("updated_at", { ascending: false })
    .limit(5)

  // Monthly revenue chart (last 6 months)
  const chartData: { month: string; revenue: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthStart = d.toISOString().split("T")[0]
    const nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1)
    const monthEnd = nextMonth.toISOString().split("T")[0]

    const { data: mData } = await supabase
      .from("transactions")
      .select("amount")
      .eq("type", "income")
      .gte("transaction_date", monthStart)
      .lt("transaction_date", monthEnd)

    const revenue = (mData || []).reduce((s, t) => s + t.amount, 0)
    chartData.push({ month: `${d.getMonth() + 1}월`, revenue })
  }

  return {
    monthlyRevenue,
    activeProjects: activeProjects || 0,
    pendingInvoiceCount: (pendingInvoices || []).length,
    pendingTotal,
    weeklyHours: Math.round(weeklyMinutes / 60 * 10) / 10,
    recentProjects: recentProjects || [],
    pendingInvoices: pendingInvoices || [],
    chartData,
  }
}
