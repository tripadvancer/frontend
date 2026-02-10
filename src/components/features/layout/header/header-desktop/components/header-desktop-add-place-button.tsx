'use client'

import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'

type HeaderDesktopAddPlaceButtonProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const HeaderDesktopAddPlaceButton = ({
    activeUserId,
    isAuth,
    isEmailVerified,
}: HeaderDesktopAddPlaceButtonProps) => {
    const handleAddPlaceClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <button
            className="flex-center hover-animated cursor-pointer text-nowrap text-blue-100 lg:h-8 lg:rounded-full lg:bg-white lg:px-4 lg:text-small lg:text-blue-100 lg:hover:text-blue-active"
            onClick={handleAddPlaceClick}
        >
            Share place
        </button>
    )
}
