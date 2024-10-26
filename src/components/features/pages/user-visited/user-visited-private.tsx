import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import type { IUser } from '@/utils/types/user'

import { ExternalLink } from '@/components/ui/external-link'
import { AlertIcon24 } from '@/components/ui/icons'
import { Notice } from '@/components/ui/notice'
import { getUserSettings } from '@/services/user'
import { getUserVisitedCountries } from '@/services/users'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { UserVisitedMap } from './components/user-visited-map'

export const UserVisitedPrivate = async ({ user }: { user: IUser }) => {
    const t = await getTranslations()
    const [settings, visitedCountries] = await Promise.all([getUserSettings(), getUserVisitedCountries(user.id)])

    return (
        <div className="flex flex-col gap-y-8">
            <Notice
                message={t.rich(
                    settings.privacy?.show_my_map
                        ? 'page.user.profile.visitedCountries.privacy.mapIsVisible'
                        : 'page.user.profile.visitedCountries.privacy.mapIsHidden',
                    {
                        settingsLink: settingsLink => <Link href={`/users/${user.name}/settings`}>{settingsLink}</Link>,
                    },
                )}
                icon={<AlertIcon24 />}
                variant="red"
            />

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
