'use client'

import { ReactNode } from 'react'

import { MapLayoutMobileToggler } from './maps-layout-mobile-toggler'

type MapsLayoutMobileMapProps = {
    header: ReactNode
    map: ReactNode
}

export const MapsLayoutMobileMap = ({ header, map }: MapsLayoutMobileMapProps) => {
    return (
        <div className="size-full">
            <div className="fixed left-0 right-0 top-0 z-40 shadow-medium">{header}</div>
            {map}
            <MapLayoutMobileToggler isVisible={true} />
        </div>
    )
}
