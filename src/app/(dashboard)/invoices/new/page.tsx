import { PageHeader } from "@/components/layout/page-header"
import { InvoiceForm } from "@/components/invoices/invoice-form"
import { getClients } from "@/actions/clients"
import { getProjects } from "@/actions/projects"
import { ko } from "@/dict/ko"

export default async function NewInvoicePage() {
  const [clients, projects] = await Promise.all([getClients(), getProjects()])
  return (
    <div className="space-y-6">
      <PageHeader title={ko.invoices.newInvoice} />
      <InvoiceForm clients={clients || []} projects={projects || []} />
    </div>
  )
}
