'use client'

import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'

import { WidgetCategories } from './widget-categories'
import { WidgetPlaces } from './widget-places'
import { WidgetSearch } from './widget-search'

export const WidgetBody = () => {
    const widgetState = useAppSelector(getWidgetState)
    const isMobile = useMediaQuery({ query: '(max-width: 639px)' })

    useEffect(() => {
        console.log(isMobile)
    }, [isMobile])

    if (isMobile && !widgetState.widgetIsExpanded) {
        return null
    }

    return (
        <div>
            <div className="relative flex flex-col gap-y-4 rounded-2xl bg-blue-10 p-4 sm:gap-y-8 sm:p-8">
                <WidgetSearch />
                <WidgetCategories />
            </div>
            <div className="p-4 pb-8 sm:p-8">
                <WidgetPlaces />
            </div>
        </div>
    )
}
