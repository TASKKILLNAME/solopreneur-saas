import Link from "next/link"
import { Plus } from "lucide-react"
import { getClients } from "@/actions/clients"
import { PageHeader } from "@/components/layout/page-header"
import { ko } from "@/dict/ko"
import { CLIENT_STATUS } from "@/lib/constants"
import { ClientList } from "@/components/clients/client-list"

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="space-y-6">
      <PageHeader title={ko.clients.title}>
        <Link
          href="/clients/new"
          className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {ko.clients.newClient}
        </Link>
      </PageHeader>
      <ClientList clients={clients || []} statusLabels={CLIENT_STATUS} />
    </div>
  )
}
