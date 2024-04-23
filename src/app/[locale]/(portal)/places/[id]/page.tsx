import type { Metadata } from 'next/types'

import { Place } from '@/components/features/place/place'
import { getCountryByCode } from '@/services/countries'
import { getPlaceById } from '@/services/places'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'
import { getSSRSessionHelper } from '@/utils/supertokens/supertokens.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)
    const countryName = country?.name['en'] ?? ''

    return {
        title: `${place.title} | ${countryName}`,
        description: `Discover ${place.title} in ${countryName} with Tripadvancer. Plan your unforgettable journey now with our comprehensive travel guides and insider tips. Start your adventure today!`,
        keywords: `${place.title}, ${countryName}, travel, tourism, vacation, holiday, trip, journey, adventure, guide, tips, what to see in ${countryName}, attractions of ${countryName}, spending weekends in ${countryName}, planning a trip around ${countryName} ,tourism in ${countryName}, things to do in ${countryName}`,
        alternates: {
            canonical: `/places/${params.id}`,
        },
        openGraph: {
            title: `${place.title} | ${countryName}`,
            description: `Discover ${place.title} in ${countryName} with Tripadvancer. Plan your unforgettable journey now with our comprehensive travel guides and insider tips. Start your adventure today!`,
            images: [
                {
                    url: makeImageUrl(place.cover, ImageVariant.PUBLIC),
                    width: 1920,
                    height: 1280,
                    type: 'image/jpeg',
                    alt: place.title,
                },
            ],
            url: `/places/${params.id}`,
        },
        twitter: {
            title: `${place.title} | ${countryName}`,
            description: `Discover ${place.title} in ${countryName} with Tripadvancer. Plan your unforgettable journey now with our comprehensive travel guides and insider tips. Start your adventure today!`,
            images: makeImageUrl(place.cover, ImageVariant.PUBLIC),
        },
    }
}

export default async function PlacePage({ params }: { params: { id: string } }) {
    const { session, hasToken } = await getSSRSessionHelper()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that there is no session and no session tokens.
             */
            return <Place placeId={params.id} isAuth={false} />
        }

        /**
         * This means that the session does not exist but we have session tokens for the user. In this case
         * the `TryRefreshComponent` will try to refresh the session.
         */
        return <TryRefreshComponent />
    }

    return <Place placeId={params.id} userId={session.getAccessTokenPayload().userId} isAuth={true} />
}
