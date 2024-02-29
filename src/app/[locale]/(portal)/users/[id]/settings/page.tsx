import { UserSettings } from '@/components/features/user-settings/user-settings'
import { ProtectClientRoute } from '@/components/ui/protect-client-route'

export default function UserSettingsPage({ params }: { params: { id: string } }) {
    return (
        <ProtectClientRoute userId={parseInt(params.id)}>
            <UserSettings userId={params.id} />
        </ProtectClientRoute>
    )
}
