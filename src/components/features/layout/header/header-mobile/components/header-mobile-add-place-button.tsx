'use client'

import { MapPinPlusIcon } from 'lucide-react'

import { useAppSettings } from '@/components/providers/settings-provider'
import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'

type HeaderMobileAddPlaceButtonProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
    closeMobileMenu: () => void
}

export const HeaderMobileAddPlaceButton = ({
    activeUserId,
    isAuth,
    isEmailVerified,
    closeMobileMenu,
}: HeaderMobileAddPlaceButtonProps) => {
    const settings = useAppSettings()
    const handleAddPlaceClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    if (!settings?.switchers.add_places) {
        return null
    }

    return (
        <button
            className="link flex items-center justify-between gap-x-2 focus:outline-none"
            onClick={() => {
                handleAddPlaceClick()
                closeMobileMenu()
            }}
        >
            Share place
            <MapPinPlusIcon size={20} />
        </button>
    )
}
