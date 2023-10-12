'use client'

import Image from 'next/image'
import Link from 'next/link'

import { SignInForm } from '@/components/Auth/SignInForm'
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
    const activeUser = usersAPI.useGetUserQuery(auth.user?.id, { skip: !auth.isAuth })

    const [signOut] = authAPI.useSignOutMutation()

    const handleSignOut = async () => {
        await signOut().unwrap()
        dispatch(unsetCredentials())
    }

    if (auth.isAuth) {
        return (
            <>
                <Link
                    href={`/users/${activeUser.data?.id}`}
                    className="inline-flex cursor-pointer gap-x-2 text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                >
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
                </Link>
                <div
                    className="inline-flex cursor-pointer gap-x-2 text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
                    onClick={handleSignOut}
                >
                    Log out
                </div>
            </>
        )
    }

    return (
        <div
            className="inline-flex cursor-pointer gap-x-2 text-custom-blue-100 transition-colors duration-300 ease-in-out hover:text-custom-blue-active"
            onClick={() => dialog.open(<SignInForm />)}
        >
            <span className="phone:hidden">{tCommon('sign_in_link')}</span>
            <UserIcon />
        </div>
    )
}
