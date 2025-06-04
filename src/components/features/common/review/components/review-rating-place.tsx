'use client'

import { useLocale } from 'next-intl'

import Link from 'next/link'

import { Rating } from '@/components/ui/rating'
import { getCountryByCode } from '@/services/countries'
import { formattedDate } from '@/utils/helpers/common'
import { IReview } from '@/utils/types/common'

export const ReviewRatingPlace = ({ place, rating, createdAt }: IReview) => {
    const locale = useLocale()
    const country = getCountryByCode(place.countryCode)

    return (
        <div className="flex flex-col gap-y-1 overflow-hidden">
            <Rating value={rating} size={16} />
            <div className="flex flex-col flex-wrap gap-x-2 sm:flex-row">
                <Link href={`/places/${place.id}`} className="break-words text-small-bold text-black-70">
                    {place.title}
                </Link>
                <div className="flex gap-x-2">
                    {country && (
                        <>
                            <Link href={`/countries/${country.slug}`} className="text-small text-black-40">
                                {country.name[locale]}
                            </Link>
                            <div className="text-small text-black-40">•</div>
                        </>
                    )}
                    <div className="text-small text-black-40">{formattedDate(createdAt, locale)}</div>
                </div>
            </div>
        </div>
    )
}
