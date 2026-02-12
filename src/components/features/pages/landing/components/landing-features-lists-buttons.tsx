'use client'

import { useTranslations } from 'next-intl'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { AppModes, WidgetModes, WidgetTabs } from '@/utils/enums'
import { setAppMode } from '@/utils/redux/features/app-slice'
import { setWidgetActiveTab, setWidgetMode } from '@/utils/redux/features/widget-slice'
import { useAppDispatch } from '@/utils/redux/hooks'

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
            {t('page.landing.features.lists.button')}
        </FormButton>
    )
}
