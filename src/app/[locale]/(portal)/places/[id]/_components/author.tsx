import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { Avatar } from '@/components/avatar/avatar'
import { FormattedDate } from '@/utils/helpers'

type AuthorProps = IPlace & {
    locale: string
}

export const Author = ({ id, author, createdAt, locale }: AuthorProps) => {
    const formattedDate = FormattedDate(createdAt, locale)

    return (
        <Link href={`/users/${id}`} className="flex items-center gap-2 text-black-70">
            <Avatar src={author.avatar} alt={author.name} size={32} />
            <div>
                <div className="text-small-bold">{author.name}</div>
                <div className="text-small text-black-40">{formattedDate}</div>
            </div>
        </Link>
    )
}
