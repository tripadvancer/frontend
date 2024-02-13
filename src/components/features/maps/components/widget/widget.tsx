'use client'

import ScrollContainer from 'react-indiana-drag-scroll'

import { WidgetCategories } from './components/widget-categories'
import { WidgetHeader } from './components/widget-header'
import { WidgetPlaces } from './components/widget-places'

export const Widget = () => {
    return (
        <ScrollContainer className="fixed right-0 top-0 z-40 max-h-screen w-full cursor-auto sm:w-[512px] sm:p-8">
            <div role="widget" className="rounded-b-2xl bg-white shadow-small sm:rounded-2xl">
                <WidgetHeader />
                <WidgetCategories />
                <WidgetPlaces />
            </div>
        </ScrollContainer>
    )
}
