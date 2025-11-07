'use client'

import { useTransition } from 'react'

import { useTranslations } from 'next-intl'

import { MapFilters } from '@/components/features/dialogs/map-filters/map-filters'
import { useDialog } from '@/providers/dialog-provider'
import { useMapState } from '@/utils/map/use-map-state'

export const WidgetFilters = () => {
    const t = useTranslations()
    const dialog = useDialog()

    const [mapState] = useMapState()

    const activeCount =
        (mapState.filters.categories.length > 0 ? 1 : 0) +
        (mapState.filters.skipVisited ? 1 : 0) +
        (mapState.filters.nearbyOnly ? 1 : 0) +
        (mapState.filters.showOnlySaved ? 1 : 0)

    const handleClick = () => {
        dialog.open(<MapFilters />)
    }

    return (
        <div className="flex cursor-pointer items-center gap-x-2 text-caps" onClick={handleClick}>
            <span className="uppercase">{t('map.widget.filters.title')}</span>
            {activeCount > 0 && (
                <span className="text-small text-blue-100">
                    {t('map.widget.filters.selected', { count: activeCount })}
                </span>
            )}
        </div>
    )
}
