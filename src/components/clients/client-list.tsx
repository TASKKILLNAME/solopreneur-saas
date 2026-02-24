"use client"

import Link from "next/link"
import { Building2, Mail, Phone } from "lucide-react"
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
      <div className="text-center py-12 text-muted-foreground">
        <Building2 className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p>{ko.clients.noClients}</p>
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
