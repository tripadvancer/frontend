import { PaginatedResponse, IReview } from '@/utils/interfaces'

export async function getReviewsByPlaceId(placeId: string): Promise<PaginatedResponse<IReview>> {
    const url = process.env.API_URL + '/reviews?place_id=' + placeId
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}
