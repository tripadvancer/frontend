import type { LngLat } from 'react-map-gl/maplibre'

import type { GeoJsonPoint } from '@/utils/types/geo'
import type { IPhoto } from '@/utils/types/photo'
import type { IUserInfo } from '@/utils/types/user'

export type IPlace = {
    id: number
    title: string
    description: string
    cover: string | null
    photos: IPhoto[]
    categories: number[]
    countryCode: string
    author: IUserInfo
    location: GeoJsonPoint
    avgRating: number | null
    reviewsCount: number
    createdAt: Date
    isFavorite: boolean
    isVisited: boolean
    isReviewed: boolean
}

export type IPlacePreview = Pick<
    IPlace,
    'id' | 'title' | 'cover' | 'isFavorite' | 'isVisited' | 'avgRating' | 'reviewsCount'
> & {
    coordinates: number[]
}

export type ILocationPreview = {
    coordinates: LngLat
}

export type IPlaceNearby = Pick<IPlace, 'id' | 'title' | 'cover'> & { distance: number }

export type CreatePlaceInputs = Pick<IPlace, 'title' | 'description' | 'cover' | 'categories'> & {
    location: string
    photos: string[]
}

export type UpdatePlaceInputs = Pick<IPlace, 'title' | 'description' | 'cover' | 'categories'> & {
    placeId: number
    location: string
    photos: string[]
}
