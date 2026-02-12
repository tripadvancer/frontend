'use client'

import { useTranslations } from 'next-intl'

import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'
import { getIsCookieAccepted, setCookieAccepted } from '@/utils/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

export const CookieConsent = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const isCookieAccepted = useAppSelector(getIsCookieAccepted)

    if (isCookieAccepted) {
        return null
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-orange-10">
            <div className="container flex flex-col gap-4 py-4 sm:flex-row sm:justify-between">
                <div className="text-black-70">
                    <div className="font-medium">{t('banner.cookieConsent.title')}</div>
                    <div>
                        {t.rich('banner.cookieConsent.text', {
                            cookiePolicyLink: cookiePolicyLink => (
                                <Link href="/legal/cookie-policy">{cookiePolicyLink}</Link>
                            ),
                        })}
                    </div>
                </div>
                <div className="flex-none">
                    <FormButton variant="orange" onClick={() => dispatch(setCookieAccepted())}>
                        {t('banner.cookieConsent.gotIt')}
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
