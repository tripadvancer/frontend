'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { ShowMore } from '@/components/ui/show-more'
import { usersAPI } from '@/redux/services/users.api'

import { UserPlacesItem } from './user-places-item'
import { UserPlacesSkeleton } from './user-places-skeleton'

export const UserPlaces = ({ userId }: { userId: number }) => {
    const t = useTranslations()
    const [page, setPage] = useState(1)

    const { data: places, isFetching, isSuccess, isError } = usersAPI.useGetPlacesByUserIdQuery({ userId, page })

    if (isError) {
        return <div className="mt-16 text-center text-black-40">{t('common.error')}</div>
    }

    if (isSuccess && places.items.length === 0) {
        return (
            <div className="mt-16 text-center text-black-40">
                {t.rich('page.user.profile.places.emptyMessage', { br: () => <br /> })}
            </div>
        )
    }

    if (isSuccess && places.items.length > 0) {
        return (
            <div className="flex flex-col gap-y-8">
                <div className="grid grid-cols-2 gap-4 last:mb-0 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
                    {places.items.map(place => (
                        <UserPlacesItem
                            key={`user-places-item-${place.id}`}
                            id={place.id}
                            title={place.title}
                            cover={place.cover}
                            countryCode={place.countryCode}
                            createdAt={place.createdAt}
                        />
                    ))}
                </div>

                {places.total > page && <ShowMore isLoading={isFetching} onClick={() => setPage(prev => prev + 1)} />}
            </div>
        )
    }

    return <UserPlacesSkeleton />
}
