'use client'

import { WidgetAllPlaces } from '@/components/features/maps/widget/widget/components/widget-all-places/widget-all-places'
import { WidgetAroundMe } from '@/components/features/maps/widget/widget/components/widget-around-me/widget-around-me'
import { WidgetSaved } from '@/components/features/maps/widget/widget/components/widget-saved/widget-saved'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { WidgetTabs as WidgetTabsEnum } from '@/utils/enums'

import { WidgetBaseTabs } from './components/widget-base-tabs'

export const WidgetBase = ({ isAuth }: { isAuth: boolean }) => {
    const widgetState = useAppSelector(getWidgetState)

    return (
        <div className="flex flex-1 flex-col gap-y-6">
            <WidgetBaseTabs />
            {widgetState.activeTab === WidgetTabsEnum.ALL && <WidgetAllPlaces />}
            {widgetState.activeTab === WidgetTabsEnum.AROUND_ME && <WidgetAroundMe />}
            {widgetState.activeTab === WidgetTabsEnum.SAVED && <WidgetSaved isAuth={isAuth} />}
        </div>
    )
}
