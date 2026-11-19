import { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { PlaceEdit } from '@/components/features/pages/place-form/place-edit'
import { getPlaceById } from '@/services/places'
import { getCountryByCode } from '@/utils/helpers/countries'
import { withAuth } from '@/utils/supertokens/with-auth'

type Params = Promise<{ id: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
    const params = await props.params
    const place = await getPlaceById(params.id)
    const country = getCountryByCode(place.countryCode)
    const countryName = country?.name ?? ''

    return {
        title: `Edit | ${place.title} | ${countryName}`,
        robots: 'noindex, nofollow',
        alternates: {
            canonical: `/places/${params.id}/edit`,
        },
    }
}

export default async function EditPlacePage(props: { params: Params }) {
    const params = await props.params
    const place = await getPlaceById(params.id)

    return withAuth({
        onUnauth: 'notFound',
        render: ({ auth }) =>
            auth.isEmailVerified === false || auth.activeUserId !== place.author.id ? (
                notFound()
            ) : (
                <PlaceEdit {...place} />
            ),
    })
}
