"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ko } from "@/dict/ko"

interface ClientFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any
  action: (formData: FormData) => Promise<{ error: string } | undefined | void>
}

export function ClientForm({ initialData, action }: ClientFormProps) {
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
          <label htmlFor="company_name" className="text-sm font-medium">
            {ko.clients.companyName} *
          </label>
          <input
            id="company_name"
            name="company_name"
            required
            defaultValue={initialData?.company_name}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="contact_name" className="text-sm font-medium">
            {ko.clients.contactName}
          </label>
          <input
            id="contact_name"
            name="contact_name"
            defaultValue={initialData?.contact_name}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            {ko.common.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={initialData?.email}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            {ko.common.phone}
          </label>
          <input
            id="phone"
            name="phone"
            defaultValue={initialData?.phone}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="business_registration_number" className="text-sm font-medium">
            {ko.clients.businessNumber}
          </label>
          <input
            id="business_registration_number"
            name="business_registration_number"
            defaultValue={initialData?.business_registration_number}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="address" className="text-sm font-medium">
            {ko.common.address}
          </label>
          <input
            id="address"
            name="address"
            defaultValue={initialData?.address}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="notes" className="text-sm font-medium">
            {ko.common.notes}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={initialData?.notes}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <input type="hidden" name="status" value={initialData?.status || "active"} />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? ko.common.loading : ko.common.save}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex h-10 items-center rounded-md border border-input bg-background px-6 text-sm font-medium hover:bg-accent transition-colors"
        >
          {ko.common.cancel}
        </button>
      </div>
    </form>
  )
}
