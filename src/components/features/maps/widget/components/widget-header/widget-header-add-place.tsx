'use client'

import { RoundPlus24 } from '@/components/ui/icons'
import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'

type WidgetHeaderAddPlaceProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const WidgetHeaderAddPlace = ({ activeUserId, isAuth, isEmailVerified }: WidgetHeaderAddPlaceProps) => {
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <div className="hover-animated cursor-pointer text-blue-100 hover:text-blue-active" onClick={handleClick}>
            <RoundPlus24 />
        </div>
    )
}
