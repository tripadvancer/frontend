'use client'

import { ComplainIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useSessionValidation } from '@/utils/hooks/use-session-validation'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ComplainAboutPlace } from '../../complain/complain-about-place'

type UserActionsPublicProps = {
    placeId: number
}

export const PlaceSidebarUserActionsPublic = ({ placeId }: UserActionsPublicProps) => {
    const t = useI18n()
    const dialog = useDialog()
    const handleClick = useSessionValidation(() => dialog.open(<ComplainAboutPlace placeId={placeId} />))

    return (
        <ul className="flex flex-col gap-y-2 text-big-bold">
            <li onClick={handleClick}>
                <span className="link-red inline-flex gap-x-2">
                    <ComplainIcon24 />
                    {t('place.user_actions.complain')}
                </span>
            </li>
        </ul>
    )
}
