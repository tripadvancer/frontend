import { PlaceReviewStatus } from '@/utils/enums'
import { GeoJsonPoint } from '@/utils/types/geo'

export type GetPlaceByIdResponse = {
    id: number
    title: string
    description: string
    cover: string | null
    photos: { id: number; url: string }[]
    categories: number[]
    countryCode: string | null
    author: {
        id: number
        name: string
        avatar: string | null
    }
    location: GeoJsonPoint
    avgRating: number | null
    reviewsCount: number
    createdAt: Date
    // Returned only to the author with the BOT role
    reviewStatus: PlaceReviewStatus | null
    reviewMessage: string | null
}

export type GetPlacesByCountryCodeResponse = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
}[]
