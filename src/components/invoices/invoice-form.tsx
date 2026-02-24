"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"
import { createInvoiceAction } from "@/actions/invoices"
import { ko } from "@/dict/ko"
import { formatCurrency } from "@/lib/utils"

interface InvoiceFormProps {
  clients: { id: string; company_name: string }[]
  projects: { id: string; name: string }[]
}

interface LineItem {
  description: string
  quantity: number
  unit_price: number
}

export function InvoiceForm({ clients, projects }: InvoiceFormProps) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [clientId, setClientId] = useState("")
  const [projectId, setProjectId] = useState("")
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState("")
  const [taxRate, setTaxRate] = useState(10)
  const [notes, setNotes] = useState("")
  const [items, setItems] = useState<LineItem[]>([{ description: "", quantity: 1, unit_price: 0 }])

  const subtotal = items.reduce((sum, item) => sum + Math.round(item.quantity * item.unit_price), 0)
  const taxAmount = Math.round(subtotal * (taxRate / 100))
  const total = subtotal + taxAmount

  function addItem() {
    setItems([...items, { description: "", quantity: 1, unit_price: 0 }])
  }

  function removeItem(index: number) {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index))
  }

  function updateItem(index: number, field: keyof LineItem, value: string | number) {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    setItems(updated)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!clientId || !issueDate || !dueDate) {
      setError("필수 항목을 모두 입력해주세요")
      return
    }
    setLoading(true)
    setError("")

    const result = await createInvoiceAction({
      client_id: clientId,
      project_id: projectId || undefined,
      issue_date: issueDate,
      due_date: dueDate,
      tax_rate: taxRate,
      notes: notes || undefined,
      items: items.filter((item) => item.description.trim()),
    })

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">{ko.projects.client} *</label>
          <select value={clientId} onChange={(e) => setClientId(e.target.value)} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="">고객 선택...</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{ko.timeTracking.project}</label>
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="">선택 안함</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{ko.invoices.issueDate} *</label>
          <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{ko.invoices.dueDate} *</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
      </div>

      {/* Line Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{ko.invoices.items}</h3>
          <button type="button" onClick={addItem} className="inline-flex h-8 items-center gap-1 rounded-md bg-secondary px-3 text-xs font-medium hover:bg-secondary/80 transition-colors">
            <Plus className="h-3.5 w-3.5" /> {ko.invoices.addItem}
          </button>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_80px_120px_100px_32px] gap-2 text-xs font-medium text-muted-foreground px-1">
            <span>{ko.common.description}</span>
            <span>{ko.invoices.quantity}</span>
            <span>{ko.invoices.unitPrice}</span>
            <span className="text-right">{ko.invoices.lineTotal}</span>
            <span />
          </div>
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_80px_120px_100px_32px] gap-2 items-center">
              <input value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="항목 설명" className="flex h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <input type="number" min="0.01" step="0.01" value={item.quantity} onChange={(e) => updateItem(i, "quantity", parseFloat(e.target.value) || 0)} className="flex h-9 rounded-md border border-input bg-background px-2 text-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <input type="number" min="0" value={item.unit_price} onChange={(e) => updateItem(i, "unit_price", parseInt(e.target.value) || 0)} className="flex h-9 rounded-md border border-input bg-background px-2 text-sm text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <span className="text-sm text-right font-medium">{formatCurrency(Math.round(item.quantity * item.unit_price))}</span>
              <button type="button" onClick={() => removeItem(i)} className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors" disabled={items.length <= 1}>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2 max-w-xs ml-auto">
        <div className="flex justify-between text-sm"><span>{ko.invoices.subtotal}</span><span>{formatCurrency(subtotal)}</span></div>
        <div className="flex justify-between text-sm items-center gap-2">
          <span>{ko.invoices.tax}</span>
          <div className="flex items-center gap-1">
            <input type="number" min="0" max="100" value={taxRate} onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} className="h-7 w-14 rounded border border-input bg-background px-1 text-xs text-center" />
            <span className="text-xs">%</span>
          </div>
          <span>{formatCurrency(taxAmount)}</span>
        </div>
        <div className="flex justify-between font-bold text-base border-t border-border pt-2"><span>{ko.invoices.total}</span><span>{formatCurrency(total)}</span></div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{ko.common.notes}</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
          {loading ? ko.common.loading : ko.common.save}
        </button>
        <button type="button" onClick={() => router.back()} className="inline-flex h-10 items-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent transition-colors">
          {ko.common.cancel}
        </button>
      </div>
    </form>
  )
}
