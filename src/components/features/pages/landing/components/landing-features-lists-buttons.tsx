'use client'

import { useTranslations } from 'next-intl'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { setAppMode } from '@/redux/features/app-slice'
import { setWidgetActiveTab, setWidgetMode } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { AppModes, WidgetModes, WidgetTabs } from '@/utils/enums'

export const LandingFeaturesListsButton = () => {
    const t = useTranslations()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(setAppMode(AppModes.WIDGET))
        dispatch(setWidgetMode(WidgetModes.PLACES))
        dispatch(setWidgetActiveTab(WidgetTabs.SAVED))
        router.push('/maps')
    }

    return (
        <FormButton variant="orange" onClick={handleClick}>
            {t('page.landing.features.featureLists.button')}
        </FormButton>
    )
}
