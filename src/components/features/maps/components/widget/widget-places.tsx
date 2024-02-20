import ScrollContainer from 'react-indiana-drag-scroll'

import type { IUserInfo } from '@/utils/types/user'

import { IconChevron } from '@/components/ui/icon-chevron'
import { getWidgetActiveTab, getWidgetIsPlacesOpened, toggleWidgetPlaces } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'

import { WidgetCategories } from './components/widget-categories'
import { WidgetFlipToggler } from './components/widget-flip-toggler'
import { WidgetHeader } from './components/widget-header'
import { WidgetPlacesAll } from './components/widget-places-all'
import { WidgetPlacesSaved } from './components/widget-places-saved'
import { WidgetSearch } from './components/widget-search'
import { WidgetTabs } from './components/widget-tabs'

type WidgetPlacesProps = {
    userInfo: IUserInfo | null
    onFlip: () => void
}

export const WidgetPlaces = ({ userInfo, onFlip }: WidgetPlacesProps) => {
    const dispatch = useAppDispatch()
    const activeTab = useAppSelector(getWidgetActiveTab)
    const isPlacesOpened = useAppSelector(getWidgetIsPlacesOpened)

    return (
        <ScrollContainer className="max-h-screen w-full sm:p-8">
            <div className="rounded-b-2xl bg-white shadow-small sm:rounded-2xl">
                <WidgetHeader userInfo={userInfo} />

                <div className="relative flex flex-col gap-y-8 rounded-2xl bg-blue-10 p-4 sm:p-8">
                    <WidgetFlipToggler variant="random" onClick={onFlip} />
                    <WidgetSearch />
                    <WidgetCategories />
                </div>

                <div className="flex flex-col gap-y-4 p-4 sm:p-8">
                    <div
                        className="flex cursor-pointer items-center justify-between"
                        onClick={() => dispatch(toggleWidgetPlaces())}
                    >
                        <div className="text-caps uppercase">Places</div>
                        <IconChevron position={isPlacesOpened ? 'down' : 'up'} />
                    </div>

                    {isPlacesOpened && (
                        <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
                            <WidgetTabs />
                            {activeTab === WidgetTabsEnum.ALL && <WidgetPlacesAll />}
                            {activeTab === WidgetTabsEnum.SAVED && <WidgetPlacesSaved />}
                        </div>
                    )}
                </div>
            </div>
        </ScrollContainer>
    )
}
