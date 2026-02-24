"use client"

import { useState } from "react"
import { createTransactionAction } from "@/actions/transactions"
import { TRANSACTION_CATEGORIES } from "@/lib/constants"
import { ko } from "@/dict/ko"

interface TransactionFormProps {
  projects: { id: string; name: string }[]
  onDone?: () => void
}

export function TransactionForm({ projects, onDone }: TransactionFormProps) {
  const [type, setType] = useState<"income" | "expense">("income")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const categories = TRANSACTION_CATEGORIES[type]

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    formData.set("type", type)
    const result = await createTransactionAction(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setLoading(false)
      onDone?.()
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">{error}</div>}

      <div className="flex gap-2">
        <button type="button" onClick={() => setType("income")}
          className={`flex-1 h-10 rounded-md text-sm font-medium transition-colors ${type === "income" ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
          {ko.finances.income}
        </button>
        <button type="button" onClick={() => setType("expense")}
          className={`flex-1 h-10 rounded-md text-sm font-medium transition-colors ${type === "expense" ? "bg-red-600 text-white" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
          {ko.finances.expense}
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{ko.finances.category} *</label>
        <select name="category" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <option value="">선택...</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{ko.common.amount} (KRW) *</label>
        <input name="amount" type="number" min="1" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{ko.common.date} *</label>
        <input name="transaction_date" type="date" required defaultValue={new Date().toISOString().split("T")[0]} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{ko.common.description}</label>
        <input name="description" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{ko.timeTracking.project}</label>
        <select name="project_id" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <option value="">선택 안함</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <button type="submit" disabled={loading} className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
        {loading ? ko.common.loading : ko.common.save}
      </button>
    </form>
  )
}
