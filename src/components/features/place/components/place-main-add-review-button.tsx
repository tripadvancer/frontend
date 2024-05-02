'use client'

import { EmailVerificationClaim } from 'supertokens-web-js/recipe/emailverification'
import Session from 'supertokens-web-js/recipe/session'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { ReviewAdd } from '@/components/features/review-form/review-add'
import { FormButton } from '@/components/ui/form-button'
import { ReviewIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type PlaceMainAddReviewButtonProps = {
    placeId: number
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const PlaceMainAddReviewButton = ({
    placeId,
    activeUserId,
    isAuth,
    isEmailVerified,
}: PlaceMainAddReviewButtonProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        if (isAuth && activeUserId && isEmailVerified === false) {
            dialog.open(<ClaimEmailError userId={activeUserId} />)
            return
        }

        dialog.open(<ReviewAdd placeId={placeId} userId={activeUserId as number} />)
    }

    return (
        <FormButton variant="light-blue" size="small" icon={<ReviewIcon16 />} className="w-full" onClick={handleClick}>
            {t('review.user_actions.add')}
        </FormButton>
    )
}
