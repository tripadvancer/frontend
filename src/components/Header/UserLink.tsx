'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { SignInForm } from '@/components/Auth/SignInForm'
import { Avatar } from '@/components/Avatar'
import { Dropdown } from '@/components/Dropdown'
import { useAuth } from '@/hooks/useAuth'
import { useDialog } from '@/providers/DialogProvider'
import { unsetCredentials } from '@/redux/features/userSlice'
import { useAppDispatch } from '@/redux/hooks'
import { authAPI } from '@/redux/services/authAPI'
import { usersAPI } from '@/redux/services/userAPI'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { useScopedI18n } from '@/utils/i18n.client'

import { UserIcon } from './UserIcon'

export const UserLink = () => {
    const t = useScopedI18n('header')
    const tCommon = useScopedI18n('common')
    const dispatch = useAppDispatch()
    const dialog = useDialog()
    const auth = useAuth()
    const router = useRouter()
    const activeUser = usersAPI.useGetUserQuery(auth.user?.id, { skip: !auth.isAuth })

    const [signOut] = authAPI.useSignOutMutation()

    const handleSignOut = async () => {
        await signOut().unwrap()
        dispatch(unsetCredentials())
    }

    if (auth.isAuth) {
        return (
            <Dropdown
                items={[
                    {
                        caption: t('user_menu.places'),
                        value: 'places',
                        onClick: () => router.push(`/users/${activeUser.data?.id}`),
                    },
                    {
                        caption: t('user_menu.reviews'),
                        value: 'ru',
                        onClick: () => router.push(`/users/${activeUser.data?.id}/reviews`),
                    },
                    {
                        caption: t('user_menu.log_out'),
                        value: 'logout',
                        onClick: handleSignOut,
                    },
                ]}
            >
                <div className="hover-animated flex cursor-pointer gap-x-2 text-custom-blue-100 hover:text-custom-blue-active phone:gap-0">
                    <div className="phone:hidden">{activeUser.data?.name}</div>
                    <Avatar src={activeUser.data?.avatar} alt={activeUser.data?.name} size={24} />
                </div>
            </Dropdown>
        )
    }

    return (
        <div
            className="hover-animated inline-flex cursor-pointer gap-x-2 text-custom-blue-100 hover:text-custom-blue-active"
            onClick={() => dialog.open(<SignInForm />)}
        >
            <span className="phone:hidden">{tCommon('sign_in_link')}</span>
            <UserIcon />
        </div>
    )
}
