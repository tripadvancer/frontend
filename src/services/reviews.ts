import { revalidateTag } from 'next/cache'

import type { PaginatedResponse } from '@/types/common'
import type { IReview } from '@/types/review'

export async function getReviewsByPlaceId(placeId: string): Promise<PaginatedResponse<IReview>> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews?place_id=' + placeId
    const res = await fetch(url, {
        next: { tags: ['Reviews'] },
    })

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

export async function removeReviewById(reviewId: string): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews/' + reviewId
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    revalidateTag('Reviews')
}
