'use client'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { useI18n } from '@/utils/i18n/i18n.client'

export const LandingFeaturesRandomButton = () => {
    const t = useI18n()
    const router = useRouter()

    const handleClick = () => {
        router.push('/maps?view=places&random=true')
    }

    return (
        <FormButton variant="orange" onClick={handleClick}>
            {t('landing.features.random.button')}
        </FormButton>
    )
}
