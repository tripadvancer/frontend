'use client'

import { useState } from 'react'

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
        } catch {
            toast.error('An unexpected error has occurred. Please try again later.')
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
                    Continue with Google
                </>
            )}
        </FormButton>
    )
}
