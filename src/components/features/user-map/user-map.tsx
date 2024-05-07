import { WorldMap } from '@/components/features/world-map/world-map'
import { getUserById } from '@/services/users'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

import { UserNavigation } from '../user/user-navigation'
import { UserMapCountriesFeed } from './user-map-countries-feed'

export const UserMap = async ({ userId }: { userId: string }) => {
    const locale = getCurrentLocale()
    const user = await getUserById(userId)

    return (
        <div>
            <UserNavigation userId={userId} />
            <div className="flex flex-col gap-y-8">
                <WorldMap visited={user.visitedCountries.map(country => country.code)} />
                <UserMapCountriesFeed countries={user.visitedCountries} />
            </div>
        </div>
    )
}
