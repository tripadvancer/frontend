import type { Metadata } from 'next'

import { EditPlace } from '@/components/features/place-form/edit-place'
import { getCountryByCode } from '@/services/countries'
import { getPlaceById } from '@/services/places'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)
    const countryName = country?.name['en'] ?? ''

    return {
        title: `Edit | ${place.title} | ${countryName}`,
    }
}

export default async function EditPlacePage({ params }: { params: { locale: string; id: string } }) {
    // const { session, hasToken } = await getSSRSession()

    // if (!session) {
    //     if (!hasToken) {
    //         notFound()
    //     }

    //     return <TryRefreshComponent />
    // }

    // // todo: create helper for get claim value on client and server
    // const emailVerificationClaim = await session?.getClaimValue(EmailVerificationClaim)
    // const emailIsNotVerified = emailVerificationClaim === false // because it can be undefined

    // if (emailIsNotVerified) {
    //     notFound()
    // }

    // const accessToken = session?.getAccessToken()
    // const place = await getPlaceById(params.id, accessToken)

    // return <EditPlace {...place} />
    return <EditPlace placeId={params.id} />
}
