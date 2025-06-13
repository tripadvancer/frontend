'use client'

import { useCallback, useState } from 'react'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { MapFiltersState } from '@/utils/helpers/map-filters'
import { useMapFilters } from '@/utils/hooks/use-map-filters'

import { MapFiltersCategories } from './components/map-filters-categories'
import { MapFiltersCountries } from './components/map-filters-countries'
import { MapFiltersSwitcherNearbyOnly } from './components/map-filters-switcher-hide-nearby-only'
import { MapFiltersSwitcherHideVisited } from './components/map-filters-switcher-hide-visited'
import { MapFiltersSwitcherShowOnlySaved } from './components/map-filters-switcher-show-only-saved'
import { MapFiltersUsers } from './components/map-filters-users'

export const MapFilters = () => {
    const dialog = useDialog()

    const [initialFilters, setFiltersToUrl] = useMapFilters()
    const [filters, setFilters] = useState<MapFiltersState>(initialFilters)

    const handleApplyFilters = useCallback(() => {
        setFiltersToUrl(filters)
        dialog.close()
    }, [filters, setFiltersToUrl, dialog])

    const handleResetFilters = useCallback(() => {
        setFilters({
            categories: [],
            skipVisited: false,
            nearbyOnly: false,
            radius: 0,
            showOnlySaved: false,
        })
    }, [setFilters])

    return (
        <div className="space-y-4 sm:w-104">
            <h1 className="h7">Filters</h1>
            <hr className="border-black-70" />

            <div className="space-y-8">
                <div className="space-y-4">
                    <MapFiltersCountries />
                    <MapFiltersUsers />

                    <MapFiltersCategories
                        selectedCategoriesIds={filters.categories}
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
