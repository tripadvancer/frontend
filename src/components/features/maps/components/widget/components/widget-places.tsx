import { useEffect, useState } from 'react'
import { GeoJSONSource, useMap } from 'react-map-gl'

import classNames from 'classnames'

import { FormSwitcher } from '@/components/ui/form-switcher'
import { IconChevron } from '@/components/ui/icon-chevron'
import {
    getMapBounds,
    getMapDataSource,
    getShowOnlySavedPlaces,
    getWidgetActiveList,
    getWidgetActiveTab,
    getWidgetPlacesVisibility,
    getWidgetSelectedCategories,
    toggleShowOnlySavedPlaces,
    toggleWidgetPlacesVisibility,
} from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { favoritesAPI } from '@/redux/services/favorites-api'
import { placesAPI } from '@/redux/services/places-api'
import { visitedAPI } from '@/redux/services/visited-api'
import { MapDataSourcesEnum, WidgetTabsEnum } from '@/utils/enums'

import { WidgetPlacesAll } from './widget-places-all'
import { WidgetPlacesSaved } from './widget-places-saved'
import { WidgetTabs } from './widget-tabs'

export const WidgetPlaces = () => {
    const map = useMap()
    const dispatch = useAppDispatch()
    const activeTab = useAppSelector(getWidgetActiveTab)
    const showOnlySavedPlaces = useAppSelector(getShowOnlySavedPlaces)
    const isPlacesVisible = useAppSelector(getWidgetPlacesVisibility)
    const mapBounds = useAppSelector(getMapBounds)
    const selectedCategories = useAppSelector(getWidgetSelectedCategories)
    const mapDataSource = useAppSelector(getMapDataSource)

    const placesResponse = placesAPI.useGetPlacesQuery({ mapBounds, selectedCategories })
    const favoritesResponse = favoritesAPI.useGetFavoritesQuery()
    const visitedResponse = visitedAPI.useGetVisitedQuery()

    if (map.mainMap) {
        const source = map.mainMap.getSource('places-source') as GeoJSONSource

        if (mapDataSource === MapDataSourcesEnum.ALL_PLACES) {
            if (source && placesResponse.isSuccess) {
                source.setData(placesResponse.data)
            }
        }

        if (mapDataSource === MapDataSourcesEnum.FAVORITES_PLACES) {
            if (source && favoritesResponse.isSuccess) {
                source.setData(favoritesResponse.data)
            }
        }

        if (mapDataSource === MapDataSourcesEnum.VISITED_PLACES) {
            if (source && visitedResponse.isSuccess) {
                source.setData(visitedResponse.data)
            }
        }
    }

    return (
        <div
            className={classNames('flex flex-col gap-y-4 bg-white p-4 sm:rounded-b-2xl sm:p-8', {
                'hidden sm:flex': !isPlacesVisible,
            })}
        >
            {/* Use in the desktop version */}
            <div
                className="hidden cursor-pointer items-center justify-between sm:flex"
                onClick={() => {
                    dispatch(toggleWidgetPlacesVisibility())
                }}
            >
                <div className="text-caps uppercase">Places</div>
                <IconChevron position={isPlacesVisible ? 'down' : 'up'} />
            </div>

            {/* Use in the mobile version */}
            <div className="flex items-center justify-between sm:hidden">
                <div className="text-caps uppercase">Places</div>
            </div>

            <div className={classNames('flex flex-1 flex-col gap-y-4 sm:gap-y-8', { hidden: !isPlacesVisible })}>
                <div className="flex items-center justify-between">
                    <WidgetTabs />
                    {activeTab !== WidgetTabsEnum.ALL && (
                        <div className="flex items-center gap-x-2">
                            Show only saved places
                            <FormSwitcher
                                checked={showOnlySavedPlaces}
                                onChange={() => dispatch(toggleShowOnlySavedPlaces())}
                            />
                        </div>
                    )}
                </div>

                {activeTab === WidgetTabsEnum.ALL && <WidgetPlacesAll />}
                {activeTab === WidgetTabsEnum.SAVED && <WidgetPlacesSaved />}
            </div>
        </div>
    )
}
