import type { PaginatedResponse } from '@/utils/types/common'
import type { IReview } from '@/utils/types/review'

export async function getReviewsByPlaceId(placeId: string, page: string): Promise<PaginatedResponse<IReview>> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews?place_id=' + placeId + '&page=' + page
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function getReviewsByUserId(userId: string, page: string): Promise<PaginatedResponse<IReview>> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews?user_id=' + userId + '&page=' + page
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}
