import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import { ExternalLink } from '@/components/ui/external-link'
import { getUserSettings } from '@/services/user'
import { getUserById, getUserVisitedCountries } from '@/services/users'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { UserVisitedMap } from './components/user-visited-map'

export const UserProfilePrivate = async ({ userId }: { userId: string }) => {
    const t = await getTranslations()
    const [user, settings, visitedCountries] = await Promise.all([
        getUserById(userId),
        getUserSettings(),
        getUserVisitedCountries(userId),
    ])

    return (
        <div className="flex flex-col gap-y-8">
            <p className="text-black-70">
                {t.rich(
                    settings.settings?.privacy.show_my_map
                        ? 'page.user.profile.visitedCountries.privacy.mapIsVisible'
                        : 'page.user.profile.visitedCountries.privacy.mapIsHidden',
                    {
                        settingsLink: settingsLink => <Link href={`/users/${user.id}/settings`}>{settingsLink}</Link>,
                    },
                )}
            </p>

            <UserVisitedMap visited={visitedCountries.visitedCountries.map(item => item.code)} />

            {!visitedCountries.visitedCountries?.length && (
                <div className="text-center text-black-40">
                    {t.rich('page.user.profile.visitedCountries.emptyMessage', {
                        br: () => <br />,
                        learnMoreLink: learnMoreLink => (
                            <ExternalLink href="https://help.tripadvancer.com/">{learnMoreLink}</ExternalLink>
                        ),
                    })}
                </div>
            )}

            <UserVisitedCountriesFeed visitedCountries={visitedCountries.visitedCountries} />
        </div>
    )
}
