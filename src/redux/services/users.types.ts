import { PaginatedResponse } from '@/utils/types/common'

export type GetPlacesByUserIdParams = {
    userId: number
    page: number
}

export type GetPlacesByUserIdResponse = PaginatedResponse<{
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    isVisited: boolean
    isSaved: boolean
    coordinates: number[]
}>
