import { PaginatedResponse } from '@/types/common'
import { IPlacePreview } from '@/types/place'

import { Paginator } from '@/components/Paginator'
import { getScopedI18n } from '@/utils/i18n.server'

import { Place } from './Place'

type PlacesFeedProps = {
    places: PaginatedResponse<IPlacePreview>
    currentPage: number
}

export const PlacesFeed = async ({ places, currentPage }: PlacesFeedProps) => {
    const t = await getScopedI18n('common.places')
    const totalPages = places.totalPages

    if (places.items.length === 0) {
        return <div className="text-center text-sm text-custom-black-40">{t('empty')}</div>
    }

    return (
        <>
            <div className="mb-8 grid grid-cols-3 gap-8 last:mb-0 phone:grid-cols-2 phone:gap-4">
                {places.items.map((place, index) => (
                    <Place key={index} {...place} />
                ))}
            </div>
            {totalPages > 1 && <Paginator pages={totalPages} currentPage={currentPage} />}
        </>
    )
}
