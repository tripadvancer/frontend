'use client'

import Session from 'supertokens-web-js/recipe/session'

import { ClaimsError } from '@/components/auth/claims-error'
import { SignIn } from '@/components/auth/sign-in'
import { PlaceComplain } from '@/components/complain/place-complain'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type UserActionsPublicProps = {
    placeId: number
}

export const UserActionsPublic = ({ placeId }: UserActionsPublicProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleCompainClick = async () => {
        const doesSessionExist = await Session.doesSessionExist()
        const validationErrors = await Session.validateClaims()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        if (validationErrors.length > 0) {
            dialog.open(<ClaimsError />)
            return
        }

        dialog.open(<PlaceComplain placeId={placeId} />)
    }

    return (
        <ul className="flex flex-col gap-y-2 text-big-bold">
            <li onClick={handleCompainClick}>
                <span className="link-red inline-flex gap-x-2">
                    {/* prettier-ignore */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM21 12C21 16.9706 16.9706 21 12 21C9.87493 21 7.92188 20.2635 6.38219 19.0318L19.0318 6.38219C20.2635 7.92188 21 9.87493 21 12ZM4.96801 17.6176C3.73643 16.0779 3 14.125 3 12C3 7.02944 7.02944 3 12 3C14.125 3 16.0779 3.73643 17.6176 4.96801L4.96801 17.6176Z" />
                    </svg>
                    {t('place.user_actions.complain')}
                </span>
            </li>
        </ul>
    )
}
