'use client'

import { useTranslations } from 'next-intl'

import { SignIn } from '@/components/features/auth/sign-in'
import { ComplainFormPlace } from '@/components/features/dialogs/complain-form/complain-form-place'
import { ComplainIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'

type PlaceSidebarActionsComplainProps = {
    id: number
    isAuth: boolean
}

export const PlaceSidebarActionsComplain = ({ id, isAuth }: PlaceSidebarActionsComplainProps) => {
    const t = useTranslations()
    const dialog = useDialog()

    const handleClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        dialog.open(<ComplainFormPlace placeId={id} />)
    }

    return (
        <div className="link-red flex items-center gap-x-2 align-top" onClick={handleClick}>
            <ComplainIcon24 />
            {t('common.action.place.complain')}
        </div>
    )
}
