'use client'

import Session from 'supertokens-web-js/recipe/session'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { PointIcon24, ReviewIcon24, SettingsIcon24, SignOutIcon24 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'
import { getWidgetIsMenuOpened, toggleWidgetMenu } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

export const WidgetHeaderUserMenu = () => {
    const t = useI18n()
    const supertokens = useSupertokens()
    const router = useRouter()
    const toast = useToast()
    const dispatch = useAppDispatch()
    const isMenuOpened = useAppSelector(getWidgetIsMenuOpened)

    const signOut = async () => {
        try {
            await Session.signOut()
            dispatch(toggleWidgetMenu())
            router.refresh()
        } catch (err) {
            toast.error(t('common.error'))
        }
    }

    if (supertokens.isAuth && isMenuOpened) {
        return (
            <nav className="flex flex-col items-end gap-y-4 px-4 pb-8 pt-4 text-big-bold sm:px-8 sm:pt-0">
                <Link href={`users/${supertokens.activeUserId}/places`} className="flex items-center gap-x-2">
                    {t('header.user_menu.places')}
                    <PointIcon24 />
                </Link>

                <Link href={`users/${supertokens.activeUserId}/reviews`} className="flex items-center gap-x-2">
                    {t('header.user_menu.reviews')}
                    <ReviewIcon24 />
                </Link>

                <Link href={`users/${supertokens.activeUserId}/settings`} className="flex items-center gap-x-2">
                    {t('header.user_menu.settings')}
                    <SettingsIcon24 />
                </Link>

                <span className="link-red flex items-center gap-x-2" onClick={signOut}>
                    {t('header.user_menu.log_out')}
                    <SignOutIcon24 />
                </span>
            </nav>
        )
    }

    return null
}
