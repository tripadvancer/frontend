'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { SignInForm } from '@/components/Auth/SignInForm'
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
                        caption: 'Added places',
                        value: 'places',
                        onClick: () => router.push(`/user/${activeUser.data?.id}}`),
                    },
                    {
                        caption: 'Written reviews',
                        value: 'ru',
                        onClick: () => router.push(`/user/${activeUser.data?.id}}/reviews`),
                    },
                    {
                        caption: 'Log out',
                        value: 'logout',
                        onClick: handleSignOut,
                    },
                ]}
                currentItem={''}
                className="right-0 top-full"
            >
                <div className="hover-animated inline-flex cursor-pointer gap-x-2 text-custom-blue-100 hover:text-custom-blue-active">
                    <span className="phone:hidden">{activeUser.data?.name}</span>
                    {activeUser.data?.avatar ? (
                        <Image
                            src={makeImageUrl(activeUser.data.avatar, ImageVariant.AVATAR)}
                            width={24}
                            height={24}
                            className="rounded-full"
                            alt={activeUser.data?.name}
                        />
                    ) : (
                        <div className="h-6 w-6 rounded-full bg-custom-orange-100" />
                    )}
                </div>
                {/* <div
                    className="inline-flex cursor-pointer gap-x-2 text-custom-blue-100 hover-animated hover:text-custom-blue-active"
                    onClick={handleSignOut}
                >
                    Log out
                </div> */}
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
