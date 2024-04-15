import type { GeoJsonPoint } from '@/utils/types/geo'
import type { IPhoto } from '@/utils/types/photo'
import type { IReview } from '@/utils/types/review'
import type { IUserInfo } from '@/utils/types/user'

export type IPlace = {
    id: number
    title: string
    description: string
    cover: string | null
    photos: IPhoto[]
    categories: number[]
    countryCode: string | null
    author: IUserInfo
    location: GeoJsonPoint
    avgRating: number | null
    reviewsCount: number
    createdAt: Date
}

export type IPlaceMeta = {
    ownReview: IReview | null
    isFavorite: boolean
    isVisited: boolean
}

// prettier-ignore
export type IPlacePreview = Pick<IPlace, 'id' | 'title' | 'cover' | 'avgRating' | 'reviewsCount' | 'countryCode'> & Pick<IPlaceMeta, 'isFavorite' | 'isVisited'> & {
    coordinates: number[]
}

// prettier-ignore
export type IRandomPlace = Pick<IPlace, 'id' | 'title' | 'description' | 'cover' | 'avgRating' | 'reviewsCount' | 'countryCode'> & Pick<IPlaceMeta, 'isFavorite'> & {
    coordinates: number[]
}

export type IPlaceNearby = Pick<IPlace, 'id' | 'title' | 'cover' | 'avgRating' | 'reviewsCount'> & { distance: number }

export type ILocationPreview = {
    coordinates: number[]
}

export type CreatePlaceInputs = Pick<IPlace, 'title' | 'description' | 'cover' | 'categories'> & {
    location: string
    photos: string[]
}

export type UpdatePlaceInputs = Pick<IPlace, 'title' | 'description' | 'cover' | 'categories'> & {
    placeId: number
    location: string
    photos: string[]
}
