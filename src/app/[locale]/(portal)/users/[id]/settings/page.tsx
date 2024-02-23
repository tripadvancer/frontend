import { UserSettings } from '@/components/features/user-settings/user-settings'

export default function UserSettingsPage({ params }: { params: { id: string } }) {
    return <UserSettings userId={parseInt(params.id)} />
}
