'use client'

import { useAppSettings } from '@/components/providers/settings-provider'
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
    const settings = useAppSettings()
    const handleAddPlaceClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    if (!settings?.switchers.add_places) {
        return null
    }

    return (
        <button
            className="flex-center hover-animated lg:text-small lg:hover:text-blue-active cursor-pointer text-nowrap text-blue-100 lg:h-8 lg:rounded-full lg:bg-white lg:px-4 lg:text-blue-100"
            onClick={handleAddPlaceClick}
        >
            Share place
        </button>
    )
}
