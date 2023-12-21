'use client'

import { ChangeEmail } from '@/components/auth/change-email'
import { ChangePassword } from '@/components/auth/change-password'
import { Confirmation } from '@/components/confirmation'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { requestPersonalData, requestUserRemoval } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

type SettingGDPRProps = {
    userId: number
}

export const SettingAccount = ({ userId }: SettingGDPRProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const toast = useToast()

    const handleChangePassword = () => {
        dialog.open(<ChangePassword />)
    }

    const handleChangeEmail = () => {
        dialog.open(<ChangeEmail />)
    }

    const handleRequestPersonalData = () => {
        dialog.open(
            <Confirmation
                title={t('confirm.request_personal_data.title')}
                message={t('confirm.request_personal_data.message')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await requestPersonalData()
                        toast.success(t('success.request_personal_data'))
                    } catch {
                        toast.error(t('common.error'))
                    }
                }}
            />,
        )
    }

    const handleRequestUserRemoval = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('confirm.request_user_removal.title')}
                message={t('confirm.request_user_removal.message')}
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await requestUserRemoval()
                        toast.success(t('success.request_user_removal'))
                    } catch {
                        toast.error(t('common.error'))
                    }
                }}
            />,
        )
    }

    return (
        <ul className="flex flex-col gap-y-2 text-big-bold">
            <li className="flex">
                <span className="link inline-flex gap-x-2" onClick={handleChangePassword}>
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.4374 2C17.0921 2 17.7197 2.26142 18.1781 2.72342L21.279 5.82432C21.7407 6.286 22.0001 6.91217 22.0001 7.56508C22.0001 8.21799 21.7407 8.84416 21.279 9.30584L9.95751 20.6238C9.25902 21.4295 8.2689 21.9245 7.1346 22.0023H2L2.00325 16.7873C2.08844 15.7328 2.57867 14.7523 3.3265 14.0934L14.6954 2.72463C15.1564 2.26083 15.7834 2 16.4374 2ZM7.06398 20.0048C7.59821 19.967 8.09549 19.7184 8.49479 19.2616L16.0567 11.6997L12.3023 7.94519L4.6961 15.5496C4.29095 15.9079 4.04031 16.4092 4 16.8678V20.0029L7.06398 20.0048ZM13.7167 6.53115L17.4709 10.2855L19.8648 7.89162C19.9514 7.80502 20.0001 7.68756 20.0001 7.56508C20.0001 7.4426 19.9514 7.32514 19.8648 7.23854L16.7611 4.13486C16.6755 4.04855 16.5589 4 16.4374 4C16.3158 4 16.1992 4.04855 16.1136 4.13486L13.7167 6.53115Z" fill="#1890FF"/>
                    </svg>
                    {t('pages.user.settings.account.change_password')}
                </span>
            </li>
            <li className="flex">
                <span className="link inline-flex gap-x-2" onClick={handleChangeEmail}>
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.4374 2C17.0921 2 17.7197 2.26142 18.1781 2.72342L21.279 5.82432C21.7407 6.286 22.0001 6.91217 22.0001 7.56508C22.0001 8.21799 21.7407 8.84416 21.279 9.30584L9.95751 20.6238C9.25902 21.4295 8.2689 21.9245 7.1346 22.0023H2L2.00325 16.7873C2.08844 15.7328 2.57867 14.7523 3.3265 14.0934L14.6954 2.72463C15.1564 2.26083 15.7834 2 16.4374 2ZM7.06398 20.0048C7.59821 19.967 8.09549 19.7184 8.49479 19.2616L16.0567 11.6997L12.3023 7.94519L4.6961 15.5496C4.29095 15.9079 4.04031 16.4092 4 16.8678V20.0029L7.06398 20.0048ZM13.7167 6.53115L17.4709 10.2855L19.8648 7.89162C19.9514 7.80502 20.0001 7.68756 20.0001 7.56508C20.0001 7.4426 19.9514 7.32514 19.8648 7.23854L16.7611 4.13486C16.6755 4.04855 16.5589 4 16.4374 4C16.3158 4 16.1992 4.04855 16.1136 4.13486L13.7167 6.53115Z" fill="#1890FF"/>
                    </svg>
                    {t('pages.user.settings.account.change_email')}
                </span>
            </li>
            <li className="flex">
                <span className="link inline-flex gap-x-2" onClick={handleRequestPersonalData}>
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 17V15H14V17H8Z" />
                        <path d="M8 11V13H16V11H8Z" />
                        <path fillRule="evenodd" d="M5 1H15.4142L21 6.58579V21C21 22.1046 20.1046 23 19 23H5C3.89543 23 3 22.1046 3 21V3C3 1.89543 3.89543 1 5 1ZM13 3H5V21H19V9H15C13.8954 9 13 8.10457 13 7V3ZM15 3.41421V7H18.5858L15 3.41421Z" />
                    </svg>
                    {t('pages.user.settings.account.request_personal_data')}
                </span>
            </li>
            <li className="flex">
                <span className="link-red inline-flex gap-x-2" onClick={handleRequestUserRemoval}>
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M9 1H15C16.1046 1 17 1.89543 17 3V4H20C21.1046 4 22 4.89543 22 6V8C22 9.10457 21.1046 10 20 10H19.9199L19 21C19 22.1046 18.1046 23 17 23H7C5.89543 23 5 22.1046 5.00345 21.083L4.07987 10H4C2.89543 10 2 9.10457 2 8V6C2 4.89543 2.89543 4 4 4H7V3C7 1.89543 7.89543 1 9 1ZM4 6H20V8H4V6ZM6.08649 10H17.9132L17.0035 20.917L17 21H7L6.08649 10ZM15 3V4H9V3H15Z" />
                    </svg>
                    {t('pages.user.settings.account.request_user_removal')}
                </span>
            </li>
        </ul>
    )
}
