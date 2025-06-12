'use client'

import { MapFilters } from '@/components/features/dialogs/map-filters/map-filters'
import { useDialog } from '@/providers/dialog-provider'
import { useMapFilters } from '@/utils/hooks/use-map-filters'

export const WidgetFilters = () => {
    const dialog = useDialog()
    const [initialFilters] = useMapFilters()

    const activeCount =
        (initialFilters.categories.length > 0 ? 1 : 0) +
        (initialFilters.skipVisited ? 1 : 0) +
        (initialFilters.nearbyOnly ? 1 : 0) +
        (initialFilters.showOnlySaved ? 1 : 0)

    const handleClick = () => {
        dialog.open(<MapFilters />)
    }

    return (
        <div className="flex cursor-pointer items-center gap-x-2 text-caps" onClick={handleClick}>
            <span className="uppercase">Filters</span>
            {activeCount > 0 && <span className="text-small text-blue-100">{activeCount} selected</span>}
        </div>
    )
}
