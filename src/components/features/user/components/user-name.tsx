import type { IUser } from '@/utils/types/user'

import { Avatar } from '@/components/ui/avatar'

export const UserName = (user: IUser) => {
    return (
        <h1 className="mb-8 flex flex-col items-center gap-4 overflow-hidden text-h1-m sm:text-h1 lg:mb-16 lg:flex-row">
            <div className="flex-none">
                <Avatar {...user} size={64} />
            </div>
            <div className="max-w-full break-words text-center lg:overflow-hidden lg:truncate">{user.name}</div>
        </h1>
    )
}
