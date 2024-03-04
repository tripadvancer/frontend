'use client'

import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'
import { getIsCookieAccepted, setCookieAccepted } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

export const CookieConsent = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const isCookieAccepted = useAppSelector(getIsCookieAccepted)

    if (isCookieAccepted) {
        return null
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-orange-10">
            <div className="container flex flex-col gap-4 py-4 sm:flex-row sm:justify-between">
                <div className="text-black-70">
                    <div className="font-medium">{t('cookie_consent.title')}</div>
                    <div>
                        {t('cookie_consent.description', {
                            cookie_policy_link: (
                                <Link href="/legal/cookie-policy">{t('cookie_consent.policy_link')}</Link>
                            ),
                        })}
                    </div>
                </div>
                <div className="flex-none">
                    <FormButton variant="orange" onClick={() => dispatch(setCookieAccepted())}>
                        {t('cookie_consent.got_it')}
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
