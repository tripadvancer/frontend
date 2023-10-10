import type { ICategory } from '@/types/category'
import type { CoordinatesTuple, GeoJsonPoint } from '@/types/geo'
import type { IPhoto } from '@/types/photo'
import type { IUserPreview } from '@/types/user'

export type IPlace = {
    id: number
    title: string
    description: string
    cover: string | null
    photos: IPhoto[]
    categories: ICategory[]
    countryCode: string
    author: IUserPreview
    location: GeoJsonPoint
    avgRating: number
    reviewsCount: number
    createdAt: Date
    isFavorite?: boolean
    isVisited?: boolean
}

export type IPlacePreview = Pick<IPlace, 'id' | 'title' | 'cover' | 'isFavorite' | 'isVisited'> & {
    avgRating: number
    reviewsCount: number
    coordinates?: CoordinatesTuple
}

export type IPlaceNearby = Pick<IPlace, 'id' | 'title' | 'cover'> & { distance: number }

export type CreatePlaceInputs = Pick<IPlace, 'title' | 'description' | 'cover'> & {
    location: string
    categories: number[]
    photos: string[]
}

export type UpdatePlaceInputs = Partial<CreatePlaceInputs> & { placeId: number }
