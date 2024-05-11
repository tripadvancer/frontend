'use client'

import { ReactNode } from 'react'

import { getWidgetMode } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { WidgetModes } from '@/utils/enums'

type MapsLayoutDesktopProps = {
    map: ReactNode
    widget: ReactNode
    widgetRandom: ReactNode
}

export const MapsLayoutDesktop = ({ map, widget, widgetRandom }: MapsLayoutDesktopProps) => {
    const widgetMode = useAppSelector(getWidgetMode)

    return (
        <div className="size-full border">
            {map}
            <div className="scrollbar-hide pointer-events-none fixed bottom-0 right-0 top-0 z-40 max-h-full w-[496px] overflow-y-auto pb-8 pl-8 pr-4 pt-4">
                <div className="pointer-events-auto rounded-2xl shadow-large">
                    {widgetMode === WidgetModes.PLACES && widget}
                    {widgetMode === WidgetModes.RANDOM && widgetRandom}
                </div>
            </div>
        </div>
    )
}
