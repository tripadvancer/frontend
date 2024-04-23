import type { IPhoto } from '@/utils/types/photo'
import type { IPlace } from '@/utils/types/place'
import type { IUserInfo } from '@/utils/types/user'

export type IReview = {
    id: number
    place: Pick<IPlace, 'id' | 'title' | 'countryCode'>
    user: IUserInfo
    text: string
    rating: number
    photos: IPhoto[]
    createdAt: Date
    updatedAt: Date
}

export type CreateReviewInputs = Pick<IReview, 'text' | 'rating'> & {
    placeId: number
    userId: number
    photos: string[]
}

export type UpdateReviewInputs = Pick<IReview, 'text' | 'rating'> & {
    reviewId: number
    placeId: number
    userId: number
    photos: string[]
}

export type DeleteReviewInputs = {
    reviewId: number
    placeId: number
    userId: number
}
