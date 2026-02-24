"use client"

import { useState } from "react"
import { Plus, Trash2, Check } from "lucide-react"
import { toggleTaskAction, addTaskAction, deleteTaskAction } from "@/actions/projects"
import { ko } from "@/dict/ko"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  is_completed: boolean
}

export function TaskList({ tasks, projectId }: { tasks: Task[]; projectId: string }) {
  const [newTask, setNewTask] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleAddTask() {
    if (!newTask.trim()) return
    setLoading(true)
    const formData = new FormData()
    formData.set("title", newTask.trim())
    await addTaskAction(projectId, formData)
    setNewTask("")
    setLoading(false)
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3 py-1.5 group">
          <button
            onClick={() => toggleTaskAction(task.id, projectId, !task.is_completed)}
            className={cn(
              "h-5 w-5 rounded border flex items-center justify-center transition-colors shrink-0",
              task.is_completed ? "bg-primary border-primary" : "border-input hover:border-primary"
            )}
          >
            {task.is_completed && <Check className="h-3 w-3 text-primary-foreground" />}
          </button>
          <span className={cn("flex-1 text-sm", task.is_completed && "line-through text-muted-foreground")}>
            {task.title}
          </span>
          <button
            onClick={() => deleteTaskAction(task.id, projectId)}
            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}

      <div className="flex gap-2 mt-3 pt-3 border-t border-border">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTask())}
          placeholder="새 태스크..."
          className="flex h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          onClick={handleAddTask}
          disabled={loading || !newTask.trim()}
          className="inline-flex h-9 items-center gap-1 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          {ko.projects.addTask}
        </button>
      </div>
    </div>
  )
}
