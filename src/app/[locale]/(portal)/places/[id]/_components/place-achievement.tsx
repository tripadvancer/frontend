'use client'

import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { SignIn } from '@/components/features/auth/sign-in'
import { Achievement } from '@/components/ui/achievement'
import { FormSwitcher } from '@/components/ui/form-switcher'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { addPlaceToVisited, deletePlaceFromVisited } from '@/services/visited'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceAchivement = ({ id, title, isVisited }: IPlace) => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const toggleVisited = async () => {
        const doesSessionExist = await Session.doesSessionExist()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        try {
            isVisited ? await deletePlaceFromVisited(id) : await addPlaceToVisited(id)
            router.refresh()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <Achievement
            icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        d="M4 23V21H4.99264V1H6.97792V2H20.9987L18.022 7.99991L21 14H6.97792V21H7.97056V23H4ZM6.97792 12V4H17.787L15.8025 8.00009L17.7877 12H6.97792Z"
                    />
                </svg>
            }
            title={title}
        >
            <div className="flex justify-between gap-x-1">
                <div className="whitespace-nowrap">{t('place.i_was_here')}</div>
                <div className="overflow-hidden">
                    ...........................................................................................................................................................................................................
                </div>
                <FormSwitcher checked={isVisited} onChange={toggleVisited} />
            </div>
        </Achievement>
    )
}
