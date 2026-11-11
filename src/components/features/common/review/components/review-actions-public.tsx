'use client'

import { MessageCircleWarningIcon } from 'lucide-react'
import Session from 'supertokens-web-js/recipe/session'

import { SignIn } from '@/components/features/auth/sign-in'
import { ComplainFormReview } from '@/components/features/dialogs/complain-form/complain-form-review'
import { useDialog } from '@/components/providers/dialog-provider'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { IReview } from '@/utils/types/common'

export const ReviewActionsPublic = ({ id }: IReview) => {
    const dialog = useDialog()

    const handleClick = async () => {
        const doesSessionExist = await Session.doesSessionExist()
        dialog.open(doesSessionExist ? <ComplainFormReview reviewId={id} /> : <SignIn />)
    }

    const items: DropdownItemProps[] = [
        {
            caption: 'Complain',
            value: 'complain',
            icon: <MessageCircleWarningIcon size={16} />,
            isRed: true,
            onClick: handleClick,
        },
    ]

    return <Dropdown items={items} />
}
