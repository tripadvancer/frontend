import { UserPlacesFeed } from '@/components/UserPlacesFeed/UserPlacesFeed'
import { getPlacesByUserId } from '@/services/places'

export default async function UserPlaces({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { page: string }
}) {
    const userId = params.id
    const currentPage = searchParams.page ?? '1'
    const places = await getPlacesByUserId(userId, currentPage)

    return <UserPlacesFeed places={places} currentPage={parseInt(currentPage)} />
}
