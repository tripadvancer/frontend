import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { notFound } from 'next/navigation'

import { EditPlace } from '@/components/features/place-form/edit-place'
import { getPlaceById } from '@/services/places'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export default async function EditPlacePage({ params }: { params: { locale: string; id: string } }) {
    const { session, hasToken } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            notFound()
        }

        return <TryRefreshComponent />
    }

    // todo: create helper for get claim value on client and server
    const emailVerificationClaim = await session?.getClaimValue(EmailVerificationClaim)
    const emailIsNotVerified = emailVerificationClaim === false // because it can be undefined

    if (emailIsNotVerified) {
        notFound()
    }

    const accessToken = session?.getAccessToken()
    const place = await getPlaceById(params.id, accessToken)

    return <EditPlace {...place} />
}
