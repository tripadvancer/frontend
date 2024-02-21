'use client'

import Session from 'supertokens-web-js/recipe/session'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { ReviewComplain } from '@/components/features/complain/review-complain'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { ComplainIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

type ActionsPublicProps = {
    reviewId: number
}

export const ActionsPublic = ({ reviewId }: ActionsPublicProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleComplainClick = async () => {
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

        dialog.open(hasClaims ? <ClaimEmailError userId={userId} /> : <ReviewComplain reviewId={reviewId} />)
    }

    const items: DropdownItemProps[] = [
        {
            caption: t('review.user_actions.complain'),
            value: 'complain',
            icon: <ComplainIcon16 />,
            isRed: true,
            onClick: handleComplainClick,
        },
    ]

    return <Dropdown items={items} />
}
