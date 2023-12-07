'use client'

import { useState } from 'react'

import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { useRouter } from 'next/navigation'

import { ButtonStroke } from '@/components/forms/button-stroke/button-stroke'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type ThirdPartyFacebookProps = {
    isDisabled?: boolean
}

export const ThirdPartyFacebook = ({ isDisabled }: ThirdPartyFacebookProps) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleClick = async () => {
        setIsLoading(true)

        try {
            const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
                thirdPartyId: 'facebook',

                // This is where Google should redirect the user back after login or error.
                // This URL goes on the Google's dashboard as well.
                frontendRedirectURI: `${process.env.NEXT_PUBLIC_WEBSITE_AUTH_CALLBACK_PATH}/facebook`,
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1742 5.32031H17V2.14062C16.6856 2.09766 15.6023 2 14.3409 2C11.7083 2 9.9053 3.65625 9.9053 6.69922V9.5H7V13.0547H9.9053V22H13.4659V13.0547H16.2538L16.697 9.5H13.4659V7.05078C13.4659 6.02344 13.7424 5.32031 15.1742 5.32031Z" />
            </svg>
        </ButtonStroke>
    )
}
