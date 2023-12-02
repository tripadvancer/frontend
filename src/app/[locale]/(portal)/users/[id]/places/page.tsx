import { getPlacesByUserId } from '@/services/places'

import { PlacesFeed } from './_components/places-feed'

export default async function UserPlacesPage({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { page: string }
}) {
    const userId = params.id
    const currentPage = searchParams.page ?? '1'
    const places = await getPlacesByUserId(userId, currentPage)

    return <PlacesFeed places={places} currentPage={parseInt(currentPage)} />
}
