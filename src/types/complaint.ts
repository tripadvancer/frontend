import { ComplaintReasonsEnum } from '@/utils/enums'

export type CreatePlaceComplaintInputs = {
    placeId: number
    reason: ComplaintReasonsEnum
    text?: string
}

export type CreateReviewComplaintInputs = {
    reviewId: number
    reason: ComplaintReasonsEnum
    text?: string
}
