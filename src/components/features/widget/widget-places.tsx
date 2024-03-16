'use client'

import ScrollContainer from 'react-indiana-drag-scroll'

import { getWidgetState, toggleWidgetPlacesOpened } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetFlipToggler } from './components/widget-flip-toggler'
import { WidgetHeader } from './components/widget-header'
import { WidgetPlacesAll } from './components/widget-places-all'
import { WidgetPlacesCategories } from './components/widget-places-categories'
import { WidgetPlacesSaved } from './components/widget-places-saved'
import { WidgetPLacesTabs } from './components/widget-places-tabs'
import { WidgetSearch } from './components/widget-search'
import { WidgetSection } from './components/widget-section'

type WidgetPlacesProps = {
    onFlip: () => void
}

export const WidgetPlaces = ({ onFlip }: WidgetPlacesProps) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    return (
        <ScrollContainer className="pointer-events-auto max-h-full w-full cursor-auto pb-8 sm:p-8">
            <div className="rounded-b-2xl bg-white shadow-large sm:rounded-2xl">
                <WidgetHeader />

                <div className="relative flex flex-col gap-y-4 rounded-2xl bg-blue-10 p-4 sm:gap-y-8 sm:p-8">
                    <WidgetFlipToggler variant="orange" onClick={onFlip} />
                    <WidgetSearch />
                    <WidgetPlacesCategories />
                </div>

                <div className="p-4 sm:p-8">
                    <WidgetSection
                        title={t('widget.places.title')}
                        variant="blue"
                        isOpened={widgetState.places.isOpened}
                        onToggle={() => dispatch(toggleWidgetPlacesOpened())}
                    >
                        <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
                            <WidgetPLacesTabs />
                            {widgetState.places.activeTab === WidgetTabsEnum.ALL && <WidgetPlacesAll />}
                            {widgetState.places.activeTab === WidgetTabsEnum.SAVED && <WidgetPlacesSaved />}
                        </div>
                    </WidgetSection>
                </div>
            </div>
        </ScrollContainer>
    )
}
