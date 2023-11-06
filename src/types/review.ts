import type { IPhoto } from '@/types/photo'
import type { IPlace } from '@/types/place'
import type { IUserInfo } from '@/types/user'
import { ComplaintReasonsEnum } from '@/utils/enums'

export type IReview = {
    id: number
    place: Pick<IPlace, 'id' | 'title'>
    user: IUserInfo
    text: string
    rating: number
    photos: IPhoto[]
    createdAt: Date
    updatedAt: Date
}

export type CreateReviewInputs = Pick<IReview, 'text' | 'rating'> & {
    placeId: number
    photos?: string[]
}

export type UpdateReviewInputs = Partial<CreateReviewInputs> & {
    reviewId: number
}

export type ReviewComplaintInputs = {
    reviewId: number
    reason: ComplaintReasonsEnum
    text?: string
}
