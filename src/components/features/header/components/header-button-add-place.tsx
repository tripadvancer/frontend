'use client'

import { useRouter } from 'next/navigation'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type HeaderButtonAddPlaceProps = {
    userId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const HeaderButtonAddPlace = ({ userId, isAuth, isEmailVerified }: HeaderButtonAddPlaceProps) => {
    const t = useI18n()
    const route = useRouter()
    const dialog = useDialog()

    const handleClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        if (isAuth && userId && isEmailVerified === false) {
            dialog.open(<ClaimEmailError userId={userId} />)
            return
        }

        route.push('/add-place')
    }

    return (
        <div
            className="flex-center hover-animated h-8 cursor-pointer rounded-full border border-blue-100 px-4 text-small text-blue-100 hover:border-blue-100 hover:text-blue-active"
            onClick={handleClick}
        >
            {t('common.link.add_place')}
        </div>
    )
}
