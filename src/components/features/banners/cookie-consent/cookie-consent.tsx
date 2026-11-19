'use client'

import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'
import { getAnalyticsConsent, setAnalyticsConsent } from '@/utils/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

export const CookieConsent = () => {
    const dispatch = useAppDispatch()
    const analyticsConsent = useAppSelector(getAnalyticsConsent)

    if (analyticsConsent !== 'unset') {
        return null
    }

    return (
        <div className="bg-orange-10 fixed right-0 bottom-0 left-0 z-50">
            <div className="container flex flex-col gap-4 py-4 sm:flex-row sm:justify-between">
                <div className="text-black-70">
                    <div className="font-medium">Help us improve Tripadvancer</div>
                    <div>
                        Allow optional analytics to help us understand how the site is used. Essential storage remains
                        active. Read our <Link href="/legal/cookie-policy">Cookie Policy</Link>.
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <FormButton type="stroke" variant="blue" onClick={() => dispatch(setAnalyticsConsent('rejected'))}>
                        Reject analytics
                    </FormButton>
                    <FormButton variant="blue" onClick={() => dispatch(setAnalyticsConsent('accepted'))}>
                        Accept analytics
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
