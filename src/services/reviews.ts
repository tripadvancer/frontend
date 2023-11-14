import type { PaginatedResponse } from '@/utils/types/common'
import type { IReview, ReviewComplaintInputs } from '@/utils/types/review'

export async function getReviewsByPlaceId(placeId: string, page: string): Promise<PaginatedResponse<IReview>> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews?place_id=' + placeId + '&page=' + page
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getReviewsByUserId(userId: string, page: string): Promise<PaginatedResponse<IReview>> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews?user_id=' + userId + '&page=' + page
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
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
        throw new Error('Failed to fetch data')
    }
}

export async function reviewComplaint({ reviewId, reason, text }: ReviewComplaintInputs): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews/' + reviewId + '/complaints'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason, text }),
    })

    if (!res.ok) {
        if (res.status === 409) {
            console.log(res)
            throw new Error('You have already complained about this review')
        }
        throw new Error('Failed to fetch data')
    }
}
