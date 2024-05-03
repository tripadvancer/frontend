import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { Avatar } from '@/components/ui/avatar'
import { formattedDate } from '@/utils/helpers/common'
import { getCurrentLocale, getI18n } from '@/utils/i18n/i18n.server'

export const PlaceSidebarAuthor = async ({ author, createdAt }: IPlace) => {
    const t = await getI18n()
    const locale = getCurrentLocale()

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('pages.place.author.title')}</h3>
            <Link href={`/users/${author.id}`} className="flex items-center gap-2 text-black-70">
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
