import { getUserVisitedCountries } from '@/services/users'
import { IUser } from '@/utils/types/user'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { UserVisitedMap } from './components/user-visited-map'

export const UserVisitedPublic = async ({ user }: { user: IUser }) => {
    const visitedCountries = await getUserVisitedCountries(user.id)

    return (
        <div className="flex flex-col gap-y-8">
            <UserVisitedMap visitedCountries={visitedCountries} />
            <UserVisitedCountriesFeed visitedCountries={visitedCountries} />
        </div>
    )
}
