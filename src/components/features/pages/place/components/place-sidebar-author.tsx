import { getLocale, getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { Avatar } from '@/components/ui/avatar'
import { formattedDate } from '@/utils/helpers/common'

type PlaceSidebarAuthorProps = {
    author: {
        id: number
        name: string
        avatar: string | null
    }
    createdAt: Date
}

export const PlaceSidebarAuthor = async ({ author, createdAt }: PlaceSidebarAuthorProps) => {
    const t = await getTranslations()
    const locale = await getLocale()

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('page.place.author')}</h3>
            <Link href={`/users/${author.name.toLowerCase()}`} className="flex items-center gap-2 text-black-70">
                <div className="grow-0">
                    <Avatar {...author} size={32} />
                </div>
                <div className="grow-1 overflow-hidden">
                    <div className="truncate text-small-bold">{author.name}</div>
                    <div className="text-small text-black-40">{formattedDate(createdAt, locale)}</div>
                </div>
            </Link>
        </section>
    )
}
