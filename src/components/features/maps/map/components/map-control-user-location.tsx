'use client'

import { LocateFixedIcon, LocateIcon, LocateOffIcon } from 'lucide-react'

import { MapControl } from '@/components/ui/map-control'
import { useUserLocation } from '@/utils/hooks/use-user-location'

export const MapControlUserLocation = () => {
    const { isLocating, isWatching, isDenied, handleLocate } = useUserLocation()

    return (
        <MapControl isLoading={isLocating} onClick={handleLocate}>
            {isWatching ? (
                <div className="relative">
                    <LocateIcon size={16} />
                    <div className="animate-pulse-full absolute left-1/2 top-1/2 z-10 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black-100" />
                </div>
            ) : isDenied ? (
                <LocateOffIcon size={16} className="text-black-40" />
            ) : (
                <LocateFixedIcon size={16} />
            )}
        </MapControl>
    )
}
