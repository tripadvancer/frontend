'use client'

import { WorldMapSVG } from './world-map-svgs'

export const WorldMap = () => {
    const handleMouseEnter = (event: React.MouseEvent<SVGElement>) => {
        console.log(event.currentTarget)
    }

    // zoom svg
    const handleZoom = (event: React.WheelEvent<HTMLDivElement>) => {}

    return (
        <div onWheel={handleZoom}>
            <WorldMapSVG />
        </div>
    )
}
