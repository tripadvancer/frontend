'use client'

import { Confirmation } from '@/components/confirmation'
import { useDialog } from '@/providers/dialog-provider'
import { useScopedI18n } from '@/utils/i18n.client'

type UserSettingGDPRActionsProps = {
    userId: number
}

export const UserSettingGDPRActions = ({ userId }: UserSettingGDPRActionsProps) => {
    const t = useScopedI18n('pages.user.settings')
    const dialog = useDialog()

    const handleGetCopyOfData = () => {
        dialog.open(
            <Confirmation
                title={t('gdpr.get_copy_data.confirm.title')}
                message={t('gdpr.get_copy_data.confirm.message')}
                onConfirm={() => alert('Do not implemented yet')}
            />,
        )
    }

    const handleRemoveAccount = () => {
        dialog.open(
            <Confirmation
                variant="red"
                title={t('gdpr.remove_account.confirm.title')}
                message={t('gdpr.remove_account.confirm.message')}
                onConfirm={() => alert('Do not implemented yet')}
            />,
        )
    }

    return (
        <div className="inline-flex cursor-pointer flex-col gap-y-2">
            <div
                className="hover-animated flex items-center gap-x-2 text-big-bold text-blue-100 hover:text-blue-active"
                onClick={handleGetCopyOfData}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 17V15H14V17H8Z" fill="#1890FF" />
                    <path d="M8 11V13H16V11H8Z" fill="#1890FF" />
                    <path
                        fillRule="evenodd"
                        d="M5 1H15.4142L21 6.58579V21C21 22.1046 20.1046 23 19 23H5C3.89543 23 3 22.1046 3 21V3C3 1.89543 3.89543 1 5 1ZM13 3H5V21H19V9H15C13.8954 9 13 8.10457 13 7V3ZM15 3.41421V7H18.5858L15 3.41421Z"
                    />
                </svg>
                {t('gdpr.get_copy_data')}
            </div>
            <div
                className="hover-animated flex gap-x-2 text-big-bold text-red-100 hover:text-blue-active"
                onClick={handleRemoveAccount}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M9 1H15C16.1046 1 17 1.89543 17 3V4H20C21.1046 4 22 4.89543 22 6V8C22 9.10457 21.1046 10 20 10H19.9199L19 21C19 22.1046 18.1046 23 17 23H7C5.89543 23 5 22.1046 5.00345 21.083L4.07987 10H4C2.89543 10 2 9.10457 2 8V6C2 4.89543 2.89543 4 4 4H7V3C7 1.89543 7.89543 1 9 1ZM4 6H20V8H4V6ZM6.08649 10H17.9132L17.0035 20.917L17 21H7L6.08649 10ZM15 3V4H9V3H15Z"
                    />
                </svg>
                {t('gdpr.remove_account')}
            </div>
        </div>
    )
}
