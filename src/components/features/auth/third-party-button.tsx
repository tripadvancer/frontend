'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'
import { getAuthorisationURLWithQueryParamsAndSetState } from 'supertokens-web-js/recipe/thirdpartyemailpassword'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useToast } from '@/components/providers/toast-provider'
import { FormButton } from '@/components/ui/form-button'

type ThirdPartyButtonProps = {
    provider: 'google'
    isDisabled?: boolean
}

export const ThirdPartyButton = ({ provider, isDisabled }: ThirdPartyButtonProps) => {
    const t = useTranslations()
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
                    <Image src="/images/icons/social/google.svg" width={24} height={24} alt="Google" />
                    {t('auth.signUp.thirdPartyGoogle')}
                </>
            )}
        </FormButton>
    )
}
