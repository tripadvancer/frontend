'use client'

import { useRouter } from 'next/navigation'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetHeaderAddPlaceProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const WidgetHeaderAddPlace = ({ activeUserId, isAuth, isEmailVerified }: WidgetHeaderAddPlaceProps) => {
    const t = useI18n()
    const route = useRouter()
    const dialog = useDialog()

    const handleClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        if (isAuth && activeUserId && isEmailVerified === false) {
            dialog.open(<ClaimEmailError userId={activeUserId} />)
            return
        }

        route.push('/add-place')
    }

    return (
        <div
            className="flex-center h-6 cursor-pointer rounded-full border-2 border-black-100 px-2 text-small-bold"
            onClick={handleClick}
        >
            {t('common.link.add_place')}
        </div>
    )
}
