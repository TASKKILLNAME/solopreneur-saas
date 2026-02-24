import { getProfile } from "@/actions/settings"
import { PageHeader } from "@/components/layout/page-header"
import { SettingsForm } from "@/components/settings/settings-form"
import { ko } from "@/dict/ko"

export default async function SettingsPage() {
  const profile = await getProfile()

  return (
    <div className="space-y-6">
      <PageHeader title={ko.settings.title} />
      <SettingsForm profile={profile} />
    </div>
  )
}
