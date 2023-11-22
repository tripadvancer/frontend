import { PlaceComplaintInputs, ReviewComplaintInputs } from '@/utils/types/complaint'

export async function placeComplaint({ placeId, reason, text }: PlaceComplaintInputs): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_URL + '/places/' + placeId + '/complaints'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason, text }),
    })

    if (!res.ok) {
        if (res.status === 409) {
            throw new Error('You have already complained about this place')
        }
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
            throw new Error('You have already complained about this review')
        }
        throw new Error('Failed to fetch data')
    }
}
