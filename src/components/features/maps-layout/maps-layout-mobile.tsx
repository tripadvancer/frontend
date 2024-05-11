'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

import { getAppMode } from '@/redux/features/app-slice'
import { getWidgetMode } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { AppMode, WidgetMode } from '@/utils/enums'

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
            <div className={classNames('block size-full', { hidden: appMode === AppMode.MAP })}>
                {widgetMode === WidgetMode.PLACES && <MapsLayoutMobileWidget widget={widget} />}
                {widgetMode === WidgetMode.RANDOM && <MapsLayoutMobileWidget widget={widgetRandom} />}
            </div>

            <div className={classNames('block size-full', { hidden: appMode === AppMode.WIDGET })}>
                <MapsLayoutMobileMap header={header} map={map} />
            </div>
        </>
    )
}
