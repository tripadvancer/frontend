import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { getUserById } from '@/services/users'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { UserVisitedMap } from './components/user-visited-map'

type UserProfileProps = {
    userId: string
    type: 'public' | 'private'
}

export const UserProfile = async ({ userId, type }: UserProfileProps) => {
    const t = await getTranslations()
    const user = await getUserById(userId)

    return (
        <div className="flex flex-col gap-y-8">
            {type === 'private' && (
                <p className="text-black-70">
                    {t.rich(
                        user.settings?.privacy.show_my_map
                            ? 'page.user.profile.visitedCountries.privacy.mapIsVisible'
                            : 'page.user.profile.visitedCountries.privacy.mapIsHidden',
                        {
                            settingsLink: settingsLink => (
                                <Link href={`/users/${user.id}/settings`}>{settingsLink}</Link>
                            ),
                        },
                    )}
                </p>
            )}

            <UserVisitedMap visitedCountries={user.visitedCountries} />
            <UserVisitedCountriesFeed countries={user.visitedCountries} />
        </div>
    )
}
