import { IReview, PaginatedResponse } from '@/utils/types/common'

export type GetReviewsByPlaceIdParams = {
    placeId: number
    cursor?: number
}

export type GetReviewsByUserIdParams = {
    userId: number
    cursor?: number
}

export type GetReviewsResponse = PaginatedResponse<IReview>

export type CreateReviewInputs = {
    text: string
    rating: number
    placeId: number
    userId: number
    photos: string[]
    isVisited: boolean
}

export type UpdateReviewInputs = {
    text: string
    rating: number
    reviewId: number
    placeId: number
    userId: number
    photos: string[]
    isVisited: boolean
}

export type DeleteReviewInputs = {
    reviewId: number
    placeId: number
    userId: number
}

export type CreateReviewResponse = IReview
