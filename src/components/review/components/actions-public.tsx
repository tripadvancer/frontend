'use client'

import Session from 'supertokens-web-js/recipe/session'

import { SignIn } from '@/components/auth/sign-in'
import { ReviewComplain } from '@/components/complain/review-complain'
import { Dropdown, DropdownItemProps } from '@/components/dropdown'
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
        dialog.open(doesSessionExist ? <ReviewComplain reviewId={reviewId} /> : <SignIn />)
    }

    const items: DropdownItemProps[] = [
        {
            caption: t('review.user_actions.complain'),
            value: 'complain',
            // prettier-ignore
            icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8ZM14 8C14 11.3137 11.3137 14 8 14C6.7042 14 5.50434 13.5892 4.52354 12.8908L12.8908 4.52354C13.5892 5.50434 14 6.7042 14 8ZM3.1093 11.4766L11.4766 3.1093C10.4958 2.41081 9.29586 2 8 2C4.68629 2 2 4.68629 2 8C2 9.29586 2.41081 10.4958 3.1093 11.4766Z" />
                </svg>
            ),
            isRed: true,
            onClick: handleComplainClick,
        },
    ]

    return <Dropdown items={items} />
}
