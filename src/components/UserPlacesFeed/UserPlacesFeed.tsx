import { PaginatedResponse } from '@/types/common'
import { IPlacePreview } from '@/types/place'

import { Paginator } from '@/components/Paginator'
import { getScopedI18n } from '@/utils/i18n.server'

import { UserPlace } from './UserPlace'

type UserPlacesFeedProps = {
    places: PaginatedResponse<IPlacePreview>
    currentPage: number
}

export const UserPlacesFeed = async ({ places, currentPage }: UserPlacesFeedProps) => {
    const t = await getScopedI18n('common.places')
    const totalPages = places.totalPages

    if (places.items.length === 0) {
        return <div className="text-center text-sm text-custom-black-40">{t('empty')}</div>
    }

    return (
        <>
            <div className="sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3 mb-8 grid grid-cols-2 gap-4 last:mb-0">
                {places.items.map((place, index) => (
                    <UserPlace key={index} {...place} />
                ))}
            </div>
            {totalPages > 1 && <Paginator pages={totalPages} currentPage={currentPage} />}
        </>
    )
}
