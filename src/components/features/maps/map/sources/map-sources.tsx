'use client'

import { WidgetModes, WidgetTabs } from '@/utils/enums'
import { getIsFilterMapBySavedLists } from '@/utils/redux/features/map-slice'
import { getWidgetActiveList, getWidgetActiveTab, getWidgetMode } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'

import { MapSourceDefault } from './map-source-default'
import { MapSourceRandom } from './map-source-random'
import { MapSourceSavedPlaces } from './map-source-saved-places'

export const MapSources = ({ isAuth }: { isAuth: boolean }) => {
    const widgetMode = useAppSelector(getWidgetMode)
    const widgetActiveTab = useAppSelector(getWidgetActiveTab)
    const activeList = useAppSelector(getWidgetActiveList)
    const isFilterMapBySavedList = useAppSelector(getIsFilterMapBySavedLists)

    if (
        isAuth &&
        widgetMode === WidgetModes.PLACES &&
        widgetActiveTab == WidgetTabs.SAVED &&
        activeList &&
        isFilterMapBySavedList
    ) {
        return <MapSourceSavedPlaces listId={activeList.id} />
    }

    if (widgetMode === WidgetModes.RANDOM) {
        return <MapSourceRandom />
    }

    return <MapSourceDefault />
}
