"use client"

import { Send, CheckCircle } from "lucide-react"
import { updateInvoiceStatusAction } from "@/actions/invoices"
import { ko } from "@/dict/ko"

export function InvoiceActions({ id, status }: { id: string; status: string }) {
  return (
    <div className="flex gap-2">
      {status === "draft" && (
        <button
          onClick={() => updateInvoiceStatusAction(id, "sent")}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-blue-600 px-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Send className="h-4 w-4" />
          {ko.invoices.markAsSent}
        </button>
      )}
      {(status === "sent" || status === "overdue") && (
        <button
          onClick={() => updateInvoiceStatusAction(id, "paid")}
          className="inline-flex h-9 items-center gap-2 rounded-md bg-green-600 px-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
        >
          <CheckCircle className="h-4 w-4" />
          {ko.invoices.markAsPaid}
        </button>
      )}
    </div>
  )
}
