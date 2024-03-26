'use client'

import { ChevronBottomIcon16, ChevronTopIcon16 } from '@/components/ui/icons'
import { getWidgetState, toggleWidgetPlacesOpened } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetPlacesAll } from './widget-places-all'
import { WidgetPlacesRandom } from './widget-places-random'
import { WidgetPlacesSaved } from './widget-places-saved'
import { WidgetPlacesTabs } from './widget-places-tabs'

export const WidgetPlaces = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    return (
        <div className="flex flex-col gap-y-4">
            <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => dispatch(toggleWidgetPlacesOpened())}
            >
                <div className="text-caps uppercase">{t('widget.places.title')}</div>
                <div className="flex items-center justify-center gap-2">
                    {widgetState.isPlacesOpened ? <ChevronTopIcon16 /> : <ChevronBottomIcon16 />}
                </div>
            </div>

            {widgetState.isPlacesOpened && (
                <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
                    <WidgetPlacesTabs />
                    {widgetState.activeTab === WidgetTabsEnum.ALL && <WidgetPlacesAll />}
                    {widgetState.activeTab === WidgetTabsEnum.SAVED && <WidgetPlacesSaved />}
                    {widgetState.activeTab === WidgetTabsEnum.RANDOM && <WidgetPlacesRandom />}
                </div>
            )}
        </div>
    )
}
