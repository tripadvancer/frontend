'use client'

import { useRouter } from 'next/navigation'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { favoritesAPI } from '@/redux/services/favorites-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { useSupertokens } from '../supertokens/supertokens.hooks'

interface FavoriteInterface {
    isLoading: boolean
    toggle: () => void
}

export function useFavorite(id: number, isFavorite: boolean | undefined, callback?: () => void): FavoriteInterface {
    const t = useI18n()
    const supertokens = useSupertokens()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [addPlaceToFavorite, { isLoading: isAdding }] = favoritesAPI.useAddPlaceToFavoriteMutation()
    const [deletePlaceFromFavorite, { isLoading: isDeleting }] = favoritesAPI.useDeletePlaceFromFavoriteMutation()

    const toggle = async (): Promise<void> => {
        if (!supertokens.isAuth) {
            dialog.open(<SignIn />)
            return
        }

        try {
            await (isFavorite ? deletePlaceFromFavorite(id) : addPlaceToFavorite(id))
            callback && callback()
            router.refresh()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return { isLoading: isAdding || isDeleting, toggle }
}
