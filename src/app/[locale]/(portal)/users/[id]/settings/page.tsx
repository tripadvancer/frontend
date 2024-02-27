import { UserSettings } from '@/components/features/user-settings/user-settings'
import { ProtectClientRoute } from '@/components/ui/protect-client-route'

export default function UserSettingsPage({ params }: { params: { id: string } }) {
    return <ProtectClientRoute component={<UserSettings userId={params.id} />} />
}
