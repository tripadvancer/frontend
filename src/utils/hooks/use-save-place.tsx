'use client'

import Session from 'supertokens-web-js/recipe/session'

import { SignIn } from '@/components/features/auth/sign-in'
import { SavePlace } from '@/components/features/dialogs/save-place/save-space'
import { useDialog } from '@/components/providers/dialog-provider'
import { waitForSuperTokensInitialization } from '@/utils/supertokens/supertokens.initialization'

interface useSavePlaceInterface {
    savePlace: () => void
}

export function useSavePlace(placeId: number): useSavePlaceInterface {
    const dialog = useDialog()

    const savePlace = async (): Promise<void> => {
        await waitForSuperTokensInitialization()
        const doesSessionExist = await Session.doesSessionExist()

        if (!doesSessionExist) {
            dialog.open(<SignIn />)
            return
        }

        dialog.open(<SavePlace placeId={placeId} />)
    }

    return { savePlace }
}
