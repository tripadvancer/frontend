import { getUserVisitedCountries } from '@/services/users'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { UserVisitedMap } from './components/user-visited-map'

export const UserProfilePublic = async ({ userId }: { userId: string }) => {
    const visitedCountries = await getUserVisitedCountries(userId)

    return (
        <div className="flex flex-col gap-y-8">
            <UserVisitedMap visitedCountries={visitedCountries} />
            <UserVisitedCountriesFeed visitedCountries={visitedCountries} />
        </div>
    )
}
