'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import { MapLayoutMobileToggler } from './maps-layout-mobile-toggler'

type MapsLayoutMobileWidgetProps = {
    widget: ReactNode
}

export const MapsLayoutMobileWidget = ({ widget }: MapsLayoutMobileWidgetProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const [isToglerVisible, setIsToglerVisible] = useState<boolean>(true)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY
            const scrollContainerHeight = scrollContainerRef.current?.clientHeight || 0
            setIsToglerVisible(scrollPosition < scrollContainerHeight)
            console.log(scrollPosition, scrollContainerHeight)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div ref={scrollContainerRef} style={{ minHeight: 'calc(100% + 1px)' }}>
            {widget}
            <MapLayoutMobileToggler isVisible={isToglerVisible} />
        </div>
    )
}
