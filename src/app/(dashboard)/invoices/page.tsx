import Link from "next/link"
import { Plus, FileText } from "lucide-react"
import { getInvoices } from "@/actions/invoices"
import { PageHeader } from "@/components/layout/page-header"
import { ko } from "@/dict/ko"
import { INVOICE_STATUS, INVOICE_STATUS_COLORS } from "@/lib/constants"
import { formatCurrency, formatDateShort, cn } from "@/lib/utils"

export default async function InvoicesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: filterStatus } = await searchParams
  const invoices = await getInvoices(filterStatus)
  const statuses = ["all", ...Object.keys(INVOICE_STATUS)]
  const statusLabels: Record<string, string> = { all: "전체", ...INVOICE_STATUS }

  return (
    <div className="space-y-6">
      <PageHeader title={ko.invoices.title}>
        <Link href="/invoices/new" className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          {ko.invoices.newInvoice}
        </Link>
      </PageHeader>

      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <Link key={s} href={s === "all" ? "/invoices" : `/invoices?status=${s}`}
            className={cn("inline-flex h-8 items-center rounded-full px-3 text-xs font-medium transition-colors",
              (filterStatus || "all") === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
            )}>
            {statusLabels[s]}
          </Link>
        ))}
      </div>

      {(!invoices || invoices.length === 0) ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
          <p>{ko.invoices.noInvoices}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium">{ko.invoices.invoiceNumber}</th>
                  <th className="text-left p-4 font-medium">{ko.projects.client}</th>
                  <th className="text-left p-4 font-medium">{ko.invoices.issueDate}</th>
                  <th className="text-left p-4 font-medium">{ko.invoices.dueDate}</th>
                  <th className="text-right p-4 font-medium">{ko.invoices.total}</th>
                  <th className="text-left p-4 font-medium">{ko.common.status}</th>
                </tr>
              </thead>
              <tbody>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {invoices.map((inv: any) => (
                  <tr key={inv.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <Link href={`/invoices/${inv.id}`} className="text-primary hover:underline font-medium">
                        {inv.invoice_number}
                      </Link>
                    </td>
                    <td className="p-4 text-muted-foreground">{inv.clients?.company_name}</td>
                    <td className="p-4 text-muted-foreground">{formatDateShort(inv.issue_date)}</td>
                    <td className="p-4 text-muted-foreground">{formatDateShort(inv.due_date)}</td>
                    <td className="p-4 text-right font-medium">{formatCurrency(inv.total)}</td>
                    <td className="p-4">
                      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", INVOICE_STATUS_COLORS[inv.status])}>
                        {INVOICE_STATUS[inv.status as keyof typeof INVOICE_STATUS]}
                      </span>
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
