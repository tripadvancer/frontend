'use client'

import { MessageSquareIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { ReviewAdd } from '@/components/features/dialogs/review-form/review-add'
import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'

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
    const t = useTranslations()
    const dialog = useDialog()

    const handleClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        if (isAuth && activeUserId && isEmailVerified === false) {
            dialog.open(<ClaimEmailError />)
            return
        }

        dialog.open(<ReviewAdd placeId={placeId} userId={activeUserId as number} />)
    }

    return (
        <FormButton
            variant="light-blue"
            size="small"
            icon={<MessageSquareIcon size={16} />}
            className="w-full"
            onClick={handleClick}
        >
            {t('page.place.addReview')}
        </FormButton>
    )
}
