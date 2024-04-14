'use client'

import Link from 'next/link'

import type { IReview } from '@/utils/types/review'

import { Avatar } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'
import { formattedDate } from '@/utils/helpers/common'
import { useCurrentLocale } from '@/utils/i18n/i18n.client'

export const ReviewRatingAuthor = ({ user, rating, createdAt }: IReview) => {
    const locale = useCurrentLocale()

    return (
        <div className="flex flex-row gap-x-2 overflow-hidden">
            <div className="grow-0">
                <Avatar {...user} size={32} />
            </div>
            <div className="grow-1 overflow-hidden">
                <Rating value={rating} size={16} />
                <div className="flex flex-col gap-x-2 sm:flex-row">
                    <Link href={`/users/${user.id}`} className="break-words text-small-bold text-black-70">
                        {user.name}
                    </Link>
                    <div className="text-small text-black-40">{formattedDate(createdAt, locale)}</div>
                </div>
            </div>
        </div>
    )
}
