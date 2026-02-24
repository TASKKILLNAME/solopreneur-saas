import { PageHeader } from "@/components/layout/page-header"
import { ProjectForm } from "@/components/projects/project-form"
import { getClients } from "@/actions/clients"
import { createProjectAction } from "@/actions/projects"
import { ko } from "@/dict/ko"

export default async function NewProjectPage() {
  const clients = await getClients()
  return (
    <div className="space-y-6">
      <PageHeader title={ko.projects.newProject} />
      <ProjectForm clients={clients || []} action={createProjectAction} />
    </div>
  )
}
