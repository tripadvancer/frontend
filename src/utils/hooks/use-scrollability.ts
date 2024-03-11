import { RefObject, useEffect, useRef, useState } from 'react'

export function useScrollability(): [RefObject<HTMLDivElement>, boolean] {
    const [isScrollable, setIsScrollable] = useState<boolean>(false)
    const widgetInnerRef = useRef<HTMLDivElement>(null)
    const scrollGap = 32 * 2

    useEffect(() => {
        const updateWindowDimensions = () => {
            const { innerHeight } = window
            const { offsetHeight } = widgetInnerRef.current || { offsetHeight: 0 }

            setIsScrollable(innerHeight - scrollGap < offsetHeight)
        }

        const resizeObserver = new ResizeObserver(updateWindowDimensions)
        if (widgetInnerRef.current) {
            resizeObserver.observe(widgetInnerRef.current)
        }

        window.addEventListener('resize', updateWindowDimensions)
        updateWindowDimensions()

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener('resize', updateWindowDimensions)
        }
    }, [scrollGap])

    return [widgetInnerRef, isScrollable]
}
