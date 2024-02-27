'use client'

import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { ComplainIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useSessionValidation } from '@/utils/hooks/use-session-validation'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ComplainAboutReview } from '../../complain/complain-about-review'

export const ReviewActionsPublic = ({ reviewId }: { reviewId: number }) => {
    const t = useI18n()
    const dialog = useDialog()
    const handleClick = useSessionValidation(() => dialog.open(<ComplainAboutReview reviewId={reviewId} />))

    const items: DropdownItemProps[] = [
        {
            caption: t('review.user_actions.complain'),
            value: 'complain',
            icon: <ComplainIcon16 />,
            isRed: true,
            onClick: handleClick,
        },
    ]

    return <Dropdown items={items} />
}
