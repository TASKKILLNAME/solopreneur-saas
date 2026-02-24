import { PageHeader } from "@/components/layout/page-header"
import { ClientForm } from "@/components/clients/client-form"
import { createClientAction } from "@/actions/clients"
import { ko } from "@/dict/ko"

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <PageHeader title={ko.clients.newClient} />
      <ClientForm action={createClientAction} />
    </div>
  )
}
