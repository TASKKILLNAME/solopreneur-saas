"use client"

import Link from "next/link"
import { Building2, Mail, Phone, Plus } from "lucide-react"
import { ko } from "@/dict/ko"

interface Client {
  id: string
  company_name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  status: string
}

export function ClientList({
  clients,
  statusLabels,
}: {
  clients: Client[]
  statusLabels: Record<string, string>
}) {
  if (clients.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{ko.clients.noClients}</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{ko.clients.emptyGuide}</p>
        <Link
          href="/clients/new"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {ko.clients.emptyAction}
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <Link
          key={client.id}
          href={`/clients/${client.id}`}
          className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-base">{client.company_name}</h3>
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground">
              {statusLabels[client.status] || client.status}
            </span>
          </div>
          {client.contact_name && (
            <p className="text-sm text-muted-foreground mb-2">{client.contact_name}</p>
          )}
          <div className="space-y-1">
            {client.email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                {client.email}
              </div>
            )}
            {client.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                {client.phone}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
