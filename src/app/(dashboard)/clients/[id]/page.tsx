import { getClient } from "@/actions/clients"
import { updateClientAction, deleteClientAction } from "@/actions/clients"
import { PageHeader } from "@/components/layout/page-header"
import { ClientForm } from "@/components/clients/client-form"
import { DeleteButton } from "@/components/clients/delete-button"
import { ko } from "@/dict/ko"

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = await getClient(id)

  const updateAction = updateClientAction.bind(null, id)

  return (
    <div className="space-y-6">
      <PageHeader title={ko.clients.editClient}>
        <DeleteButton id={id} action={deleteClientAction} />
      </PageHeader>
      <ClientForm initialData={client} action={updateAction} />
    </div>
  )
}
