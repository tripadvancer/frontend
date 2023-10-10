import type { IPhoto } from '@/types/photo'
import type { IPlace } from '@/types/place'
import type { IUserPreview } from '@/types/user'

export type IReview = {
    id: number
    place: Pick<IPlace, 'id' | 'title'>
    user: IUserPreview
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
