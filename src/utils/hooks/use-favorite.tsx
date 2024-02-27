'use client'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { favoritesAPI } from '@/redux/services/favorites-api'
import { useI18n } from '@/utils/i18n/i18n.client'

interface favoriteInterface {
    isLoading: boolean
    toggle: () => void
}

export function useFavorite(id: number, isFavorite: boolean | undefined, callback?: () => void): favoriteInterface {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [addPlaceToFavorite, { isLoading: isAdding }] = favoritesAPI.useAddPlaceToFavoriteMutation()
    const [deletePlaceFromFavorite, { isLoading: isDeleting }] = favoritesAPI.useDeletePlaceFromFavoriteMutation()

    const toggle = async (): Promise<void> => {
        const doesSessionExist = await Session.doesSessionExist()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        await (isFavorite ? deletePlaceFromFavorite(id) : addPlaceToFavorite(id))
            .unwrap()
            .then(() => {
                // todo: maybe callback not needed
                callback && callback()
                router.refresh()
            })
            .catch(() => {
                toast.error(t('common.error'))
            })
    }

    return { isLoading: isAdding || isDeleting, toggle }
}
