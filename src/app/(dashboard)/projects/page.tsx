import Link from "next/link"
import { Plus, FolderKanban } from "lucide-react"
import { getProjects } from "@/actions/projects"
import { PageHeader } from "@/components/layout/page-header"
import { ko } from "@/dict/ko"
import { PROJECT_STATUS, PROJECT_STATUS_COLORS } from "@/lib/constants"
import { formatDate, cn } from "@/lib/utils"

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status: filterStatus } = await searchParams
  const projects = await getProjects(filterStatus)
  const statuses = ["all", ...Object.keys(PROJECT_STATUS)]
  const statusLabels: Record<string, string> = { all: "전체", ...PROJECT_STATUS }

  return (
    <div className="space-y-6">
      <PageHeader title={ko.projects.title}>
        <Link href="/projects/new" className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          {ko.projects.newProject}
        </Link>
      </PageHeader>

      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <Link
            key={s}
            href={s === "all" ? "/projects" : `/projects?status=${s}`}
            className={cn(
              "inline-flex h-8 items-center rounded-full px-3 text-xs font-medium transition-colors",
              (filterStatus || "all") === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            {statusLabels[s]}
          </Link>
        ))}
      </div>

      {(!projects || projects.length === 0) ? (
        <div className="text-center py-16">
          <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FolderKanban className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{ko.projects.noProjects}</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{ko.projects.emptyGuide}</p>
          <Link
            href="/projects/new"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            {ko.projects.emptyAction}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {projects.map((project: any) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{project.name}</h3>
                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", PROJECT_STATUS_COLORS[project.status])}>
                  {PROJECT_STATUS[project.status as keyof typeof PROJECT_STATUS]}
                </span>
              </div>
              {project.clients?.company_name && (
                <p className="text-sm text-muted-foreground mb-2">{project.clients.company_name}</p>
              )}
              {project.end_date && (
                <p className="text-xs text-muted-foreground">마감: {formatDate(project.end_date)}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
