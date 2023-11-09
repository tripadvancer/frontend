import type { ICategory } from '@/utils/types/category'
import type { CoordinatesTuple, GeoJsonPoint } from '@/utils/types/geo'
import type { IPhoto } from '@/utils/types/photo'
import type { IUserInfo } from '@/utils/types/user'

export type IPlace = {
    id: number
    title: string
    description: string
    cover: string | null
    photos: IPhoto[]
    categories: ICategory[]
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
    coordinates?: CoordinatesTuple
}

export type IPlaceNearby = Pick<IPlace, 'id' | 'title' | 'cover'> & { distance: number }

export type CreatePlaceInputs = Pick<IPlace, 'title' | 'description' | 'cover'> & {
    location: string
    categories: number[]
    photos: string[]
}

export type UpdatePlaceInputs = Partial<CreatePlaceInputs> & { placeId: number }
