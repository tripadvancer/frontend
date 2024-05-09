'use client'

import { ReactNode } from 'react'

import { useMediaQuery } from 'usehooks-ts'

import { MapsLayoutDesktop } from './maps-layout-desktop'
import { MapsLayoutMobile } from './maps-layout-mobile'

type MapsContainerProps = {
    map: ReactNode
    header: ReactNode
    widget: ReactNode
    widgetRandom: ReactNode
}

export const MapsLayout = ({ map, header, widget, widgetRandom }: MapsContainerProps) => {
    const isMobile = useMediaQuery('(max-width: 639px)')

    if (isMobile) {
        return <MapsLayoutMobile header={header} map={map} widget={widget} widgetRandom={widgetRandom} />
    }

    return <MapsLayoutDesktop map={map} widget={widget} widgetRandom={widgetRandom} />
}
