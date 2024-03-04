'use client'

import { useState } from 'react'

import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import { useRouter } from 'next/navigation'

import { FormButton } from '@/components/ui/form-button'
import { FacebookIcon24, GoogleIcon24 } from '@/components/ui/icons'
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
            router.push(authUrl)
        } catch (err: any) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <FormButton
            type="stroke"
            className="w-full"
            isLoading={isLoading}
            isDisabled={isDisabled}
            onClick={handleClick}
        >
            {provider === 'google' && (
                <>
                    <GoogleIcon24 />
                    Google
                </>
            )}
            {provider === 'facebook' && (
                <>
                    <FacebookIcon24 />
                    Facebook
                </>
            )}
        </FormButton>
    )
}
