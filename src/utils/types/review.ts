import type { IPhoto } from '@/utils/types/photo'
import type { IPlace } from '@/utils/types/place'
import type { IUserInfo } from '@/utils/types/user'

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

export type AddReviewInputs = Pick<IReview, 'text' | 'rating'> & {
    placeId: number
    photos: string[]
}

export type EditReviewInputs = Pick<IReview, 'text' | 'rating'> & {
    reviewId: number
    placeId: number
    photos: string[]
}

export type DeleteReviewInputs = {
    reviewId: number
    placeId: number
}
