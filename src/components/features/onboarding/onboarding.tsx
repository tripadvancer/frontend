'use client'

import { getIsOnboarded } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

import { OnboardingFeaturePlaces } from './components/onboarding-feature-places'

export const Onboarding = () => {
    const t = useI18n()
    const isOnboarded = useAppSelector(getIsOnboarded)

    return null

    return (
        <div className="flex-center fixed bottom-0 left-0 right-0 top-0 z-50 p-4 sm:p-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-blue-100 opacity-30" />
            <div className="relative w-full rounded-4xl bg-white sm:w-[928px] sm:p-16">
                <OnboardingFeaturePlaces />
            </div>
        </div>
    )
}
