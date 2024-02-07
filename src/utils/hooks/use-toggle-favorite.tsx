'use client'

import { useState } from 'react'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { addPlaceToFavorite, deletePlaceFromFavorite } from '@/services/favorites'
import { useI18n } from '@/utils/i18n/i18n.client'

interface toggleFavoriteInterface {
    isLoading: boolean
    toggleFavorite: () => void
}

export function useToggleFavorite(id: number, isFavorite: boolean): toggleFavoriteInterface {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const toggleFavorite = async () => {
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

    return { isLoading, toggleFavorite }
}
