'use client'

import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'
import { getIsCookieAccepted, setCookieAccepted } from '@/utils/redux/features/user-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

export const CookieConsent = () => {
    const dispatch = useAppDispatch()
    const isCookieAccepted = useAppSelector(getIsCookieAccepted)

    if (isCookieAccepted) {
        return null
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-orange-10">
            <div className="container flex flex-col gap-4 py-4 sm:flex-row sm:justify-between">
                <div className="text-black-70">
                    <div className="font-medium">Allow Cookies</div>
                    <div>
                        This website uses cookies to ensure you get the best experience on our website. For more
                        information, you can read our <Link href="/legal/cookie-policy">Cookie Policy</Link>.
                    </div>
                </div>
                <div className="flex-none">
                    <FormButton variant="orange" onClick={() => dispatch(setCookieAccepted())}>
                        Got it!
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
