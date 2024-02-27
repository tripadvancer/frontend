'use client'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { Dropdown } from '@/components/ui/dropdown'
import { PointIcon16, ReviewIcon16, SettingsIcon16, SignOutIcon16 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type UserMenuProps = {
    children: React.ReactNode
    userId: number
}

export const HeaderUserMenu = ({ children, userId }: UserMenuProps) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()

    const signOut = async () => {
        try {
            await Session.signOut()
            router.push('/')
            router.refresh()
        } catch (err) {
            toast.error(t('common.error'))
        }
    }

    return (
        <Dropdown
            items={[
                {
                    caption: t('header.user_menu.places'),
                    value: 'places',
                    icon: <PointIcon16 />,
                    onClick: () => router.push(`/users/${userId}/places`),
                },
                {
                    caption: t('header.user_menu.reviews'),
                    value: 'reviews',
                    icon: <ReviewIcon16 />,
                    onClick: () => router.push(`/users/${userId}/reviews`),
                },
                {
                    caption: t('header.user_menu.settings'),
                    value: 'settings',
                    icon: <SettingsIcon16 />,
                    onClick: () => router.push(`/users/${userId}/settings`),
                },
                {
                    caption: t('header.user_menu.log_out'),
                    value: 'logout',
                    icon: <SignOutIcon16 />,
                    isRed: true,
                    onClick: signOut,
                },
            ]}
        >
            {children}
        </Dropdown>
    )
}
