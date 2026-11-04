'use client'

import { MapPinIcon } from 'lucide-react'
import { useLocale } from 'next-intl'

import Link from 'next/link'

import { Avatar } from '@/components/ui/avatar'
import { getCountryByCode } from '@/services/countries'
import { formattedDate } from '@/utils/helpers/common'
import { IFeedItem } from '@/utils/redux/services/feed/feed.types'

import { FeedItemPhotos } from './feed-item-photos'
import { FeedItemReviews } from './feed-item-reviews'

type FeedItemProps = {
    item: IFeedItem
}

const getDescriptionPreview = (description: string) =>
    description
        .replace(/<\/?[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

export const FeedItem = ({ item }: FeedItemProps) => {
    const locale = useLocale()
    const country = getCountryByCode(item.countryCode)
    const descriptionPreview = getDescriptionPreview(item.description)

    return (
        <article className="flex flex-col gap-y-5 border-b border-black-15 py-8 first:border-t last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between gap-x-4">
                <div className="flex min-w-0 items-center gap-x-3">
                    <Link href={`/users/${item.author.name.toLowerCase()}`} className="flex-none">
                        <Avatar avatar={item.author.avatar} name={item.author.name} size={40} />
                    </Link>
                    <div className="flex min-w-0 flex-col">
                        <Link
                            href={`/users/${item.author.name.toLowerCase()}`}
                            className="w-fit max-w-full truncate font-medium text-black-100 hover:text-blue-active"
                        >
                            {item.author.name}
                        </Link>
                        <time dateTime={item.createdAt} className="text-small text-black-40">
                            {formattedDate(new Date(item.createdAt), locale)}
                        </time>
                    </div>
                </div>
                {country && (
                    <Link
                        href={`/countries/${country.slug}`}
                        className="flex max-w-[45%] flex-none items-center gap-x-1.5 text-right text-big-bold text-blue-100 hover:text-blue-active"
                    >
                        <MapPinIcon size={16} className="flex-none" />
                        <span className="truncate">{country.name[locale]}</span>
                    </Link>
                )}
            </div>

            {item.photos.length > 0 && (
                <FeedItemPhotos photos={item.photos} title={item.title} author={item.author.name} />
            )}

            <div className="flex flex-col gap-y-2.5">
                <h2 className="h5 break-words">
                    <Link href={`/places/${item.id}`} className="hover:text-blue-active">
                        {item.title}
                    </Link>
                </h2>
                {descriptionPreview && <div className="line-clamp-4 break-words">{descriptionPreview}</div>}
            </div>

            <FeedItemReviews reviews={item.reviews} />
        </article>
    )
}
