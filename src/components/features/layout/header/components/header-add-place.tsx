'use client'

import { useTranslations } from 'next-intl'

import { RoundPlus24 } from '@/components/ui/icons'
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
            className="flex-center hover-animated cursor-pointer text-orange-100 sm:h-8 sm:rounded-full sm:bg-orange-100 sm:px-4 sm:text-small sm:text-white sm:hover:bg-orange-active"
            onClick={handleClick}
        >
            <RoundPlus24 className="block sm:hidden" />
            <span className="hidden sm:block">{t('layout.header.addPlace')}</span>
        </div>
    )
}
