'use client'

import { useRouter } from 'next/navigation'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'

type LandingFeaturesVisitedMapButtonProps = {
    username?: string
    isAuth: boolean
}

export const LandingFeaturesVisitedMapButton = ({ username, isAuth }: LandingFeaturesVisitedMapButtonProps) => {
    const router = useRouter()
    const dialog = useDialog()

    const handleClick = async () => {
        if (!isAuth) {
            dialog.open(<SignIn />)
            return
        }

        router.push(`/users/${username?.toLowerCase()}`)
    }

    return (
        <FormButton variant="orange" onClick={handleClick}>
            View Your Map
        </FormButton>
    )
}
