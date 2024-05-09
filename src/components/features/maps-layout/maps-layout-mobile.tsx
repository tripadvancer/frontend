'use client'

import { ReactNode } from 'react'

import classNames from 'classnames'

import { getMobileMapLayout } from '@/redux/features/app-slice'
import { getWidgetActiveSide } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { MobileMapLayoutEnum, WidgetSideEnum } from '@/utils/enums'

import { MapsLayoutMobileMap } from './maps-layout-mobile-map'
import { MapsLayoutMobileWidget } from './maps-layout-mobile-widget'

type MapsLayoutMobileProps = {
    header: ReactNode
    map: ReactNode
    widget: ReactNode
    widgetRandom: ReactNode
}

export const MapsLayoutMobile = ({ header, map, widget, widgetRandom }: MapsLayoutMobileProps) => {
    const widgetActiveSide = useAppSelector(getWidgetActiveSide)
    const mobileMapLayout = useAppSelector(getMobileMapLayout)

    return (
        <>
            <div
                className={classNames('block size-full', {
                    hidden: mobileMapLayout === MobileMapLayoutEnum.MAP,
                })}
            >
                <MapsLayoutMobileWidget widget={widgetActiveSide === WidgetSideEnum.RANDOM ? widgetRandom : widget} />
            </div>

            <div
                className={classNames('block size-full', {
                    hidden: mobileMapLayout === MobileMapLayoutEnum.WIDGET,
                })}
            >
                <MapsLayoutMobileMap header={header} map={map} />
            </div>
        </>
    )
}
