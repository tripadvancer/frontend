'use client'

import { useLocale, useTranslations } from 'next-intl'

import Link from 'next/link'

import { Avatar } from '@/components/ui/avatar'
import { Rating } from '@/components/ui/rating'
import { formattedDate } from '@/utils/helpers/common'
import { IFeedItem } from '@/utils/redux/services/feed/feed.types'

type FeedItemReviewsProps = {
    reviews: IFeedItem['reviews']
}

export const FeedItemReviews = ({ reviews }: FeedItemReviewsProps) => {
    const t = useTranslations()
    const locale = useLocale()

    if (reviews.length === 0) return null

    return (
        <section className="flex flex-col gap-y-4 border-t border-black-15 pt-4">
            <h3 className="text-small-bold text-black-70">{t('page.feed.latestReviews')}</h3>
            <div className="flex flex-col gap-y-4">
                {reviews.map(review => (
                    <article key={`feed-item-review-${review.id}`} className="flex flex-col gap-y-2">
                        <div className="flex items-center justify-between gap-x-4">
                            <Link
                                href={`/users/${review.author.name.toLowerCase()}`}
                                className="flex min-w-0 items-center gap-x-2"
                            >
                                <Avatar avatar={review.author.avatar} name={review.author.name} size={24} />
                                <span className="truncate text-small-bold text-black-70">{review.author.name}</span>
                            </Link>
                            <div className="flex flex-none items-center gap-x-2">
                                <Rating value={review.rating} size={16} />
                                <time dateTime={review.createdAt} className="text-small text-black-40">
                                    {formattedDate(new Date(review.createdAt), locale)}
                                </time>
                            </div>
                        </div>
                        <p className="line-clamp-3 break-words pl-8 text-small">{review.text}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
