'use client'

import { useCallback, useState } from 'react'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { mapStateSchema } from '@/utils/helpers/map-state-utils'
import { useMapState } from '@/utils/hooks/use-map-state'

import { MapFiltersCategories } from './components/map-filters-categories'
import { MapFiltersSwitcherNearbyOnly } from './components/map-filters-switcher-hide-nearby-only'
import { MapFiltersSwitcherHideVisited } from './components/map-filters-switcher-hide-visited'
import { MapFiltersSwitcherShowOnlySaved } from './components/map-filters-switcher-show-only-saved'

export const MapFilters = () => {
    const dialog = useDialog()
    const [mapState, setMapState] = useMapState()
    const [filters, setFilters] = useState(mapState.filters)

    const handleApplyFilters = useCallback(() => {
        const defaults = mapStateSchema.getDefault().filters
        const isDefault = JSON.stringify(filters) === JSON.stringify(defaults)

        setMapState({ ...mapState, filters }, { cleanUrl: isDefault })
        dialog.close()
    }, [filters, mapState, setMapState, dialog])

    const handleResetFilters = useCallback(() => {
        const defaults = mapStateSchema.getDefault().filters
        setFilters(defaults)
    }, [])

    return (
        <div className="space-y-4 sm:w-104">
            <h1 className="h7">Filters</h1>
            <hr className="border-black-70" />

            <div className="space-y-8">
                <div className="space-y-4">
                    <MapFiltersCategories
                        selectedCategoriesIds={filters.categories.filter((v): v is number => v !== undefined)}
                        onClick={newCats => setFilters(prev => ({ ...prev, categories: newCats }))}
                    />
                    <hr />

                    <MapFiltersSwitcherNearbyOnly
                        checked={filters.nearbyOnly}
                        onChange={() => setFilters(prev => ({ ...prev, nearbyOnly: !prev.nearbyOnly }))}
                    />
                    <hr />

                    <MapFiltersSwitcherHideVisited
                        checked={filters.skipVisited}
                        onChange={() => setFilters(prev => ({ ...prev, skipVisited: !prev.skipVisited }))}
                    />
                    <hr />

                    <MapFiltersSwitcherShowOnlySaved
                        checked={filters.showOnlySaved}
                        onChange={() => setFilters(prev => ({ ...prev, showOnlySaved: !prev.showOnlySaved }))}
                    />
                    <hr />
                </div>

                <div className="space-x-2">
                    <FormButton onClick={handleApplyFilters}>Apply</FormButton>
                    <FormButton type="stroke" onClick={handleResetFilters}>
                        Reset
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
