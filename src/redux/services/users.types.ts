import { PaginatedResponse } from '@/utils/types/common'

export type GetPlacesByUserIdParams = {
    userId: number
    page: number
}

export type GetPlacesByUserIdResponse = PaginatedResponse<{
    id: number
    title: string
    cover: string | null
    coordinates: [number, number]
    countryCode: string | null
    isSaved: boolean
    isVisited: boolean
    createdAt: Date
}>
