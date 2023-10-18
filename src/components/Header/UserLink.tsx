'use client'

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
                        icon: (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 15V9.89998C11.2822 9.43671 13 7.41896 13 5C13 2.23858 10.7614 0 8 0C5.23858 0 3 2.23858 3 5C3 7.41896 4.71776 9.43671 7 9.89998V15L8 16L9 15ZM11 5C11 6.65685 9.65685 8 8 8C6.34315 8 5 6.65685 5 5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5Z"
                                />
                            </svg>
                        ),
                        onClick: () => router.push(`/users/${activeUser.data?.id}`),
                    },
                    {
                        caption: t('user_menu.reviews'),
                        value: 'ru',
                        icon: (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 16L10.0868 12.0198H14C15.1046 12.0198 16 11.1155 16 10V2.01977C16 0.904281 15.1046 0 14 0H2C0.89543 0 0 0.904281 0 2.01977V10C0 11.1155 0.89543 12.0198 2 12.0198H4V16ZM9.5132 10L6 12.2175V10H2V2.01977H14V10H9.5132Z"
                                />
                            </svg>
                        ),
                        onClick: () => router.push(`/users/${activeUser.data?.id}/reviews`),
                    },
                    {
                        caption: t('user_menu.profile'),
                        value: 'ru',
                        icon: (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 10C9.17771 10 10 9.29839 10 7.2C10 5.95042 9.21566 5 8 5C6.73374 5 6 5.81582 6 7C6 9.26926 6.81821 10 8 10Z" />
                                <path
                                    fillRule="evenodd"
                                    d="M2.15139 13.4584C0.816779 12.029 0 10.1099 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.90796 15.3321 11.6599 14.2173 13.0348C14.2173 13.0348 14.2173 13.0348 14.2173 13.0348C14.1623 13.1026 14.1063 13.1695 14.0492 13.2354C13.6483 13.6982 13.1952 14.1145 12.6991 14.4752C11.3797 15.4343 9.75594 16 8 16C6.24407 16 4.62027 15.4343 3.30092 14.4752C2.9604 14.2276 2.64015 13.9539 2.34315 13.6569C2.2781 13.5918 2.21418 13.5257 2.15139 13.4584ZM4.50222 12.8755C5.48693 13.5832 6.6948 14 8 14C9.30521 14 10.5131 13.5832 11.4978 12.8755C10.8133 12.3277 9.94494 12 9.00001 12H7.00001C6.05508 12 5.18668 12.3277 4.50222 12.8755ZM12.9102 11.449C13.5968 10.4733 14 9.28374 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 9.28374 2.40316 10.4733 3.08978 11.449C4.13996 10.5459 5.50624 10 7.00001 10H8H9.00001C10.4938 10 11.86 10.5459 12.9102 11.449Z"
                                />
                            </svg>
                        ),
                        onClick: () => router.push(`/users/${activeUser.data?.id}/profile`),
                    },
                    {
                        caption: t('user_menu.account'),
                        value: 'ru',
                        icon: (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" />
                                <path
                                    fillRule="evenodd"
                                    d="M12.8408 14.4712L10.777 13.8963L10.1867 14.1397L9.12716 16H6.84747L5.79377 14.1334L5.20413 13.8861L3.14043 14.454L1.5287 12.8422L2.10365 10.7782L1.86017 10.1878L0 9.12742V6.84769L1.86733 5.79397L2.11453 5.20437L1.54669 3.14057L3.15781 1.52939L5.22171 2.10516L5.81143 1.86194L6.86941 0H9.14968L10.2034 1.86741L10.7929 2.11463L12.8563 1.54686L14.4699 3.15822L13.8949 5.22255L14.1382 5.81243L16 6.87046V9.15084L14.1328 10.2045L13.8854 10.7954L14.4533 12.8587L12.8408 14.4712ZM8.78891 12.5528L7.99 13.9555L7.19877 12.5538L5.34001 11.7744L3.78295 12.2028L4.21497 10.6519L3.44728 8.79039L2.04424 7.9906L3.44688 7.1991L4.22624 5.34024L3.79816 3.7844L5.34762 4.21666L7.21029 3.44842L8.00744 2.04551L8.79817 3.44691L10.6571 4.22635L12.2157 3.79746L11.7836 5.34883L12.5516 7.21123L13.9547 8.00854L12.5528 8.79961L11.7738 10.6602L12.2024 12.2172L10.6507 11.7849L8.78891 12.5528Z"
                                />
                            </svg>
                        ),
                        onClick: () => router.push(`/users/${activeUser.data?.id}/account`),
                    },
                    {
                        caption: t('user_menu.log_out'),
                        value: 'logout',
                        icon: (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9 0H7V8H9V0Z" />
                                <path d="M8 16C12.4183 16 16 12.4183 16 8C16 4.64264 13.9318 1.76831 11 0.581543V2.80267C12.7934 3.84009 14 5.77911 14 8C14 11.3137 11.3137 14 8 14C4.68628 14 2 11.3137 2 8C2 5.77911 3.2066 3.84009 5 2.80267V0.581543C2.06818 1.76831 0 4.64264 0 8C0 12.4183 3.58173 16 8 16Z" />
                            </svg>
                        ),
                        isRed: true,
                        onClick: handleSignOut,
                    },
                ]}
            >
                <div className="hover-animated text-big-bold hover:text-blue-active flex cursor-pointer gap-x-2 text-blue-100">
                    <div className="sm:block hidden">{activeUser.data?.name}</div>
                    <Avatar src={activeUser.data?.avatar} alt={activeUser.data?.name} size={24} />
                </div>
            </Dropdown>
        )
    }

    return (
        <div
            className="hover-animated hover:text-blue-active text-big-bold flex cursor-pointer items-center gap-x-2 text-blue-100"
            onClick={() => dialog.open(<SignInForm />)}
        >
            <span className="sm:block hidden">{tCommon('sign_in_link')}</span>
            <UserIcon />
        </div>
    )
}
