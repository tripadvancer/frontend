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
            <div className="shadow-medium fixed top-0 right-0 left-0 z-40">{header}</div>
            {map}
            <MapLayoutMobileToggler isVisible={true} />
        </div>
    )
}
