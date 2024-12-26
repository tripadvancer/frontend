'use client'

import { LocateFixedIcon } from 'lucide-react'

import { MapControl } from '@/components/ui/map-control'
import { useUserLocation } from '@/utils/hooks/use-user-location'

export const MapControlUserLocation = () => {
    const { isLocating, isWatching, isDenied, handleLocate } = useUserLocation()

    return (
        <MapControl isLoading={isLocating} onClick={handleLocate}>
            {isWatching ? (
                <LocateFixedIcon size={16} />
            ) : isDenied ? (
                <div className="text-black-40">
                    <LocateFixedIcon size={16} />
                </div>
            ) : (
                <LocateFixedIcon size={16} />
            )}
        </MapControl>
    )
}
