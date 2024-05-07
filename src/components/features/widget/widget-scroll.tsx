'use client'

import { ReactNode, useEffect } from 'react'

export const WidgetScroll = ({ children }: { children: ReactNode }) => {
    // calculate div height > window height
    // useEffect(() => {
    //     const widget = document.querySelector('.widget-scroll')
    //     const windowHeight = window.innerHeight
    //     if (widget) {
    //         widget.style.height = `${windowHeight}px`
    //     }
    // }, [])

    return (
        <div className="scrollbar-hide fixed right-0 top-0 z-40 max-h-full w-full overflow-y-auto pb-8 sm:w-[496px] sm:pb-8 sm:pl-8 sm:pr-4 sm:pt-4">
            {children}
        </div>
    )
}
