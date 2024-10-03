import { getUserById, getUserVisitedCountries } from '@/services/users'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { UserVisitedMap } from './components/user-visited-map'

export const UserProfilePublic = async ({ userId }: { userId: string }) => {
    const [user, visitedCountries] = await Promise.all([getUserById(userId), getUserVisitedCountries(userId)])

    return (
        <div className="flex flex-col gap-y-8">
            <UserVisitedMap visitedCountries={visitedCountries.visitedCountries} />
            <UserVisitedCountriesFeed visitedCountries={visitedCountries.visitedCountries} />
        </div>
    )
}
