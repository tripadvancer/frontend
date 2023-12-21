import type { PaginatedResponse } from '@/utils/types/common'
import type { CreateReviewInputs, IReview, UpdateReviewInputs } from '@/utils/types/review'

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

export async function getMyReview(userId: string, placeId: string): Promise<IReview> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews?user_id=' + userId + '&place_id=' + placeId
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function createReview(body: CreateReviewInputs): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function updateReviewById({ reviewId, ...patch }: UpdateReviewInputs): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews/' + reviewId
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patch),
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function reviewPhotosUpload(file: File): Promise<{ url: string }> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/images/review-photo'
    const formData = new FormData()

    formData.append('file', file)

    const res = await fetch(url, {
        method: 'POST',
        body: formData,
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    return res.json()
}

export async function deleteReviewById(reviewId: string): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/reviews/' + reviewId
    const res = await fetch(url, {
        method: 'DELETE',
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}
