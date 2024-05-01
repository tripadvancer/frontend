'use client'

import { PinPlusIcon24, PlusIcon16 } from '@/components/ui/icons'
import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'
import { useI18n } from '@/utils/i18n/i18n.client'

type HeaderButtonAddPlaceProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const HeaderButtonAddPlace = ({ activeUserId, isAuth, isEmailVerified }: HeaderButtonAddPlaceProps) => {
    const t = useI18n()
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <div
            className="flex-center hover-animated cursor-pointer text-blue-100 sm:h-8 sm:rounded-full sm:bg-white sm:px-4 sm:text-small"
            onClick={handleClick}
        >
            <PinPlusIcon24 className="block sm:hidden" />
            <span className="hidden sm:block">{t('common.link.add_place')}</span>
        </div>
    )
}
