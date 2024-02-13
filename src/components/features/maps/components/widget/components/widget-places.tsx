'use client'

import { IconChevron } from '@/components/ui/icon-chevron'
import { getWidgetActiveTab, getWidgetPlacesVisibility, toggleWidgetPlacesVisibility } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'

import { WidgetPlacesAll } from './widget-places-all'
import { WidgetPlacesSaved } from './widget-places-saved'
import { WidgetTabs } from './widget-tabs'

export const WidgetPlaces = () => {
    const dispatch = useAppDispatch()
    const activeTab = useAppSelector(getWidgetActiveTab)
    const isPlacesVisible = useAppSelector(getWidgetPlacesVisibility)

    const toggleVisibility = () => {
        dispatch(toggleWidgetPlacesVisibility())
    }

    return (
        <div className="flex flex-col gap-y-4 p-4 sm:p-8">
            <div className="flex cursor-pointer items-center justify-between" onClick={toggleVisibility}>
                <div className="text-caps uppercase">Places</div>
                <IconChevron position={isPlacesVisible ? 'down' : 'up'} />
            </div>

            {isPlacesVisible && (
                <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
                    <WidgetTabs />
                    {activeTab === WidgetTabsEnum.ALL && <WidgetPlacesAll />}
                    {activeTab === WidgetTabsEnum.SAVED && <WidgetPlacesSaved />}
                </div>
            )}
        </div>
    )
}
