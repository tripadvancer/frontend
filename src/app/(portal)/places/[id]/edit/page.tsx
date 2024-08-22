import type { Metadata } from 'next'
import { EmailVerificationClaim } from 'supertokens-node/recipe/emailverification'

import { notFound } from 'next/navigation'

import { PlaceEdit } from '@/components/features/pages/place-form/place-edit'
import { getCountryByCode } from '@/services/countries'
import { getPlaceById } from '@/services/places'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)
    const countryName = country?.name['en'] ?? ''

    return {
        title: `Edit | ${place.title} | ${countryName}`,
        robots: 'noindex, nofollow',
        alternates: {
            canonical: `/places/${params.id}/edit`,
        },
    }
}

export default async function EditPlacePage({ params }: { params: { id: string } }) {
    const place = await getPlaceById(params.id)
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return notFound()
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    const isEmailVerified = await session?.getClaimValue(EmailVerificationClaim)

    if (isEmailVerified === false) {
        return notFound()
    }

    if (session.getAccessTokenPayload().userId !== place.author.id) {
        return notFound()
    }

    return <PlaceEdit {...place} />
}
