'use client'

import { MapPinPlusIcon } from 'lucide-react'

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
    const handleAddPlaceClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

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
