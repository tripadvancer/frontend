import { getTranslations } from 'next-intl/server'

import { UserRankBeginnerIcon48 } from '@/components/ui/icons'
import { getUserById } from '@/services/users'

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

export const UserSidebarAchievement = async ({ userId }: { userId: string }) => {
    const t = await getTranslations()
    const user = await getUserById(userId)

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
                <Item label={t('component.userAchievement.statistic.addedPlaces')} value={user._count.places} />
                <Item label={t('component.userAchievement.statistic.addedReviews')} value={user._count.placeReviews} />
                <Item label={t('component.userAchievement.statistic.addedPhotos')} value={user._count.placePhotos} />
                <Item
                    label={t('component.userAchievement.statistic.visitedPlaces')}
                    value={user._count.visitedPlaces}
                />
                <Item
                    label={t('component.userAchievement.statistic.visitedCountries')}
                    value={user._count.visitedCountries}
                />
            </ul>
        </div>
    )
}
