'use client'

import type { IPlace } from '@/utils/types/place'

import { SignIn } from '@/components/features/auth/sign-in'
import { ComplainAboutPlace } from '@/components/features/complain/complain-about-place'
import { ComplainIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceSidebarActionsComplain = ({ place, isAuth }: { place: IPlace; isAuth: boolean }) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        dialog.open(<ComplainAboutPlace placeId={place.id} />)
    }

    return (
        <div className="link-red inline-flex items-center gap-x-2 align-top" onClick={handleClick}>
            <ComplainIcon24 />
            {t('place.actions.complain')}
        </div>
    )
}
