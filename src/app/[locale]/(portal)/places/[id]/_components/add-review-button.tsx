'use client'

import Session from 'supertokens-web-js/recipe/session'

import { ClaimEmailError } from '@/components/auth/claim-email-error'
import { SignIn } from '@/components/auth/sign-in'
import { ButtonMinor } from '@/components/forms/button-minor/button-minor'
import { AddReview } from '@/components/review-form/add-review'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type AddReviewButtonProps = {
    placeId: number
    isDisabled?: boolean
}

export const AddReviewButton = ({ placeId, isDisabled }: AddReviewButtonProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = async () => {
        const doesSessionExist = await Session.doesSessionExist()
        const validationErrors = await Session.validateClaims()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        if (validationErrors.length > 0) {
            dialog.open(<ClaimEmailError />)
            return
        }

        dialog.open(<AddReview placeId={placeId} />)
    }

    return (
        <ButtonMinor className="w-full rounded-lg" isDisabled={isDisabled} onClick={handleClick}>
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
