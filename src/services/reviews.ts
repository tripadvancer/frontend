import { revalidateTag } from 'next/cache'

import type { PaginatedResponse } from '@/types/common'
import type { IReview } from '@/types/review'

export async function getReviewsByPlaceId(placeId: string): Promise<PaginatedResponse<IReview>> {
    const url = process.env.API_URL + '/reviews?place_id=' + placeId
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getReviewsByUserId(userId: string, page: string): Promise<PaginatedResponse<IReview>> {
    const url = process.env.API_URL + '/reviews?user_id=' + userId + '&page=' + page
    const res = await fetch(url)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function removeReviewById(reviewId: string): Promise<void> {
    const url = process.env.API_URL + '/reviews/' + reviewId
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    revalidateTag('Reviews')
}
