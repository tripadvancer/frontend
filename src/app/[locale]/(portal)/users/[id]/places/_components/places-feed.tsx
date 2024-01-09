import type { PaginatedResponse } from '@/utils/types/common'
import type { IPlacePreview } from '@/utils/types/place'

import { Paginator } from '@/components/ui/paginator'
import { getI18n } from '@/utils/i18n/i18n.server'

import { Place } from './place'

type PlacesFeedProps = {
    places: PaginatedResponse<IPlacePreview>
    currentPage: number
}

export const PlacesFeed = async ({ places, currentPage }: PlacesFeedProps) => {
    const t = await getI18n()
    const totalPages = places.totalPages

    if (places.items.length === 0) {
        return <div className="text-center  text-black-40">{t('common.empty_message.places')}</div>
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="grid grid-cols-2 gap-4 last:mb-0 sm:grid-cols-3 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
                {places.items.map((place, index) => (
                    <Place key={index} {...place} />
                ))}
            </div>
            {totalPages > 1 && <Paginator pages={totalPages} currentPage={currentPage} />}
        </div>
    )
}
