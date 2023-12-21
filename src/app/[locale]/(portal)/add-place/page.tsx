import { notFound } from 'next/navigation'

import { CreatePlaceInputs, UpdatePlaceInputs } from '@/utils/types/place'

import { PlaceForm } from '@/components/place-form/place-form'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export default async function AddPlacePage() {
    const { session, hasToken } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            notFound()
        }

        return <TryRefreshComponent />
    }

    return <PlaceForm />
}
