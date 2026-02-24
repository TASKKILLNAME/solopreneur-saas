import Link from "next/link"
import { Pencil } from "lucide-react"
import { getProject, getProjectTasks, deleteProjectAction } from "@/actions/projects"
import { PageHeader } from "@/components/layout/page-header"
import { TaskList } from "@/components/projects/task-list"
import { DeleteButton } from "@/components/clients/delete-button"
import { ko } from "@/dict/ko"
import { PROJECT_STATUS, PROJECT_STATUS_COLORS } from "@/lib/constants"
import { formatDate, formatCurrency, cn } from "@/lib/utils"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)
  const tasks = await getProjectTasks(id)

  return (
    <div className="space-y-6">
      <PageHeader title={project.name}>
        <Link href={`/projects/${id}/edit`} className="inline-flex h-9 items-center gap-2 rounded-md border border-input px-3 text-sm font-medium hover:bg-accent transition-colors">
          <Pencil className="h-4 w-4" />
          {ko.common.edit}
        </Link>
        <DeleteButton id={id} action={deleteProjectAction} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", PROJECT_STATUS_COLORS[project.status])}>
                {PROJECT_STATUS[project.status as keyof typeof PROJECT_STATUS]}
              </span>
              {project.clients?.company_name && (
                <span className="text-sm text-muted-foreground">{project.clients.company_name}</span>
              )}
            </div>
            {project.description && <p className="text-sm text-muted-foreground mb-4">{project.description}</p>}
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              {project.start_date && <div><span className="text-muted-foreground">시작일:</span> {formatDate(project.start_date)}</div>}
              {project.end_date && <div><span className="text-muted-foreground">마감일:</span> {formatDate(project.end_date)}</div>}
              {project.budget > 0 && <div><span className="text-muted-foreground">예산:</span> {formatCurrency(project.budget)}</div>}
              {project.hourly_rate && <div><span className="text-muted-foreground">시급:</span> {formatCurrency(project.hourly_rate)}</div>}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold mb-4">{ko.projects.tasks}</h2>
            <TaskList tasks={tasks || []} projectId={id} />
          </div>
        </div>
      </div>
    </div>
  )
}
