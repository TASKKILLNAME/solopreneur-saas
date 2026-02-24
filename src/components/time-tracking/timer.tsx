"use client"

import { useState } from "react"
import { Play, Square } from "lucide-react"
import { useTimer } from "@/hooks/use-timer"
import { createTimeEntryAction } from "@/actions/time-entries"
import { ko } from "@/dict/ko"

interface TimerProps {
  projects: { id: string; name: string }[]
}

export function Timer({ projects }: TimerProps) {
  const timer = useTimer()
  const [projectId, setProjectId] = useState(timer.projectId || "")
  const [description, setDescription] = useState(timer.description || "")

  async function handleStart() {
    if (!projectId) return
    timer.start(projectId, description)
  }

  async function handleStop() {
    const result = timer.stop()
    if (result.startTime) {
      await createTimeEntryAction({
        project_id: result.projectId,
        description: result.description || undefined,
        start_time: result.startTime,
        end_time: result.endTime,
        duration_minutes: result.durationMinutes,
        is_billable: true,
      })
      setProjectId("")
      setDescription("")
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="text-center mb-6">
        <p className="text-5xl font-mono font-bold tracking-wider">
          {timer.formatElapsed()}
        </p>
        {timer.isRunning && (
          <p className="text-sm text-muted-foreground mt-2">
            {projects.find((p) => p.id === timer.projectId)?.name}
            {timer.description && ` - ${timer.description}`}
          </p>
        )}
      </div>

      {!timer.isRunning ? (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">프로젝트 선택...</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="작업 설명 (선택사항)"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            onClick={handleStart}
            disabled={!projectId}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Play className="h-5 w-5" />
            {ko.timeTracking.startTimer}
          </button>
        </div>
      ) : (
        <button
          onClick={handleStop}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors"
        >
          <Square className="h-5 w-5" />
          {ko.timeTracking.stopTimer}
        </button>
      )}
    </div>
  )
}
