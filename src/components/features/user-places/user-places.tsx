'use client'

import { useState } from 'react'

import Link from 'next/link'

import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { ShowMore } from '@/components/ui/show-more'
import { usersAPI } from '@/redux/services/users-api'
import { getCountryByCode } from '@/services/countries'
import { useCurrentLocale, useI18n } from '@/utils/i18n/i18n.client'

import { UserPlacesSkeleton } from './user-places-skeleton'

export const UserPlaces = ({ userId }: { userId: number }) => {
    const t = useI18n()
    const locale = useCurrentLocale()
    const [page, setPage] = useState(1)
    const response = usersAPI.useGetPlacesByUserIdQuery({ userId, page })

    if (response.isError) {
        return <div className="text-center text-black-40">{t('common.error')}</div>
    }

    if (response.isSuccess && response.data.items.length === 0) {
        return <div className="text-center text-black-40">{t('common.empty_message.places')}</div>
    }

    if (response.isSuccess && response.data.items.length > 0) {
        return (
            <div className="flex flex-col gap-y-8">
                <div className="grid grid-cols-2 gap-4 last:mb-0 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
                    {response.data.items.map(place => {
                        const country = getCountryByCode(place.countryCode)

                        return (
                            <Link href={`/places/${place.id}`} key={place.id} className="text-black-100">
                                <div className="mb-2">
                                    <PlacePreviewCover {...place} size={192} />
                                </div>
                                <div className="line-clamp-3 break-words font-medium">{place.title}</div>
                                {country && <div className="text-small text-black-40">{country?.name[locale]}</div>}
                            </Link>
                        )
                    })}
                </div>

                {response.data.totalPages > page && (
                    <ShowMore isLoading={response.isFetching} onClick={() => setPage(prev => prev + 1)} />
                )}
            </div>
        )
    }

    return <UserPlacesSkeleton />
}
