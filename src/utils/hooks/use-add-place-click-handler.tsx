import { useRouter } from 'next/navigation'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'

type useAddPlaceClickHandlerProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const useAddPlaceClickHandler = ({ activeUserId, isAuth, isEmailVerified }: useAddPlaceClickHandlerProps) => {
    const router = useRouter()
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

        router.push('/places/add')
    }

    return handleClick
}
