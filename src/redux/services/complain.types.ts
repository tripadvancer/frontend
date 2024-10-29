import { ComplaintReasonsEnum } from '@/utils/enums'

export type PlaceComplaintInputs = {
    placeId: number
    reason: ComplaintReasonsEnum
    text: string
}

export type ReviewComplaintInputs = {
    reviewId: number
    reason: ComplaintReasonsEnum
    text: string
}
