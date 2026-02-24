import { PageHeader } from "@/components/layout/page-header"
import { ProjectForm } from "@/components/projects/project-form"
import { getProject, updateProjectAction } from "@/actions/projects"
import { getClients } from "@/actions/clients"
import { ko } from "@/dict/ko"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [project, clients] = await Promise.all([getProject(id), getClients()])
  const action = updateProjectAction.bind(null, id)
  return (
    <div className="space-y-6">
      <PageHeader title={ko.projects.editProject} />
      <ProjectForm initialData={project} clients={clients || []} action={action} />
    </div>
  )
}
