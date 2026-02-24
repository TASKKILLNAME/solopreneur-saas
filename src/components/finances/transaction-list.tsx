"use client"

import { useState } from "react"
import { Plus, Trash2, Wallet } from "lucide-react"
import { deleteTransactionAction } from "@/actions/transactions"
import { TransactionForm } from "./transaction-form"
import { ko } from "@/dict/ko"
import { formatCurrency, formatDateShort } from "@/lib/utils"

interface Transaction {
  id: string
  type: string
  category: string
  description: string | null
  amount: number
  transaction_date: string
  projects: { name: string } | null
}

export function TransactionList({
  transactions,
  projects,
}: {
  transactions: Transaction[]
  projects: { id: string; name: string }[]
}) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {ko.finances.addTransaction}
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-5 max-w-md">
          <TransactionForm projects={projects} onDone={() => setShowForm(false)} />
        </div>
      )}

      {transactions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Wallet className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <p>{ko.finances.noTransactions}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium">{ko.common.date}</th>
                  <th className="text-left p-4 font-medium">{ko.finances.type}</th>
                  <th className="text-left p-4 font-medium">{ko.finances.category}</th>
                  <th className="text-left p-4 font-medium">{ko.common.description}</th>
                  <th className="text-left p-4 font-medium">{ko.timeTracking.project}</th>
                  <th className="text-right p-4 font-medium">{ko.common.amount}</th>
                  <th className="p-4 w-10" />
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-muted-foreground">{formatDateShort(t.transaction_date)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        t.type === "income"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}>
                        {t.type === "income" ? ko.finances.income : ko.finances.expense}
                      </span>
                    </td>
                    <td className="p-4">{t.category}</td>
                    <td className="p-4 text-muted-foreground">{t.description || "-"}</td>
                    <td className="p-4 text-muted-foreground">{t.projects?.name || "-"}</td>
                    <td className={`p-4 text-right font-medium ${t.type === "income" ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"}`}>
                      {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                    </td>
                    <td className="p-4">
                      <button onClick={() => deleteTransactionAction(t.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
