'use client'

import Session from 'supertokens-web-js/recipe/session'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { PlaceComplain } from '@/components/features/complain/place-complain'
import { ComplainIcon24 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type UserActionsPublicProps = {
    placeId: number
}

export const PlaceSidebarUserActionsPublic = ({ placeId }: UserActionsPublicProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleCompainClick = async () => {
        const doesSessionExist = await Session.doesSessionExist()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        // todo: create helper for get claim value on client and server
        const validationErrors = await Session.validateClaims()
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const userId = accessTokenPayload.userId
        const hasClaims = validationErrors.length > 0

        dialog.open(hasClaims ? <ClaimEmailError userId={userId} /> : <PlaceComplain placeId={placeId} />)
    }

    return (
        <ul className="flex flex-col gap-y-2 text-big-bold">
            <li onClick={handleCompainClick}>
                <span className="link-red inline-flex gap-x-2">
                    <ComplainIcon24 />
                    {t('place.user_actions.complain')}
                </span>
            </li>
        </ul>
    )
}
