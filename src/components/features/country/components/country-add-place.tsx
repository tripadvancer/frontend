'use client'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { PinPlusIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useAddPlaceClickHandler } from '@/utils/hooks/use-add-place-click-handler'
import { useI18n } from '@/utils/i18n/i18n.client'

type CountryAddPlaceProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const CountryAddPlace = ({ activeUserId, isAuth, isEmailVerified }: CountryAddPlaceProps) => {
    const t = useI18n()
    const handleClick = useAddPlaceClickHandler({ activeUserId, isAuth, isEmailVerified })

    return (
        <FormButton icon={<PinPlusIcon24 />} onClick={handleClick}>
            {t('common.link.add_place')}
        </FormButton>
    )
}
