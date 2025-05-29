'use client'

import { useMediaQuery } from 'usehooks-ts'

import { Avatar } from '@/components/ui/avatar'
import { IUser } from '@/utils/types/user'

export const UserName = ({ user }: { user: IUser }) => {
    const isMobile = useMediaQuery('(max-width: 639px)')

    return (
        <h1 className="h1 mb-8 flex flex-col items-center gap-4 overflow-hidden lg:mb-16 lg:flex-row">
            <div className="flex-none">
                <Avatar avatar={user.avatar} name={user.name} size={isMobile ? 96 : 64} />
            </div>
            <div className="max-w-full break-words text-center lg:overflow-hidden lg:truncate">{user.name}</div>
        </h1>
    )
}
