'use client'

import { AddReview } from '@/components/features/review-form/add-review'
import { FormButton } from '@/components/ui/form-button'
import { ReviewIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useSessionValidation } from '@/utils/hooks/use-session-validation'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlaceMainAddReviewButton = ({ placeId }: { placeId: number }) => {
    const t = useI18n()
    const dialog = useDialog()
    const handleClick = useSessionValidation(() => dialog.open(<AddReview placeId={placeId} />))

    return (
        <FormButton variant="light-blue" size="small" icon={<ReviewIcon16 />} className="w-full" onClick={handleClick}>
            {t('review.user_actions.add')}
        </FormButton>
    )
}
