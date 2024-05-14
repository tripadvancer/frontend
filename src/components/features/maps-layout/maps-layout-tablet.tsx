'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import { getAppMode } from '@/redux/features/app-slice'
import { getWidgetMode } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { AppModes, WidgetModes } from '@/utils/enums'

import { MapLayoutMobileToggler } from './maps-layout-mobile-toggler'

type MapsLayoutTabletProps = {
    header: ReactNode
    map: ReactNode
    widget: ReactNode
    widgetRandom: ReactNode
}

export const MapsLayoutTablet = ({ header, map, widget, widgetRandom }: MapsLayoutTabletProps) => {
    const appMode = useAppSelector(getAppMode)
    const widgetMode = useAppSelector(getWidgetMode)

    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const contentContainerRef = useRef<HTMLDivElement>(null)

    const [isToglerVisible, setIsToglerVisible] = useState<boolean>(true)

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current
        const contentContainer = contentContainerRef.current

        const handleScroll = () => {
            // 47 is top (32px) and bottom (16px) widget padding
            // - 1px for hide scrollbar if scroll container equal content container height
            const scrollPosition = window.innerHeight + (scrollContainer?.scrollTop || 0) - 47
            const scrollContainerHeight = contentContainer?.clientHeight || 0
            setIsToglerVisible(scrollPosition < scrollContainerHeight)
        }

        scrollContainer?.addEventListener('scroll', handleScroll)

        return () => {
            scrollContainer?.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="size-full">
            {map}

            <div className={classNames('block', { hidden: appMode === AppModes.MAP })}>
                <div
                    ref={scrollContainerRef}
                    className="scrollbar-hide pointer-events-none fixed bottom-0 right-0 top-0 z-40 max-h-full w-[496px] overflow-y-auto pb-8 pl-8 pr-4 pt-4"
                >
                    <div ref={contentContainerRef} className="pointer-events-auto rounded-2xl shadow-large">
                        {widgetMode === WidgetModes.PLACES && widget}
                        {widgetMode === WidgetModes.RANDOM && widgetRandom}
                    </div>
                </div>
            </div>

            <div className={classNames('block', { hidden: appMode === AppModes.WIDGET })}>
                <div className="fixed right-0 top-0 z-50 w-[496px] pb-8 pl-8 pr-4 pt-4">
                    <div className="rounded-2xl shadow-large">{header}</div>
                </div>
            </div>

            <MapLayoutMobileToggler isVisible={isToglerVisible} />
        </div>
    )
}
