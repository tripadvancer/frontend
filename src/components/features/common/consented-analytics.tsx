'use client'

import { GoogleAnalytics } from '@next/third-parties/google'

import YandexMetrika from '@/components/features/common/yandex-metrika'
import { getAnalyticsConsent } from '@/utils/redux/features/user-slice'
import { useAppSelector } from '@/utils/redux/hooks'

export const ConsentedAnalytics = () => {
    const analyticsConsent = useAppSelector(getAnalyticsConsent)

    if (analyticsConsent !== 'accepted') {
        return null
    }

    return (
        <>
            <YandexMetrika />
            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
            )}
        </>
    )
}
