import { Categories } from '@/utils/enums'

export type PaginatedResponse<T> = {
    totalPages: number
    items: T[]
}

export type CoordinatesTuple = [number, number]

export type GeoJsonPoint = {
    type: 'Point'
    coordinates: CoordinatesTuple
}

export type ICountry = {
    countryCode: string
    placesCount: number
}

export type ICategory = {
    id: number
    name: Categories
}

export type IPhoto = {
    id: number
    url: string
}

export type IUser = {
    id: number
    name: string
    info: string
    avatar: string
    cover: string
    createdAt: Date
    updatedAt: Date
    _count: {
        places: number
        placePhotos: number
        placeReviews: number
        visitedPlaces: number
    }
}

export type IPlace = {
    id: number
    title: string
    description: string
    cover: string | null
    photos: IPhoto[]
    location: GeoJsonPoint
    countryCode: string
    categories: ICategory[]
    author: Pick<IUser, 'id' | 'name' | 'avatar'>
    reviewsCount: number
    avgRating: number
    createdAt: Date
    isFavorite: boolean
    isVisited: boolean
}

export type IPlaceNearby = Pick<IPlace, 'id' | 'title' | 'cover'> & {
    distance: number
}

export type IReview = {
    id: number
    place: Pick<IPlace, 'id' | 'title'>
    user: Pick<IUser, 'id' | 'name' | 'avatar'>
    text: string
    rating: number
    photos: IPhoto[]
    createdAt: Date
    updatedAt: Date | string | null
}
