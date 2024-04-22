import { useState } from 'react'

import { setMapViewState } from '@/redux/features/map-slice'
import { setUserLocation } from '@/redux/features/user-slice'
import { useAppDispatch } from '@/redux/hooks'
import { getFlyToViewState } from '@/utils/helpers/maps'

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
                const lngLat = { lng: position.coords.longitude, lat: position.coords.latitude }
                const viewState = getFlyToViewState(lngLat)
                dispatch(setUserLocation(lngLat))
                dispatch(setMapViewState(viewState))
                setIsLocating(false)
            })
        }
    }

    return { isLocating, handleLocate }
}
