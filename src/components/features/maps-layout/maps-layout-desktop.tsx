'use client'

import { ReactNode } from 'react'

import { getWidgetActiveSide } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { WidgetSideEnum } from '@/utils/enums'

type MapsLayoutDesktopProps = {
    map: ReactNode
    widget: ReactNode
    widgetRandom: ReactNode
}

export const MapsLayoutDesktop = ({ map, widget, widgetRandom }: MapsLayoutDesktopProps) => {
    const widgetActiveSide = useAppSelector(getWidgetActiveSide)

    return (
        <div className="size-full">
            {map}
            <div className="scrollbar-hide fixed right-0 top-0 z-40 max-h-full w-[496px] overflow-y-auto overscroll-y-none pb-8 pl-8 pr-4 pt-4">
                <div className="overflow-hidden rounded-2xl shadow-large">
                    {widgetActiveSide === WidgetSideEnum.RANDOM ? widgetRandom : widget}
                </div>
            </div>
        </div>
    )
}
