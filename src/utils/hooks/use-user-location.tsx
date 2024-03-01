import { useState } from 'react'

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
                setIsLocating(false)
            })
        }
    }

    return { isLocating, handleLocate }
}
