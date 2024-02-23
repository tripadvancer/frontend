'use client'

import Session from 'supertokens-web-js/recipe/session'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { AddReview } from '@/components/features/review-form/add-review'
import { FormButton } from '@/components/ui/form-button'
import { ReviewIcon16 } from '@/components/ui/icons'
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

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        // todo: create helper for get claim value on client and server
        const validationErrors = await Session.validateClaims()
        const accessTokenPayload = await Session.getAccessTokenPayloadSecurely()
        const userId = accessTokenPayload.userId
        const hasClaims = validationErrors.length > 0

        dialog.open(hasClaims ? <ClaimEmailError userId={userId} /> : <AddReview placeId={placeId} />)
    }

    return (
        <FormButton variant="lightBlue" size="small" icon={<ReviewIcon16 />} className="w-full" onClick={handleClick}>
            {t('review.user_actions.add')}
        </FormButton>
    )
}
