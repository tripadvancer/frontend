'use client'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { setMobileMapLayout } from '@/redux/features/app-slice'
import { setWidgetActiveSide, setWidgetActiveTab } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { MobileMapLayoutEnum, WidgetSideEnum, WidgetTabsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

export const LandingFeaturesPlacesButton = () => {
    const t = useI18n()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(setMobileMapLayout(MobileMapLayoutEnum.MAP))
        dispatch(setWidgetActiveSide(WidgetSideEnum.PLACES))
        dispatch(setWidgetActiveTab(WidgetTabsEnum.ALL))
        router.push('/maps')
    }

    return (
        <FormButton variant="orange" onClick={handleClick}>
            {t('landing.features.places.button')}
        </FormButton>
    )
}
