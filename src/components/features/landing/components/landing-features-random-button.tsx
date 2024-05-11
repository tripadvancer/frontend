'use client'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { setAppMode } from '@/redux/features/app-slice'
import { setWidgetActiveTab, setWidgetMode } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { AppMode, WidgetMode, WidgetTabsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

export const LandingFeaturesRandomButton = () => {
    const t = useI18n()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(setAppMode(AppMode.WIDGET))
        dispatch(setWidgetMode(WidgetMode.RANDOM))
        dispatch(setWidgetActiveTab(WidgetTabsEnum.ALL))
        router.push('/maps')
    }

    return (
        <FormButton variant="orange" onClick={handleClick}>
            {t('landing.features.random.button')}
        </FormButton>
    )
}
