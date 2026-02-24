import { getInvoice, updateInvoiceStatusAction, deleteInvoiceAction } from "@/actions/invoices"
import { PageHeader } from "@/components/layout/page-header"
import { DeleteButton } from "@/components/clients/delete-button"
import { InvoiceActions } from "@/components/invoices/invoice-actions"
import { ko } from "@/dict/ko"
import { INVOICE_STATUS, INVOICE_STATUS_COLORS } from "@/lib/constants"
import { formatCurrency, formatDate, cn } from "@/lib/utils"

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invoice = await getInvoice(id)

  return (
    <div className="space-y-6">
      <PageHeader title={`${ko.invoices.title} ${invoice.invoice_number}`}>
        <InvoiceActions id={id} status={invoice.status} />
        <DeleteButton id={id} action={deleteInvoiceAction} />
      </PageHeader>

      <div className="max-w-3xl space-y-6">
        {/* Invoice Info */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">{invoice.invoice_number}</h2>
              <p className="text-sm text-muted-foreground">{invoice.clients?.company_name}</p>
            </div>
            <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", INVOICE_STATUS_COLORS[invoice.status])}>
              {INVOICE_STATUS[invoice.status as keyof typeof INVOICE_STATUS]}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-sm mb-6">
            <div><span className="text-muted-foreground">발행일:</span> {formatDate(invoice.issue_date)}</div>
            <div><span className="text-muted-foreground">납부기한:</span> {formatDate(invoice.due_date)}</div>
            {invoice.payment_date && <div><span className="text-muted-foreground">결제일:</span> {formatDate(invoice.payment_date)}</div>}
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 font-medium">{ko.common.description}</th>
                  <th className="text-center py-2 font-medium w-20">{ko.invoices.quantity}</th>
                  <th className="text-right py-2 font-medium w-28">{ko.invoices.unitPrice}</th>
                  <th className="text-right py-2 font-medium w-28">{ko.invoices.lineTotal}</th>
                </tr>
              </thead>
              <tbody>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {invoice.invoice_items?.map((item: any) => (
                  <tr key={item.id} className="border-b border-border">
                    <td className="py-2">{item.description}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">{formatCurrency(item.unit_price)}</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between text-sm"><span>{ko.invoices.subtotal}</span><span>{formatCurrency(invoice.subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span>부가세 ({invoice.tax_rate}%)</span><span>{formatCurrency(invoice.tax_amount)}</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-border pt-2"><span>{ko.invoices.total}</span><span>{formatCurrency(invoice.total)}</span></div>
          </div>

          {invoice.notes && (
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
