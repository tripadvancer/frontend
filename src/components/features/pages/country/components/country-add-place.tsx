'use client'

import { MapPinPlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'
import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'

type CountryAddPlaceProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const CountryAddPlace = ({ activeUserId, isAuth, isEmailVerified }: CountryAddPlaceProps) => {
    const t = useTranslations()
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <FormButton icon={<MapPinPlusIcon />} onClick={handleClick}>
            {t('page.country.addPlace')}
        </FormButton>
    )
}
