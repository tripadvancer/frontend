'use client'

import { ReactNode } from 'react'

import { useSearchParams } from 'next/navigation'

import { MapsLayoutMobileMap } from './maps-layout-mobile-map'
import { MapsLayoutMobileWidget } from './maps-layout-mobile-widget'

type MapsLayoutMobileProps = {
    header: ReactNode
    map: ReactNode
    widget: ReactNode
    widgetRandom: ReactNode
}

export const MapsLayoutMobile = ({ header, map, widget, widgetRandom }: MapsLayoutMobileProps) => {
    const searchParams = useSearchParams()

    if (searchParams.get('view') === 'places') {
        if (searchParams.get('random') === 'true') {
            return <MapsLayoutMobileWidget widget={widgetRandom} />
        }

        return <MapsLayoutMobileWidget widget={widget} />
    }

    return <MapsLayoutMobileMap header={header} map={map} />
}
