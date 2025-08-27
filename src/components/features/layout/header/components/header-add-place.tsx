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
            className="flex-center hover-animated cursor-pointer text-blue-100 sm:h-8 sm:rounded-full sm:bg-white sm:px-4 sm:text-small sm:text-blue-100 sm:hover:text-blue-active"
            onClick={handleClick}
        >
            <MapPinPlusIcon className="block sm:hidden" />
            <span className="hidden sm:block">{t('layout.header.addPlace')}</span>
        </div>
    )
}
