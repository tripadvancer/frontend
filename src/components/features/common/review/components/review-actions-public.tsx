'use client'

import { MessageCircleWarningIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Session from 'supertokens-web-js/recipe/session'

import { SignIn } from '@/components/features/auth/sign-in'
import { ComplainFormReview } from '@/components/features/dialogs/complain-form/complain-form-review'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { useDialog } from '@/providers/dialog-provider'
import { IReview } from '@/utils/types/common'

export const ReviewActionsPublic = ({ id }: IReview) => {
    const t = useTranslations()
    const dialog = useDialog()

    const handleClick = async () => {
        const doesSessionExist = await Session.doesSessionExist()
        dialog.open(doesSessionExist ? <ComplainFormReview reviewId={id} /> : <SignIn />)
    }

    const items: DropdownItemProps[] = [
        {
            caption: t('common.action.review.complain'),
            value: 'complain',
            icon: <MessageCircleWarningIcon size={16} />,
            isRed: true,
            onClick: handleClick,
        },
    ]

    return (
        <div>
            <Dropdown items={items} />
        </div>
    )
}
