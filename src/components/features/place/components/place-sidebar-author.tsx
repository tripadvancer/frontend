import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { Avatar } from '@/components/ui/avatar'
import { FormattedDate } from '@/utils/helpers'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

export const PlaceSidebarAuthor = ({ author, createdAt }: IPlace) => {
    const locale = getCurrentLocale()
    const formattedDate = FormattedDate(createdAt, locale)

    return (
        <Link href={`/users/${author.id}`} className="flex items-center gap-2 text-black-70">
            <Avatar {...author} size={32} />
            <div>
                <div className="text-small-bold">{author.name}</div>
                <div className="text-small text-black-40">{formattedDate}</div>
            </div>
        </Link>
    )
}
