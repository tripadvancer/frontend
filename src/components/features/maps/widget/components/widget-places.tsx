'use client'

import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { WidgetTabs as WidgetTabsEnum } from '@/utils/enums'

import { WidgetAllPlaces } from './widget-all-places'
import { WidgetSaved } from './widget-saved/widget-saved'
import { WidgetTabs } from './widget-tabs'

export const WidgetPlaces = ({ isAuth }: { isAuth: boolean }) => {
    const widgetState = useAppSelector(getWidgetState)

    return (
        <div className="flex flex-1 flex-col gap-y-6">
            {/* <WidgetTabs /> */}
            {widgetState.activeTab === WidgetTabsEnum.ALL && <WidgetAllPlaces />}
            {widgetState.activeTab === WidgetTabsEnum.SAVED && <WidgetSaved isAuth={isAuth} />}
        </div>
    )
}
