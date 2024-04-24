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

export const PlaceMainAddReviewButton = ({ placeId }: { placeId: number }) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = async () => {
        const doesSessionExist = await Session.doesSessionExist()

        if (doesSessionExist) {
            const isVerified = await Session.getClaimValue({ claim: EmailVerificationClaim })
            const userId = await Session.getAccessTokenPayloadSecurely().then(payload => payload.userId)
            dialog.open(
                isVerified ? (
                    <ReviewAdd placeId={placeId} userId={userId} />
                ) : (
                    <ClaimEmailError userId={userId as number} />
                ),
            )
            return
        }

        dialog.open(<SignIn />)
    }

    return (
        <FormButton variant="light-blue" size="small" icon={<ReviewIcon16 />} className="w-full" onClick={handleClick}>
            {t('review.user_actions.add')}
        </FormButton>
    )
}
