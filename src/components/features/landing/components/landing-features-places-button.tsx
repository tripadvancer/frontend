'use client'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { openWidget, resetWidgetState } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

export const LandingFeaturesPlacesButton = () => {
    const t = useI18n()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(resetWidgetState())
        dispatch(openWidget())
        router.push('/maps')
    }

    return (
        <FormButton variant="orange" onClick={handleClick}>
            {t('landing.features.places.button')}
        </FormButton>
    )
}
