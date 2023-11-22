'use client'

import Session from 'supertokens-web-js/recipe/session'

import { SignIn } from '@/components/auth/sign-in'
import { ButtonMinor } from '@/components/forms/button-minor/button-minor'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type AddReviewButtonProps = {
    placeId: number
}

export const AddReviewButton = ({ placeId }: AddReviewButtonProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = async () => {
        if (await Session.doesSessionExist()) {
            dialog.open(<div>Add review for place {placeId}</div>)
        } else {
            dialog.open(<SignIn />)
        }
    }

    return (
        <ButtonMinor className="mb-8 w-full rounded-lg" onClick={handleClick}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M4 16L10.0868 12.0198H14C15.1046 12.0198 16 11.1155 16 10V2.01977C16 0.904281 15.1046 0 14 0H2C0.89543 0 0 0.904281 0 2.01977V10C0 11.1155 0.89543 12.0198 2 12.0198H4V16ZM9.5132 10L6 12.2175V10H2V2.01977H14V10H9.5132Z"
                />
            </svg>
            {t('review.user_actions.add')}
        </ButtonMinor>
    )
}
