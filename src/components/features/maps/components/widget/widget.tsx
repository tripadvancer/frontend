import ScrollContainer from 'react-indiana-drag-scroll'

import classNames from 'classnames'

import { getWidgetPlacesVisibility } from '@/redux/features/map-slice'
import { useAppSelector } from '@/redux/hooks'

import { WidgetCategories } from './components/widget-categories'
import { WidgetHeader } from './components/widget-header'
import { WidgetPlaces } from './components/widget-places'
import { WidgetViewToggle } from './components/widget-view-toggle'

export const Widget = () => {
    const isPlacesVisible = useAppSelector(getWidgetPlacesVisibility)

    return (
        <div className="fixed right-0 top-0 z-40 h-full w-full sm:h-auto sm:max-h-screen sm:w-[512px]">
            <ScrollContainer className="h-full w-full cursor-auto sm:h-auto sm:max-h-screen sm:p-8">
                <div
                    className={classNames(
                        'bg-white shadow-medium sm:rounded-2xl',
                        `${isPlacesVisible ? 'h-full' : 'rounded-b-2xl'}`,
                    )}
                >
                    <WidgetHeader />
                    <WidgetCategories />
                    <WidgetPlaces />
                    <WidgetViewToggle />
                </div>
            </ScrollContainer>
        </div>
    )
}
