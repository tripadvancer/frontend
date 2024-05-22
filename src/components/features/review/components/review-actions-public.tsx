'use client'

import Session from 'supertokens-web-js/recipe/session'

import type { IReview } from '@/utils/types/review'

import { SignIn } from '@/components/features/auth/sign-in'
import { ComplainAboutReview } from '@/components/features/complain/complain-about-review'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { ComplainIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const ReviewActionsPublic = ({ id }: IReview) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = async () => {
        const doesSessionExist = await Session.doesSessionExist()
        dialog.open(doesSessionExist ? <ComplainAboutReview reviewId={id} /> : <SignIn />)
    }

    const items: DropdownItemProps[] = [
        {
            caption: t('review.user_actions.complain'),
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
