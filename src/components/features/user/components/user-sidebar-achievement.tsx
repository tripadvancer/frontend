import { UserRankBeginnerIcon48 } from '@/components/ui/icons'
import { getUserById } from '@/services/users'
import { getI18n } from '@/utils/i18n/i18n.server'

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
    const t = await getI18n()
    const user = await getUserById(userId)

    return (
        <div className="rounded-2xl bg-orange-10 p-8">
            <div className="mb-8 items-center bg-[url('/images/laurel.svg')] bg-top bg-no-repeat pl-4 pr-4 pt-4 text-orange-100">
                <div className="flex-center">
                    <UserRankBeginnerIcon48 />
                </div>
                <div className="break-words text-center font-medium">{t('user_achievement.level_1')}</div>
            </div>
            <ul>
                <Item label={t('user_achievement.statistic.added_places')} value={user._count.places} />
                <Item label={t('user_achievement.statistic.added_reviews')} value={user._count.placeReviews} />
                <Item label={t('user_achievement.statistic.added_photos')} value={user._count.placePhotos} />
                <Item label={t('user_achievement.statistic.visited_places')} value={user._count.visitedPlaces} />
                <Item label={t('user_achievement.statistic.visited_countries')} value={user._count.visitedCountries} />
            </ul>
        </div>
    )
}
