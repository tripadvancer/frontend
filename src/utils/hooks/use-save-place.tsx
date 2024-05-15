'use client'

import Session from 'supertokens-web-js/recipe/session'

import { SignIn } from '@/components/features/auth/sign-in'
import { SavePlace } from '@/components/features/save-place/save-space'
import { useDialog } from '@/providers/dialog-provider'

interface useSavePlaceInterface {
    onSave: () => void
}

export function useSavePlace(placeId: number): useSavePlaceInterface {
    const dialog = useDialog()

    const onSave = async (): Promise<void> => {
        const doesSessionExist = await Session.doesSessionExist()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        dialog.open(<SavePlace placeId={placeId} />)
    }

    return { onSave }
}
