import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'

import { PlaceAdd } from '@/components/features/pages/place-form/place-add'
import { withAuth } from '@/utils/supertokens/with-auth'

export const metadata: Metadata = {
    title: 'Add Place',
    robots: 'noindex, nofollow',
    alternates: {
        canonical: '/places/add',
    },
}

export default async function AddPlacePage() {
    return withAuth({
        onUnauth: 'notFound',
        render: ({ auth }) => (auth.isEmailVerified === false ? notFound() : <PlaceAdd />),
    })
}
