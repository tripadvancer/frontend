import { notFound } from 'next/navigation'

import type { IUser } from '@/utils/types/user'

import { getUserVisitedCountries } from '@/services/users'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { UserVisitedMap } from './components/user-visited-map'

export const UserVisitedPublic = async ({ user }: { user: IUser }) => {
    const visitedCountries = await getUserVisitedCountries(user.id)

    if (!user.publicSettings.show_my_map) {
        return notFound()
    }

    return (
        <div className="flex flex-col gap-y-8">
            <UserVisitedMap visitedCountries={visitedCountries} />
            <UserVisitedCountriesFeed visitedCountries={visitedCountries} />
        </div>
    )
}
