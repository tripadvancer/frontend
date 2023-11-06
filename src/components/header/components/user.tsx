import type { IUserInfo } from '@/types/user'

import { Avatar } from '@/components/avatar'

import { UserMenu } from './user-menu'

type UserProps = IUserInfo

export const User = ({ id, name, avatar }: UserProps) => {
    return (
        <UserMenu userId={id}>
            <div className="hover-animated flex cursor-pointer gap-x-2 text-big-bold text-blue-100 hover:text-blue-active">
                <div className="hidden sm:block">{name}</div>
                <Avatar src={avatar} alt="" size={24} />
            </div>
        </UserMenu>
    )
}
