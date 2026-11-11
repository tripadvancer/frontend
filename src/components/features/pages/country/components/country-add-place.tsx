'use client'

import { MapPinPlusIcon } from 'lucide-react'

import { FormButton } from '@/components/ui/form-button'
import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'

type CountryAddPlaceProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const CountryAddPlace = ({ activeUserId, isAuth, isEmailVerified }: CountryAddPlaceProps) => {
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <FormButton icon={<MapPinPlusIcon />} onClick={handleClick}>
            Add place
        </FormButton>
    )
}
