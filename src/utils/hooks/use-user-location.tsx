import { useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/hooks'
import { getMapFlyToOptions } from '@/utils/helpers/maps'

interface useUserLocationInterface {
    isLocating: boolean
    handleLocate: () => void
}

export function useUserLocation(): useUserLocationInterface {
    const dispatch = useAppDispatch()
    const [isLocating, setIsLocating] = useState(false)

    const { map } = useMap()

    const handleLocate = () => {
        if ('geolocation' in navigator) {
            setIsLocating(true)
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                const lngLat = { lng: position.coords.longitude, lat: position.coords.latitude }
                map?.flyTo(getMapFlyToOptions(lngLat))
                dispatch(setUserLocation(lngLat))
                setIsLocating(false)
            })
        }
    }

    return { isLocating, handleLocate }
}
