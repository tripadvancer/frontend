'use client'

import { useTranslations } from 'next-intl'

import Link from 'next/link'

import { Distance } from '@/components/ui/distance'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { Rating } from '@/components/ui/rating'

type FeedPlacesItemProps = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    distance?: number
}

export const FeedPlacesItem = ({ id, title, cover, avgRating, reviewsCount, distance }: FeedPlacesItemProps) => {
    const t = useTranslations()

    return (
        <Link href={`/places/${id}`} className="text-black-100">
            <div className="flex flex-row gap-4">
                <div className="flex-none">
                    <PlacePreviewCover
                        cover={cover}
                        title={title}
                        size={160}
                        className="aspect-square w-32 rounded-2xl xl:w-40"
                    />
                </div>
                <div className="flex flex-col justify-between overflow-hidden">
                    <div className="h7 line-clamp-4 break-words">{title}</div>
                    <div>
                        <Rating value={avgRating ?? 0} size={16} />
                        <div className="flex flex-nowrap gap-x-2 text-small text-black-40">
                            <div>{t('common.reviewsCounter', { count: reviewsCount ?? 0 })}</div>
                            {distance && (
                                <>
                                    <div>•</div>
                                    <Distance distance={distance} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
