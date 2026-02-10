import { LngLatBounds } from 'react-map-gl/maplibre'

import { IReview } from '@/utils/types/common'
import { GeoJsonCollection } from '@/utils/types/geo'

export type GetPlacesParams = {
    mapBounds: LngLatBounds | undefined
    selectedCategories: number[]
}

export type GetPlacesResponse = GeoJsonCollection<{
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

export type GetPlaceMetaByIdResponse = {
    ownReview: IReview | null
    isSaved: boolean
    isVisited: boolean
}

export type CreatePlaceInputs = {
    title: string
    description: string
    categories: number[]
    location: string
    photos: {
        url: string
        isCover: boolean
    }[]
    isVisited: boolean
}

export type UpdatePlaceInputs = {
    title: string
    description: string
    categories: number[]
    placeId: number
    location: string
    photos: {
        url: string
        isCover: boolean
    }[]
    isVisited: boolean
}

export type CreatePlaceResponse = {
    id: number
}

export type ImageUploadResponse = {
    url: string
}
