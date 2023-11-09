import { ComplaintReasonsEnum } from '@/utils/enums'

export type CreatePlaceComplaintInputs = {
    placeId: number
    reason: ComplaintReasonsEnum
    text?: string
}
