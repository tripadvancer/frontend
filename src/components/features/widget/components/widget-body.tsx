'use client'

import { ReactNode } from 'react'

import { useMediaQuery } from 'usehooks-ts'

import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'

export const WidgetBody = ({ children }: { children: ReactNode }) => {
    const widgetState = useAppSelector(getWidgetState)
    const isMobile = useMediaQuery('(max-width: 639px)')

    if (isMobile && !widgetState.widgetIsExpanded) {
        return null
    }

    return children
}
