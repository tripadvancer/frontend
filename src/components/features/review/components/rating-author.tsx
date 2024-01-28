import Link from 'next/link'

import type { IReview } from '@/utils/types/review'

import { Avatar } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'
import { FormattedDate } from '@/utils/helpers'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

type RatingAuthorProps = IReview

export const RatingAuthor = ({ user, rating, createdAt }: RatingAuthorProps) => {
    const locale = getCurrentLocale()
    const formattedDate = FormattedDate(createdAt, locale)

    return (
        <Link href={`/users/${user.id}`} className="group inline-flex items-start gap-2">
            <Avatar {...user} size={32} />
            <div className="flex flex-col">
                <Rating value={rating} size={16} />
                <div className="sm:flex sm:gap-x-2">
                    <div className="hover-animated text-small-bold text-black-70 group-hover:text-blue-active">
                        {user.name}
                    </div>
                    <div className="text-small text-black-40">{formattedDate}</div>
                </div>
            </div>
        </Link>
    )
}
