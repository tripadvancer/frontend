import { getUserById } from '@/services/users'

export const UserProfile = async ({ userId }: { userId: string }) => {
    const user = await getUserById(userId)
    const privacy = user.settings.privacy.show_my_map

    return (
        <div>
            <div>Visited map: {privacy ? 'on' : 'off'}</div>
        </div>
    )
}
