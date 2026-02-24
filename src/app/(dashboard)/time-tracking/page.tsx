import { getTimeEntries, getWeeklySummary } from "@/actions/time-entries"
import { getProjects } from "@/actions/projects"
import { PageHeader } from "@/components/layout/page-header"
import { Timer } from "@/components/time-tracking/timer"
import { TimeEntryList } from "@/components/time-tracking/time-entry-list"
import { ko } from "@/dict/ko"
import { formatMinutesToHours } from "@/lib/utils"

export default async function TimeTrackingPage() {
  const [entries, projects, weeklySummary] = await Promise.all([
    getTimeEntries(),
    getProjects("in_progress"),
    getWeeklySummary(),
  ])

  const totalMinutes = (weeklySummary || []).reduce((sum, e) => sum + (e.duration_minutes || 0), 0)

  return (
    <div className="space-y-6">
      <PageHeader title={ko.timeTracking.title} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Timer projects={projects || []} />
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-2">{ko.timeTracking.weeklySummary}</h3>
          <p className="text-3xl font-bold">{formatMinutesToHours(totalMinutes)}</p>
          <p className="text-sm text-muted-foreground mt-1">{ko.timeTracking.totalHours}</p>
        </div>
      </div>

      <TimeEntryList entries={entries || []} />
    </div>
  )
}
