'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

import { AppModes, WidgetModes } from '@/utils/enums'
import { getAppMode } from '@/utils/redux/features/app-slice'
import { getWidgetMode } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'

import { MapsLayoutMobileMap } from './maps-layout-mobile-map'
import { MapsLayoutMobileWidget } from './maps-layout-mobile-widget'

type MapsLayoutMobileProps = {
    header: ReactNode
    map: ReactNode
    widget: ReactNode
    widgetRandom: ReactNode
}

export const MapsLayoutMobile = ({ header, map, widget, widgetRandom }: MapsLayoutMobileProps) => {
    const appMode = useAppSelector(getAppMode)
    const widgetMode = useAppSelector(getWidgetMode)

    return (
        <>
            <div
                className={classNames('visible size-full', {
                    'invisible fixed -top-full': appMode === AppModes.MAP,
                })}
            >
                {widgetMode === WidgetModes.PLACES && <MapsLayoutMobileWidget widget={widget} />}
                {widgetMode === WidgetModes.RANDOM && <MapsLayoutMobileWidget widget={widgetRandom} />}
            </div>

            <div
                className={classNames('visible size-full', {
                    'invisible fixed -top-full': appMode === AppModes.WIDGET,
                })}
            >
                <MapsLayoutMobileMap header={header} map={map} />
            </div>
        </>
    )
}
