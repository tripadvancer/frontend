'use client'

import ScrollContainer from 'react-indiana-drag-scroll'

import type { IUserInfo } from '@/utils/types/user'

import { getWidgetActiveTab, getWidgetIsPlacesOpened, toggleWidgetPlaces } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetCategories } from './components/widget-categories'
import { WidgetFlipToggler } from './components/widget-flip-toggler'
import { WidgetHeader } from './components/widget-header'
import { WidgetPlacesAll } from './components/widget-places-all'
import { WidgetPlacesSaved } from './components/widget-places-saved'
import { WidgetSearch } from './components/widget-search'
import { WidgetSection } from './components/widget-section'
import { WidgetTabs } from './components/widget-tabs'

type WidgetPlacesProps = {
    userInfo: IUserInfo | null
    onFlip: () => void
}

export const WidgetPlaces = ({ userInfo, onFlip }: WidgetPlacesProps) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const activeTab = useAppSelector(getWidgetActiveTab)
    const isPlacesOpened = useAppSelector(getWidgetIsPlacesOpened)

    return (
        <ScrollContainer className="max-h-screen w-full sm:p-8">
            <div className="rounded-b-2xl bg-white shadow-small sm:rounded-2xl">
                <WidgetHeader userInfo={userInfo} />

                <div className="relative flex flex-col gap-y-8 rounded-2xl bg-blue-10 p-4 sm:p-8">
                    <WidgetFlipToggler variant="orange" onClick={onFlip} />
                    <WidgetSearch />
                    <WidgetCategories variant="blue" />
                </div>

                <div className="p-4 sm:p-8">
                    <WidgetSection
                        title={t('widget.places.title')}
                        isExpanded={isPlacesOpened}
                        onToggle={() => dispatch(toggleWidgetPlaces())}
                    >
                        <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
                            <WidgetTabs />
                            {activeTab === WidgetTabsEnum.ALL && <WidgetPlacesAll />}
                            {activeTab === WidgetTabsEnum.SAVED && <WidgetPlacesSaved />}
                        </div>
                    </WidgetSection>
                </div>
            </div>
        </ScrollContainer>
    )
}
