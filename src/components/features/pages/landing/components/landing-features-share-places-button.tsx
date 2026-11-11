'use client'

import { FormButton } from '@/components/ui/form-button'
import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'

type LandingFeaturesPlacesButtonProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const LandingFeaturesSharePlacesButton = ({
    activeUserId,
    isAuth,
    isEmailVerified,
}: LandingFeaturesPlacesButtonProps) => {
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <FormButton variant="orange" onClick={handleClick}>
            {'Share Place'}
        </FormButton>
    )
}
