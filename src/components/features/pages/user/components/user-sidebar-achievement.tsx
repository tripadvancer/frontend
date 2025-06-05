import { getTranslations } from 'next-intl/server'

import Image from 'next/image'

import { IUserStatistics } from '@/utils/types/user'

const Item = ({ label, value }: { label: string; value: number }) => {
    return (
        <li className="mb-2 flex items-center justify-between gap-x-1">
            <div className="whitespace-nowrap">{label}</div>
            <div
                className="grow border-b border-dotted"
                style={{
                    borderBottomColor: 'rgba(0, 0, 0, 0.4)',
                    borderBottomWidth: '2px',
                    height: '5px',
                    marginTop: '4px',
                }}
            ></div>
            <div className="font-medium">{value}</div>
        </li>
    )
}

type UserSidebarAchievementProps = {
    places: IUserStatistics['places']
    placeReviews: IUserStatistics['placeReviews']
    placePhotos: IUserStatistics['placePhotos']
    visitedPlaces: IUserStatistics['visitedPlaces']
    visitedCountries: IUserStatistics['visitedCountries']
}

export const UserSidebarAchievement = async ({
    places,
    placeReviews,
    placePhotos,
    visitedPlaces,
    visitedCountries,
}: UserSidebarAchievementProps) => {
    const t = await getTranslations()

    return (
        <div className="rounded-2xl bg-orange-10 p-8">
            <div className="mb-8 items-center bg-[url('/images/user-rank/laurel.svg')] bg-top bg-no-repeat pl-4 pr-4 pt-4 text-orange-100">
                <Image
                    src="/images/user-rank/user-rank-beginner.svg"
                    alt="begginer"
                    width={48}
                    height={48}
                    className="m-auto"
                />
                <div className="break-words text-center font-medium">
                    {t('component.userAchievement.level.beginner')}
                </div>
            </div>
            <ul>
                <Item label={t('component.userAchievement.statistic.addedPlaces')} value={places} />
                <Item label={t('component.userAchievement.statistic.addedReviews')} value={placeReviews} />
                <Item label={t('component.userAchievement.statistic.addedPhotos')} value={placePhotos} />
                <Item label={t('component.userAchievement.statistic.visitedPlaces')} value={visitedPlaces} />
                <Item label={t('component.userAchievement.statistic.visitedCountries')} value={visitedCountries} />
            </ul>
        </div>
    )
}
