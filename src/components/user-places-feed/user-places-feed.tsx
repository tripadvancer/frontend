import type { PaginatedResponse } from '@/utils/types/common'
import type { IPlacePreview } from '@/utils/types/place'

import { Paginator } from '@/components/paginator'
import { UserPlace } from '@/components/user-place/user-place'
import { getScopedI18n } from '@/utils/i18n/i18n.server'

type UserPlacesFeedProps = {
    places: PaginatedResponse<IPlacePreview>
    currentPage: number
}

export const UserPlacesFeed = async ({ places, currentPage }: UserPlacesFeedProps) => {
    const t = await getScopedI18n('common.places')
    const totalPages = places.totalPages

    if (places.items.length === 0) {
        return <div className="text-center  text-black-40">{t('empty')}</div>
    }

    return (
        <>
            <div className="mb-8 grid grid-cols-2 gap-4 last:mb-0 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
                {places.items.map((place, index) => (
                    <UserPlace key={index} {...place} />
                ))}
            </div>
            {totalPages > 1 && <Paginator pages={totalPages} currentPage={currentPage} />}
        </>
    )
}
