'use client'

import { useState } from 'react'

import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { useRouter } from 'next/navigation'

import { ButtonStroke } from '@/components/forms/button-stroke/button-stroke'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type ThirdPartyButtonProps = {
    provider: 'google' | 'facebook'
    isDisabled?: boolean
}

export const ThirdPartyButton = ({ provider, isDisabled }: ThirdPartyButtonProps) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleClick = async () => {
        setIsLoading(true)

        try {
            const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
                thirdPartyId: provider,
                frontendRedirectURI: `${process.env.NEXT_PUBLIC_WEBSITE_AUTH_CALLBACK_PATH}/${provider}`,
            })
            router.replace(authUrl)
        } catch (err: any) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ButtonStroke className="w-full" isLoading={isLoading} isDisabled={isDisabled} onClick={handleClick}>
            {provider === 'google' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.8357 7.45704C14.8032 6.47232 13.4253 5.93587 11.9997 5.95792C9.3909 5.95792 7.17528 7.71792 6.3853 10.0879C5.96643 11.3298 5.96643 12.6746 6.3853 13.9165H6.38898C7.18263 16.2828 9.39457 18.0428 12.0033 18.0428C13.35 18.0428 14.5061 17.6983 15.4021 17.0899V17.0874C16.4566 16.3893 17.1768 15.2907 17.4009 14.0488H11.9997V10.1981H21.4316C21.5492 10.8668 21.6043 11.5502 21.6043 12.23C21.6043 15.2714 20.5174 17.8428 18.6261 19.5844L18.6281 19.586C16.971 21.1145 14.6966 22 11.9997 22C8.21879 22 4.76125 19.8689 3.06372 16.4922C1.64543 13.6666 1.64543 10.3377 3.06372 7.51215C4.76125 4.13178 8.21879 2.00067 11.9997 2.00067C14.4835 1.97128 16.8828 2.90456 18.6906 4.60209L15.8357 7.45704Z" />
                </svg>
            )}

            {provider === 'facebook' && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.1742 5.32031H17V2.14062C16.6856 2.09766 15.6023 2 14.3409 2C11.7083 2 9.9053 3.65625 9.9053 6.69922V9.5H7V13.0547H9.9053V22H13.4659V13.0547H16.2538L16.697 9.5H13.4659V7.05078C13.4659 6.02344 13.7424 5.32031 15.1742 5.32031Z" />
                </svg>
            )}
        </ButtonStroke>
    )
}
