import type { IUser } from '@/utils/types/user'

import { getUserVisitedCountries } from '@/services/users'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { UserVisitedMap } from './components/user-visited-map'

export const UserProfilePublic = async ({ user }: { user: IUser }) => {
    const visitedCountries = await getUserVisitedCountries(user.id)

    return (
        <div className="flex flex-col gap-y-8">
            <UserVisitedMap visitedCountries={visitedCountries} />
            <UserVisitedCountriesFeed visitedCountries={visitedCountries} />
        </div>
    )
}
