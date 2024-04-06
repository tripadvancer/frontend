import { Avatar } from '@/components/ui/avatar'
import { getUserById } from '@/services/users'

export const UserName = async ({ userId }: { userId: string }) => {
    const user = await getUserById(userId)

    return (
        <h1 className="mb-8 flex flex-col items-center gap-4 overflow-hidden text-h1-m sm:text-h1 lg:mb-16 lg:flex-row">
            <div className="flex-none">
                <Avatar {...user} size={64} />
            </div>
            <div className="max-w-full break-words text-center lg:overflow-hidden lg:truncate">{user.name}</div>
        </h1>
    )
}
