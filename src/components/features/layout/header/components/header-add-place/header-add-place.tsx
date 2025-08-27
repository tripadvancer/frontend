'use client'

import { MapPinPlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'

type HeaderAddPlaceProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const HeaderAddPlace = ({ activeUserId, isAuth, isEmailVerified }: HeaderAddPlaceProps) => {
    const t = useTranslations()
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <div
            className="flex-center hover-animated cursor-pointer text-nowrap text-blue-100 lg:h-8 lg:rounded-full lg:bg-white lg:px-4 lg:text-small lg:text-blue-100 lg:hover:text-blue-active"
            onClick={handleClick}
        >
            <MapPinPlusIcon className="block lg:hidden" />
            <span className="hidden lg:block">{t('layout.header.addPlace')}</span>
        </div>
    )
}
