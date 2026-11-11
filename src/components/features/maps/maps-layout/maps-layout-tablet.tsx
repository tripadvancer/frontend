'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import { AppModes, WidgetModes } from '@/utils/enums'
import { getAppMode } from '@/utils/redux/features/app-slice'
import { getWidgetMode } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'

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
                    className="scrollbar-hide pointer-events-none fixed top-0 right-0 bottom-0 z-40 max-h-full w-[496px] overflow-y-auto pt-4 pr-4 pb-8 pl-8"
                >
                    <div ref={contentContainerRef} className="shadow-large pointer-events-auto rounded-2xl">
                        {widgetMode === WidgetModes.PLACES && widget}
                        {widgetMode === WidgetModes.RANDOM && widgetRandom}
                    </div>
                </div>
            </div>

            <div className={classNames('block', { hidden: appMode === AppModes.WIDGET })}>
                <div className="fixed top-0 right-0 z-50 w-[496px] pt-4 pr-4 pb-8 pl-8">
                    <div className="shadow-large rounded-2xl">{header}</div>
                </div>
            </div>

            <MapLayoutMobileToggler isVisible={isToglerVisible} />
        </div>
    )
}
