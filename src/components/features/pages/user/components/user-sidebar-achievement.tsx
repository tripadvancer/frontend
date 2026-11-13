'use client'

import Image from 'next/image'

import { usersAPI } from '@/utils/redux/services/users/users.api'
import { IUserStatistics } from '@/utils/types/user'

const Item = ({ label, value }: { label: string; value: number }) => {
    return (
        <li className="mb-2 flex items-center justify-between gap-x-1">
            <div className="whitespace-nowrap">{label}</div>
            <div
                className="grow border-b border-dotted"
                style={{
                    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
                    borderBottomWidth: '2px',
                    height: '5px',
                    marginTop: '4px',
                }}
            ></div>
            <div className="font-medium">{value}</div>
        </li>
    )
}

type UserSidebarAchievementProps = {
    username: string
    places: IUserStatistics['places']
    placeReviews: IUserStatistics['placeReviews']
    placePhotos: IUserStatistics['placePhotos']
    visitedPlaces: IUserStatistics['visitedPlaces']
    visitedCountries: IUserStatistics['visitedCountries']
}

export const UserSidebarAchievement = ({
    username,
    places,
    placeReviews,
    placePhotos,
    visitedPlaces,
    visitedCountries,
}: UserSidebarAchievementProps) => {
    const { data: user } = usersAPI.useGetUserByUsernameQuery(username)

    return (
        <div className="bg-orange-10 rounded-2xl p-8">
            <div className="mb-8 items-center bg-[url('/images/user-rank/laurel.svg')] bg-top bg-no-repeat pt-4 pr-4 pl-4 text-orange-100">
                <Image
                    src="/images/user-rank/user-rank-beginner.svg"
                    alt="begginer"
                    width={48}
                    height={48}
                    className="m-auto"
                />
                <div className="text-center font-medium wrap-break-word">Beginner</div>
            </div>
            <ul>
                <Item label="Added places" value={user?._count.places ?? places} />
                <Item label="Written reviews" value={user?._count.placeReviews ?? placeReviews} />
                <Item label="Added photos" value={user?._count.placePhotos ?? placePhotos} />
                <Item label="Visited places" value={user?._count.visitedPlaces ?? visitedPlaces} />
                <Item label="Visited countries" value={user?._count.visitedCountries ?? visitedCountries} />
            </ul>
        </div>
    )
}
