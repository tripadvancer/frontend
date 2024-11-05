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
}

export type GetPlacesByCountryCodeParams = {
    countryCode: string
    categoriesIds: string | undefined
}

export type GetPlacesByCountryCodeResponse = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    isVisited: boolean
    isSaved: boolean
    coordinates: number[]
}[]
