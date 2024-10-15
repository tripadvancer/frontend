'use client'

import { useTranslations } from 'next-intl'
import Session from 'supertokens-web-js/recipe/session'
import { useMediaQuery } from 'usehooks-ts'

import { useRouter } from 'next/navigation'

import type { IUserInfo } from '@/utils/types/user'

import { Avatar } from '@/components/ui/avatar'
import { Dropdown } from '@/components/ui/dropdown'
import { PointIcon16, ReviewIcon16, SettingsIcon16, SignOutIcon16, UserIcon16 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'

export const UserMenu = ({ userInfo, avatarSize }: { userInfo: IUserInfo; avatarSize?: number }) => {
    const t = useTranslations()
    const router = useRouter()
    const toast = useToast()

    const isMobile = useMediaQuery('(max-width: 639px)')

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
                    caption: t('layout.userMenu.profile'),
                    value: 'profile',
                    icon: <UserIcon16 />,
                    onClick: () => router.push(`/users/${userInfo.name}`),
                },
                {
                    caption: t('layout.userMenu.places'),
                    value: 'places',
                    icon: <PointIcon16 />,
                    onClick: () => router.push(`/users/${userInfo.name}/places`),
                },
                {
                    caption: t('layout.userMenu.reviews'),
                    value: 'reviews',
                    icon: <ReviewIcon16 />,
                    onClick: () => router.push(`/users/${userInfo.name}/reviews`),
                },
                {
                    caption: t('layout.userMenu.settings'),
                    value: 'settings',
                    icon: <SettingsIcon16 />,
                    onClick: () => router.push(`/users/${userInfo.name}/settings`),
                },
                {
                    caption: t('layout.userMenu.logOut'),
                    value: 'logout',
                    icon: <SignOutIcon16 />,
                    isRed: true,
                    onClick: signOut,
                },
            ]}
        >
            <Avatar {...userInfo} size={avatarSize ? avatarSize : isMobile ? 24 : 32} />
        </Dropdown>
    )
}
