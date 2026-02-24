"use client"

import { useState } from "react"
import Link from "next/link"
import { signupAction } from "@/actions/auth"
import { ko } from "@/dict/ko"

export default function SignupPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")
    const result = await signupAction(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <div className="text-center mb-6">
        <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4">
          <span className="text-primary-foreground text-xl font-bold">S</span>
        </div>
        <h1 className="text-2xl font-bold">{ko.auth.signup}</h1>
        <p className="text-sm text-muted-foreground mt-1">SoloBiz 계정을 만드세요</p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="full_name" className="text-sm font-medium">
            {ko.auth.fullName}
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            {ko.auth.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="name@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            {ko.auth.password}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? ko.common.loading : ko.auth.signup}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        {ko.auth.hasAccount}{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          {ko.auth.login}
        </Link>
      </p>
    </div>
  )
}
