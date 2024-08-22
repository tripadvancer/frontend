'use client'

import { useTranslations } from 'next-intl'
import Session from 'supertokens-web-js/recipe/session'

import type { IReview } from '@/utils/types/review'

import { SignIn } from '@/components/features/auth/sign-in'
import { ComplainFormReview } from '@/components/features/dialogs/complain-form/complain-form-review'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { ComplainIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'

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
            icon: <ComplainIcon16 />,
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
