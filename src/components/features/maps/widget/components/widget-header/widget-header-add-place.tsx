'use client'

import { MapPinPlusIcon } from 'lucide-react'

import { useAppSettings } from '@/components/providers/settings-provider'
import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'

type WidgetHeaderAddPlaceProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const WidgetHeaderAddPlace = ({ activeUserId, isAuth, isEmailVerified }: WidgetHeaderAddPlaceProps) => {
    const settings = useAppSettings()
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    if (!settings?.switchers.add_places) {
        return null
    }

    return (
        <div className="hover-animated hover:text-orange-active cursor-pointer text-orange-100" onClick={handleClick}>
            <MapPinPlusIcon />
        </div>
    )
}
