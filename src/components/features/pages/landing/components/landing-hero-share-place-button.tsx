'use client'

import { FormButton } from '@/components/ui/form-button'
import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'

type LandingHeroSharePlaceButtonProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const LandingHeroSharePlaceButton = ({
    activeUserId,
    isAuth,
    isEmailVerified,
}: LandingHeroSharePlaceButtonProps) => {
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <FormButton variant="orange" onClick={handleClick}>
            Share Places
        </FormButton>
    )
}
