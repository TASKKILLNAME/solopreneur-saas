"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { ko } from "@/dict/ko"

export function DeleteButton({
  id,
  action,
}: {
  id: string
  action: (id: string) => Promise<{ error: string } | undefined | void>
}) {
  const [confirming, setConfirming] = useState(false)

  async function handleDelete() {
    await action(id)
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{ko.clients.deleteConfirm}</span>
        <button
          onClick={handleDelete}
          className="inline-flex h-8 items-center rounded-md bg-destructive px-3 text-xs font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
        >
          {ko.common.confirm}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="inline-flex h-8 items-center rounded-md border border-input px-3 text-xs font-medium hover:bg-accent transition-colors"
        >
          {ko.common.cancel}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-destructive/30 px-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
    >
      <Trash2 className="h-4 w-4" />
      {ko.common.delete}
    </button>
  )
}
