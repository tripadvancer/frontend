'use client'

import { RoundPlus24 } from '@/components/ui/icons'
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
        <div className="hover-animated cursor-pointer text-blue-100 hover:text-blue-active" onClick={handleClick}>
            <RoundPlus24 />
        </div>
    )
}
