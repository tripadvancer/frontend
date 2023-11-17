'use client'

import Link from 'next/link'

import { getIsCookieAccepted, setCookieAccepted } from '@/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

import { Button } from './forms/button/button'

export const CookieConsent = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const isCookieAccepted = useAppSelector(getIsCookieAccepted)

    if (isCookieAccepted) {
        return null
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-orange-10">
            <div className="container flex justify-between gap-x-4 py-4">
                <div className="text-black-70">
                    <div className="font-medium">{t('cookie.consent.title')}</div>
                    <div>
                        {t('cookie.consent.description', {
                            cookie_policy_link: (
                                <Link
                                    href="#"
                                    className='className="hover-animated hover:text-blue-active" cursor-pointer text-blue-100'
                                >
                                    {t('cookie.consent.cookie_policy_link')}
                                </Link>
                            ),
                        })}
                    </div>
                </div>
                <Button variant="orange" onClick={() => dispatch(setCookieAccepted(true))}>
                    {t('common.action.got_it')}
                </Button>
            </div>
        </div>
    )
}
