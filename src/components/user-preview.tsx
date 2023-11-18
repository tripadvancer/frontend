import Link from 'next/link'

import type { IUserInfo } from '@/utils/types/user'

import { Avatar } from '@/components/avatar/avatar'

type UserProps = IUserInfo & {
    date: string
}

export const UserPreview = ({ id, name, avatar, date }: UserProps) => {
    return (
        <Link href={`/users/${id}`} className="group inline-flex items-center gap-2">
            <Avatar src={avatar} alt={name} size={32} />
            <div>
                <div className="hover-animated text-small-bold text-black-70 group-hover:text-blue-active">{name}</div>
                <div className="text-small text-black-40">{date}</div>
            </div>
        </Link>
    )
}
