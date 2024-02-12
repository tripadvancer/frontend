import { IUserStatistics } from '@/utils/types/user'

import { Achievement } from '@/components/ui/achievement'
import { getI18n } from '@/utils/i18n/i18n.server'

export const UserAchievement = async ({ places, placePhotos, placeReviews, visitedPlaces }: IUserStatistics) => {
    const t = await getI18n()

    return (
        <Achievement
            title={t('user_achievement.level_1')}
            icon={
                // prettier-ignore
                <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M26 38V35.8582C29.967 35.2908 33.3975 33.0603 35.5627 29.8957C40.9908 29.1477 44 24.4457 44 18V12C44 9.79086 42.2091 8 40 8H37.4649C36.7733 6.8044 35.4806 6 34 6H14C12.5194 6 11.2267 6.8044 10.5351 8H8C5.79086 8 4 9.79086 4 12V18C4 24.4457 7.00917 29.1477 12.4373 29.8957C14.6025 33.0603 18.033 35.2908 22 35.8582V38H20C17.7909 38 16 39.7909 16 42H32C32 39.7909 30.2091 38 28 38H26ZM8 12H10V22C10 22.9155 10.0879 23.8105 10.2557 24.677C8.78055 23.3493 8 21.0625 8 18V12ZM38 12V22C38 22.9155 37.9121 23.8105 37.7443 24.677C39.2194 23.3493 40 21.0625 40 18V12H38ZM14 22V10H34V22C34 27.5228 29.5228 32 24 32C18.4772 32 14 27.5228 14 22Z" />
                </svg>
            }
        >
            <Achievement.Items>
                <Achievement.Item label={t('user_achievement.statistic.added_places')} value={places} />
                <Achievement.Item label={t('user_achievement.statistic.added_photos')} value={placePhotos} />
                <Achievement.Item label={t('user_achievement.statistic.added_reviews')} value={placeReviews} />
                <Achievement.Item label={t('user_achievement.statistic.visited_places')} value={visitedPlaces} />
                <Achievement.Item label={t('user_achievement.statistic.visited_countries')} value={visitedPlaces} />
            </Achievement.Items>
        </Achievement>
    )
}
