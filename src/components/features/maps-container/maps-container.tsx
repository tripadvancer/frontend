'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import { useMediaQuery } from 'usehooks-ts'

import { MapsContainerToggler } from './maps-container-toggler'

export const MapsContainer = ({ map, header, widget }: { map: ReactNode; header: ReactNode; widget: ReactNode }) => {
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

    if (isMobile) {
        return (
            <div className="size-full">
                {isToggle ? (
                    <div ref={scrollContainerRef} style={{ minHeight: 'calc(100% + 1px)' }}>
                        {widget}
                        {isBottonVisible && (
                            <MapsContainerToggler isToggle={isToggle} onClick={() => setIsToggle(!isToggle)} />
                        )}
                    </div>
                ) : (
                    <>
                        <div className="fixed left-0 right-0 top-0 z-40 shadow-medium">{header}</div>
                        {map}
                        <MapsContainerToggler isToggle={isToggle} onClick={() => setIsToggle(!isToggle)} />
                    </>
                )}
            </div>
        )
    }

    return (
        <div className="size-full">
            {map}
            <div className="scrollbar-hide fixed right-0 top-0 z-40 max-h-full w-[496px] overflow-y-auto overscroll-y-none pb-8 pl-8 pr-4 pt-4">
                <div className="overflow-hidden rounded-2xl shadow-large">{widget}</div>
            </div>
        </div>
    )
}
