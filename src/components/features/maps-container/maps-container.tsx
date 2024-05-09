'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import { useMediaQuery } from 'usehooks-ts'

import { useSearchParams } from 'next/navigation'

import { MapsContainerToggler } from './maps-container-toggler'
import { MapsDesktopWidgetWrapper } from './maps-desktop-widget-wrapper'

type MapsContainerProps = {
    map: ReactNode
    header: ReactNode
    widget: ReactNode
    widgetRandom: ReactNode
}

export const MapsContainer = ({ map, header, widget, widgetRandom }: MapsContainerProps) => {
    const searchParams = useSearchParams()
    const isMobile = useMediaQuery('(max-width: 639px)')

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const [isBottonVisible, setIsBottonVisible] = useState<boolean>(true)
    const [isToggle, setIsToggle] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY
            const scrollContainerHeight = scrollContainerRef.current?.clientHeight || 0
            setIsBottonVisible(scrollPosition < scrollContainerHeight)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    if (isMobile && !isToggle) {
        return (
            <div className="size-full">
                <div className="fixed left-0 right-0 top-0 z-40 shadow-medium">{header}</div>
                {map}
                <MapsContainerToggler isVisible={true} isToggle={isToggle} onClick={() => setIsToggle(!isToggle)} />
            </div>
        )
    }

    if (isMobile && isToggle) {
        if (searchParams.get('random') === 'true') {
            return (
                <div ref={scrollContainerRef} style={{ minHeight: 'calc(100% + 1px)' }}>
                    {widgetRandom}
                    <MapsContainerToggler
                        isVisible={isBottonVisible}
                        isToggle={isToggle}
                        onClick={() => setIsToggle(!isToggle)}
                    />
                </div>
            )
        }

        return (
            <div ref={scrollContainerRef} style={{ minHeight: 'calc(100% + 1px)' }}>
                {widget}
                <MapsContainerToggler
                    isVisible={isBottonVisible}
                    isToggle={isToggle}
                    onClick={() => setIsToggle(!isToggle)}
                />
            </div>
        )
    }

    if (searchParams.get('random') === 'true') {
        return (
            <div className="size-full">
                {map}
                <MapsDesktopWidgetWrapper>{widgetRandom}</MapsDesktopWidgetWrapper>
            </div>
        )
    }

    return (
        <div className="size-full">
            {map}
            <MapsDesktopWidgetWrapper>{widget}</MapsDesktopWidgetWrapper>
        </div>
    )
}
