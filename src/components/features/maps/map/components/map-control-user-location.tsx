'use client'

import { LocationAnimatedIcon16, LocationIcon16 } from '@/components/ui/icons'
import { MapControl } from '@/components/ui/map-control'
import { useUserLocation } from '@/utils/hooks/use-user-location'

export const MapControlUserLocation = () => {
    const { isLocating, isWatching, isDenied, handleLocate } = useUserLocation()

    return (
        <MapControl isLoading={isLocating} onClick={handleLocate}>
            {isWatching ? (
                <LocationAnimatedIcon16 />
            ) : isDenied ? (
                <div className="text-black-40">
                    <LocationIcon16 />
                </div>
            ) : (
                <LocationIcon16 />
            )}
        </MapControl>
    )
}
