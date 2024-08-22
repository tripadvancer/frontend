'use client'

import { useTranslations } from 'next-intl'
import Session from 'supertokens-web-js/recipe/session'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { PointIcon24, ReviewIcon24, SettingsIcon24, SignOutIcon24 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'

export const WidgetHeaderUserMenu = ({ userId }: { userId: number }) => {
    const t = useTranslations()
    const router = useRouter()
    const toast = useToast()
    const widgetState = useAppSelector(getWidgetState)

    const signOut = async () => {
        try {
            await Session.signOut()
            router.refresh()
        } catch (err) {
            toast.error(t('common.error'))
        }
    }

    if (widgetState.isMenuOpened) {
        return (
            <nav className="flex flex-col items-end gap-y-4 px-4 pb-8 pt-4 text-big-bold sm:px-8 sm:pt-0">
                <Link href={`users/${userId}/places`} className="flex items-center gap-x-2">
                    {t('layout.userMenu.places')}
                    <PointIcon24 />
                </Link>

                <Link href={`users/${userId}/reviews`} className="flex items-center gap-x-2">
                    {t('layout.userMenu.reviews')}
                    <ReviewIcon24 />
                </Link>

                <Link href={`users/${userId}/settings`} className="flex items-center gap-x-2">
                    {t('layout.userMenu.settings')}
                    <SettingsIcon24 />
                </Link>

                <span className="link-red flex items-center gap-x-2" onClick={signOut}>
                    {t('layout.userMenu.logOut')}
                    <SignOutIcon24 />
                </span>
            </nav>
        )
    }

    return null
}
