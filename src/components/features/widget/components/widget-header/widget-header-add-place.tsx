'use client'

import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetHeaderAddPlaceProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const WidgetHeaderAddPlace = ({ activeUserId, isAuth, isEmailVerified }: WidgetHeaderAddPlaceProps) => {
    const t = useI18n()
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <div
            className="flex-center h-6 cursor-pointer rounded-full border-2 border-black-100 px-2 text-small-bold"
            onClick={handleClick}
        >
            {t('common.link.add_place')}
        </div>
    )
}
