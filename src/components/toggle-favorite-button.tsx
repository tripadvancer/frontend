'use client'

import { useState } from 'react'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { SignIn } from '@/components/auth/sign-in'
import { ButtonIcon } from '@/components/forms/button-icon/button-icon'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { addPlaceToFavorite, deletePlaceFromFavorite } from '@/services/favorites'
import { useI18n } from '@/utils/i18n/i18n.client'

type ToggleFavoriteButtonProps = IPlace

export const ToggleFavoriteButton = ({ id, isFavorite }: ToggleFavoriteButtonProps) => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleToggleFavorite = async () => {
        const doesSessionExist = await Session.doesSessionExist()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        try {
            setIsLoading(true)
            isFavorite ? await deletePlaceFromFavorite(id) : await addPlaceToFavorite(id)
            router.refresh()
        } catch {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <ButtonIcon isLoading={isLoading} onClick={handleToggleFavorite}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                {isFavorite ? (
                    <path d="M5 22L12 18.6049L19 22V3.94005C19 2.86859 18.1046 2 17 2H7C5.89543 2 5 2.86859 5 3.94005V22Z" />
                ) : (
                    <path d="M5 22L12 18.6049L19 22V3.94005C19 2.86859 18.1046 2 17 2H7C5.89543 2 5 2.86859 5 3.94005V22ZM12 16.4359L7 18.8609V3.94005H17V18.8609L12 16.4359Z" />
                )}
            </svg>
        </ButtonIcon>
    )
}
