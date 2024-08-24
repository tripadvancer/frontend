'use client'

import { ReactNode } from 'react'

import { useMediaQuery } from 'usehooks-ts'

import { MapsLayoutDesktop } from './maps-layout-desktop'
import { MapsLayoutMobile } from './maps-layout-mobile'
import { MapsLayoutTablet } from './maps-layout-tablet'

type MapsContainerProps = {
    map: ReactNode
    header: ReactNode
    widget: ReactNode
    widgetRandom: ReactNode
}

export const MapsLayout = ({ map, header, widget, widgetRandom }: MapsContainerProps) => {
    const isMobile = useMediaQuery('(max-width: 639px)')
    const isTablet = useMediaQuery('(max-width: 1023px)')

    if (isMobile) {
        return <MapsLayoutMobile header={header} map={map} widget={widget} widgetRandom={widgetRandom} />
    }

    if (isTablet) {
        return <MapsLayoutTablet header={header} map={map} widget={widget} widgetRandom={widgetRandom} />
    }

    return <MapsLayoutDesktop map={map} widget={widget} widgetRandom={widgetRandom} />
}
