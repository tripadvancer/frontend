'use client'

import { useLocale } from 'next-intl'

import Link from 'next/link'

import { Avatar } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'
import { formattedDate } from '@/utils/helpers/common'
import { IReview } from '@/utils/types/common'

export const ReviewRatingAuthor = ({ user, rating, createdAt }: IReview) => {
    const locale = useLocale()

    return (
        <div className="flex flex-row gap-x-2 overflow-hidden">
            <div className="grow-0">
                <Link href={`/users/${user.name}`} className="break-words text-small-bold text-black-70">
                    <Avatar {...user} size={32} />
                </Link>
            </div>
            <div className="grow-1 overflow-hidden">
                <Rating value={rating} size={16} />
                <div className="flex flex-col gap-x-2 sm:flex-row">
                    <Link href={`/users/${user.name}`} className="break-words text-small-bold text-black-70">
                        {user.name}
                    </Link>
                    <div className="text-small text-black-40">{formattedDate(createdAt, locale)}</div>
                </div>
            </div>
        </div>
    )
}
