'use client'

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
            className="flex-center hover-animated h-8 cursor-pointer rounded-full bg-white px-4 text-small text-blue-100"
            onClick={handleClick}
        >
            {t('common.link.add_place')}
        </div>
    )
}
