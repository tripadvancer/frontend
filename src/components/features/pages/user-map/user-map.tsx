import { useTranslations } from 'next-intl'

import { UserVisitedCountriesFeed } from './components/user-visited-countries-feed'
import { WorldMap } from './components/world-map'

export const UserMap = ({ userId }: { userId: number }) => {
    const t = useTranslations()

    return (
        <div className="flex flex-col gap-y-8">
            <WorldMap visited={['RU']} />
            <p className="text-black-70">
                {t.rich('page.user.userMap.privacy.mapIsHidden', {
                    settingsLink: settingsLink => <a href={`/users/${userId}/settings`}>{settingsLink}</a>,
                })}
            </p>
            <UserVisitedCountriesFeed
                countries={[
                    {
                        code: 'RU',
                        count: 10,
                    },
                ]}
            />
        </div>
    )
}
