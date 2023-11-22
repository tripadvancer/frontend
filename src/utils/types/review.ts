import type { IPhoto } from '@/utils/types/photo'
import type { IPlace } from '@/utils/types/place'
import type { IUserInfo } from '@/utils/types/user'

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
