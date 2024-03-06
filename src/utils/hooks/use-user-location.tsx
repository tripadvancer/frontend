import { useState } from 'react'

import { setMapViewState } from '@/redux/features/map-slice'
import { setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/hooks'

interface UserLocationHookInterface {
    isLocating: boolean
    handleLocate: () => void
}

export function useUserLocation(): UserLocationHookInterface {
    const dispatch = useAppDispatch()
    const [isLocating, setIsLocating] = useState(false)

    const handleLocate = () => {
        if ('geolocation' in navigator) {
            setIsLocating(true)
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                dispatch(setUserLocation({ lng: position.coords.longitude, lat: position.coords.latitude }))
                dispatch(
                    setMapViewState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        zoom: 12,
                    }),
                )
                setIsLocating(false)
            })
        }
    }

    return { isLocating, handleLocate }
}
