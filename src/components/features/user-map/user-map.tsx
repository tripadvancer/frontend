import { WorldMap } from '@/components/features/world-map/world-map'
import { getUserById } from '@/services/users'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

import { UserMapCountriesFeed } from './user-map-countries-feed'

export const UserMap = async ({ userId }: { userId: string }) => {
    const locale = getCurrentLocale()
    const user = await getUserById(userId)

    return (
        <div>
            <div className="relative mb-8 rounded-2xl bg-blue-10 fill-black-40 p-8">
                <WorldMap visited={user.visitedCountries.map(country => country.code)} />
                <div className="absolute bottom-2 left-2 rounded-2xl bg-orange-20 px-4 py-2 text-small-bold">
                    3% world coverage
                </div>
            </div>

            <UserMapCountriesFeed countries={user.visitedCountries} />
        </div>
    )
}
