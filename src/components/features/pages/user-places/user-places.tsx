'use client'

import { useState } from 'react'

import { PlacesGrid } from '@/components/features/common/places-grid/places-grid'
import { ShowMore } from '@/components/ui/show-more'
import { usersAPI } from '@/utils/redux/services/users/users.api'

import { UserPlacesSkeleton } from './user-places-skeleton'

export const UserPlaces = ({ userId }: { userId: number }) => {
    const [page, setPage] = useState(1)

    const { data, isFetching, isSuccess, isError } = usersAPI.useGetPlacesByUserIdQuery({ userId, page })

    if (isError) {
        return (
            <div className="mt-16 text-center text-black-40">
                {'An unexpected error has occurred. Please try again later.'}
            </div>
        )
    }

    if (isSuccess && data.items.length === 0) {
        return (
            <div className="mt-16 text-center text-black-40">
                {
                    <>
                        Nothing has been added here yet.
                        <br />
                        Places will show up as they’re added.
                    </>
                }
            </div>
        )
    }

    if (isSuccess && data.items.length > 0) {
        return (
            <div className="flex flex-col gap-y-8">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
                    <PlacesGrid
                        places={data.items.map(item => ({
                            id: item.id,
                            title: item.title,
                            cover: item.cover,
                            meta: {
                                countryCode: item.countryCode,
                                createdAt: new Date(item.createdAt),
                            },
                        }))}
                    />
                </div>

                {data.total > page && <ShowMore isLoading={isFetching} onClick={() => setPage(prev => prev + 1)} />}
            </div>
        )
    }

    return <UserPlacesSkeleton />
}
