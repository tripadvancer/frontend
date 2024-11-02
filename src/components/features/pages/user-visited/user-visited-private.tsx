import { getTranslations } from 'next-intl/server'

import { ExternalLink } from '@/components/ui/external-link'
import { getUserSettings } from '@/services/user'
import { getUserVisitedCountries } from '@/services/users'
import { IUser } from '@/utils/types/user'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { UserVisitedMap } from './components/user-visited-map'
import { UserVisitedSwitcherVisible } from './user-visited-switcher-visible'

export const UserVisitedPrivate = async ({ user }: { user: IUser }) => {
    const t = await getTranslations()
    const [settings, visitedCountries] = await Promise.all([getUserSettings(), getUserVisitedCountries(user.id)])

    return (
        <div className="flex flex-col gap-y-8">
            <UserVisitedSwitcherVisible showMyMap={settings.privacy?.show_my_map} />
            <UserVisitedMap visitedCountries={visitedCountries} />

            {!visitedCountries.length && (
                <div className="text-center text-black-40">
                    {t.rich('page.user.profile.visitedCountries.emptyMessage', {
                        br: () => <br />,
                        learnMoreLink: learnMoreLink => (
                            <ExternalLink href="https://help.tripadvancer.com/profile/user-map">
                                {learnMoreLink}
                            </ExternalLink>
                        ),
                    })}
                </div>
            )}

            <UserVisitedCountriesFeed visitedCountries={visitedCountries} />
        </div>
    )
}
