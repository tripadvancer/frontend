import { getTranslations } from 'next-intl/server'

import type { IUserStatistics } from '@/utils/types/user'

import { UserRankBeginnerIcon48 } from '@/components/ui/icons'

const Item = ({ label, value }: { label: string; value: number }) => {
    return (
        <li className="mb-2 flex justify-between gap-x-1">
            <div className="whitespace-nowrap">{label}</div>
            <div className="overflow-hidden">
                ...........................................................................................................................................................................................................
            </div>
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
            <div className="mb-8 items-center bg-[url('/images/laurel.svg')] bg-top bg-no-repeat pl-4 pr-4 pt-4 text-orange-100">
                <div className="flex-center">
                    <UserRankBeginnerIcon48 />
                </div>
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
