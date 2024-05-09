'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

import { animated, useTransition } from '@react-spring/web'
import { useMediaQuery } from 'usehooks-ts'

import { MapsContainerToggler } from './maps-container-toggler'

export const MapsContainer = ({ map, header, widget }: { map: ReactNode; header: ReactNode; widget: ReactNode }) => {
    const isMobile = useMediaQuery('(max-width: 639px)')

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const [isBottonVisible, setIsBottonVisible] = useState<boolean>(true)
    const [isToggle, setIsToggle] = useState<boolean>(false)

    const slideDown = useTransition(isBottonVisible, {
        // animate slide down and up for hide and show button
        // and change opacity
        from: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
        enter: { opacity: 1, transform: 'translateY(-48px) translateX(-50%)' },
        leave: { opacity: 0, transform: 'translateY(100px) translateX(-50%)' },
    })

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
                        {slideDown(
                            (style, item) =>
                                item && (
                                    <animated.div style={style} className="fixed bottom-0 left-1/2 z-40 transform">
                                        <MapsContainerToggler
                                            isToggle={isToggle}
                                            onClick={() => setIsToggle(!isToggle)}
                                        />
                                    </animated.div>
                                ),
                        )}
                    </div>
                ) : (
                    <>
                        <div className="fixed left-0 right-0 top-0 z-40 shadow-medium">{header}</div>
                        {map}
                        <div className="fixed bottom-12 left-1/2 z-40 -translate-x-1/2 transform">
                            <MapsContainerToggler isToggle={isToggle} onClick={() => setIsToggle(!isToggle)} />
                        </div>
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
