"use client"

import { Trash2, Clock } from "lucide-react"
import { deleteTimeEntryAction } from "@/actions/time-entries"
import { ko } from "@/dict/ko"
import { formatMinutesToHours, formatDateShort } from "@/lib/utils"

interface TimeEntry {
  id: string
  description: string | null
  start_time: string
  duration_minutes: number | null
  is_billable: boolean
  projects: { name: string } | null
}

export function TimeEntryList({ entries }: { entries: TimeEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Clock className="mx-auto h-12 w-12 mb-4 opacity-50" />
        <p>{ko.timeTracking.noEntries}</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-medium">{ko.common.date}</th>
              <th className="text-left p-4 font-medium">{ko.timeTracking.project}</th>
              <th className="text-left p-4 font-medium">{ko.common.description}</th>
              <th className="text-right p-4 font-medium">{ko.timeTracking.duration}</th>
              <th className="text-center p-4 font-medium">{ko.timeTracking.billable}</th>
              <th className="p-4 w-10" />
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4 text-muted-foreground">{formatDateShort(entry.start_time)}</td>
                <td className="p-4 font-medium">{entry.projects?.name}</td>
                <td className="p-4 text-muted-foreground">{entry.description || "-"}</td>
                <td className="p-4 text-right font-mono">{entry.duration_minutes ? formatMinutesToHours(entry.duration_minutes) : "-"}</td>
                <td className="p-4 text-center">
                  <span className={`inline-flex h-5 w-5 rounded-full items-center justify-center text-xs ${entry.is_billable ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
                    {entry.is_billable ? "O" : "-"}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => deleteTimeEntryAction(entry.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
