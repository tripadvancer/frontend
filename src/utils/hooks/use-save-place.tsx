'use client'

import Session from 'supertokens-web-js/recipe/session'

import { SignIn } from '@/components/features/auth/sign-in'
import { SavePlace } from '@/components/features/save-space/save-space'
import { useDialog } from '@/providers/dialog-provider'

interface useSavePlaceInterface {
    toggle: () => void
}

export function useSavePlace(placeId: number, callback?: () => void): useSavePlaceInterface {
    const dialog = useDialog()

    const toggle = async (): Promise<void> => {
        const doesSessionExist = await Session.doesSessionExist()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        dialog.open(<SavePlace placeId={placeId} />)
        callback?.()
    }

    return { toggle }
}
