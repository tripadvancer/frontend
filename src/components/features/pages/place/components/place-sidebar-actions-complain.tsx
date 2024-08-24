'use client'

import { useTranslations } from 'next-intl'

import type { IPlace } from '@/utils/types/place'

import { SignIn } from '@/components/features/auth/sign-in'
import { ComplainFormPlace } from '@/components/features/dialogs/complain-form/complain-form-place'
import { ComplainIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'

export const PlaceSidebarActionsComplain = ({ place, isAuth }: { place: IPlace; isAuth: boolean }) => {
    const t = useTranslations()
    const dialog = useDialog()

    const handleClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        dialog.open(<ComplainFormPlace placeId={place.id} />)
    }

    return (
        <div className="link-red flex items-center gap-x-2 align-top" onClick={handleClick}>
            <ComplainIcon24 />
            {t('common.action.place.complain')}
        </div>
    )
}
