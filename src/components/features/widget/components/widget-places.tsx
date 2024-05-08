'use client'

import { isMobile } from 'react-device-detect'

import { ChevronBottomIcon16, ChevronTopIcon16 } from '@/components/ui/icons'
import { getWidgetState, toggleWidgetPlacesOpened } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetAllPlaces } from './widget-all-places'
import { WidgetRandom } from './widget-random/widget-random'
import { WidgetSaved } from './widget-saved/widget-saved'
import { WidgetTabs } from './widget-tabs'
import { WidgetVisitedPlaces } from './widget-visited-places'

export const WidgetPlaces = ({ isAuth }: { isAuth: boolean }) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    return (
        <div className="flex flex-col gap-y-4">
            <div
                className="flex items-center justify-between sm:cursor-pointer"
                onClick={isMobile ? undefined : () => dispatch(toggleWidgetPlacesOpened())}
            >
                <div className="text-caps uppercase">{t('widget.places.title')}</div>
                <div className="hidden items-center justify-center gap-2 sm:flex">
                    {widgetState.isPlacesOpened ? <ChevronTopIcon16 /> : <ChevronBottomIcon16 />}
                </div>
            </div>

            {widgetState.isPlacesOpened && (
                <div className="flex flex-1 flex-col gap-y-6 sm:gap-y-8">
                    <WidgetTabs />
                    {widgetState.activeTab === WidgetTabsEnum.ALL && <WidgetAllPlaces />}
                    {widgetState.activeTab === WidgetTabsEnum.SAVED && <WidgetSaved isAuth={isAuth} />}
                    {widgetState.activeTab === WidgetTabsEnum.VISITED && <WidgetVisitedPlaces isAuth={isAuth} />}
                    {widgetState.activeTab === WidgetTabsEnum.RANDOM && <WidgetRandom />}
                </div>
            )}
        </div>
    )
}
