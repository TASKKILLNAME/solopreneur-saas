"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ko } from "@/dict/ko"
import { PROJECT_STATUS } from "@/lib/constants"

interface ProjectFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any
  clients: { id: string; company_name: string }[]
  action: (formData: FormData) => Promise<{ error: string } | undefined | void>
}

export function ProjectForm({ initialData, clients, action }: ProjectFormProps) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    const result = await action(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">{error}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="name" className="text-sm font-medium">{ko.projects.projectName} *</label>
          <input id="name" name="name" required defaultValue={initialData?.name} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2">
          <label htmlFor="client_id" className="text-sm font-medium">{ko.projects.client}</label>
          <select id="client_id" name="client_id" defaultValue={initialData?.client_id || ""} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="">선택 안함</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.company_name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">{ko.common.status}</label>
          <select id="status" name="status" defaultValue={initialData?.status || "planning"} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {Object.entries(PROJECT_STATUS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="start_date" className="text-sm font-medium">{ko.projects.startDate}</label>
          <input id="start_date" name="start_date" type="date" defaultValue={initialData?.start_date || ""} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2">
          <label htmlFor="end_date" className="text-sm font-medium">{ko.projects.endDate}</label>
          <input id="end_date" name="end_date" type="date" defaultValue={initialData?.end_date || ""} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2">
          <label htmlFor="budget" className="text-sm font-medium">{ko.projects.budget} (KRW)</label>
          <input id="budget" name="budget" type="number" min="0" defaultValue={initialData?.budget || 0} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2">
          <label htmlFor="hourly_rate" className="text-sm font-medium">{ko.projects.hourlyRate} (KRW)</label>
          <input id="hourly_rate" name="hourly_rate" type="number" min="0" defaultValue={initialData?.hourly_rate || ""} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="description" className="text-sm font-medium">{ko.common.description}</label>
          <textarea id="description" name="description" rows={3} defaultValue={initialData?.description || ""} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
          {loading ? ko.common.loading : ko.common.save}
        </button>
        <button type="button" onClick={() => router.back()} className="inline-flex h-10 items-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent transition-colors">
          {ko.common.cancel}
        </button>
      </div>
    </form>
  )
}
