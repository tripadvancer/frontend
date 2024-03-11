import type { IUser } from '@/utils/types/user'

import { Avatar } from '@/components/ui/avatar'

export const UserName = (user: IUser) => {
    return (
        <h1 className="mb-8 flex items-center gap-4 text-h1-m sm:text-h1 lg:mb-16 lg:flex-row">
            <div className="grow-0">
                <Avatar {...user} size={64} />
            </div>
            <div className="grow-1 overflow-hidden truncate">{user.name}</div>
        </h1>
    )
}
