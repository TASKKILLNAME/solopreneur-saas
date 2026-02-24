"use client"

import { useState } from "react"
import { ko } from "@/dict/ko"
import { updateProfileAction } from "@/actions/settings"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SettingsForm({ profile }: { profile: any }) {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    setSuccess("")
    const result = await updateProfileAction(formData)
    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(ko.settings.saved)
    }
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-8 max-w-2xl">
      {error && <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">{error}</div>}
      {success && <div className="rounded-md bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm p-3">{success}</div>}

      {/* Profile */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">{ko.settings.profile}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{ko.auth.fullName} *</label>
            <input name="full_name" required defaultValue={profile?.full_name} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{ko.common.phone}</label>
            <input name="phone" defaultValue={profile?.phone} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">{ko.common.address}</label>
            <input name="address" defaultValue={profile?.address} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b border-border pb-2">{ko.settings.businessInfo}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">{ko.settings.businessName}</label>
            <input name="business_name" defaultValue={profile?.business_name} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{ko.settings.businessNumber}</label>
            <input name="business_registration_number" defaultValue={profile?.business_registration_number} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{ko.settings.bankName}</label>
            <input name="bank_name" defaultValue={profile?.bank_name} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{ko.settings.bankAccount}</label>
            <input name="bank_account" defaultValue={profile?.bank_account} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{ko.settings.defaultHourlyRate} (KRW)</label>
            <input name="default_hourly_rate" type="number" min="0" defaultValue={profile?.default_hourly_rate || 0} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading} className="inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
        {loading ? ko.common.loading : ko.common.save}
      </button>
    </form>
  )
}
