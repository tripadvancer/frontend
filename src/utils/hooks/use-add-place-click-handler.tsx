import { useRouter } from 'next/navigation'

import { ClaimEmailError } from '@/components/features/auth/claim-email-error'
import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'

type useAddPlaceClickHandlerProps = {
    activeUserId?: number
    isAuth: boolean
    isEmailVerified?: boolean
}

export const useAddPlaceClickHandler = ({ activeUserId, isAuth, isEmailVerified }: useAddPlaceClickHandlerProps) => {
    const settings = useAppSettings()
    const router = useRouter()
    const dialog = useDialog()

    const handleClick = async () => {
        if (!settings?.switchers.add_places) {
            return
        }

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
