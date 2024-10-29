import { IReview } from '@/utils/types/common'
import { GeoJsonPoint, LngLat } from '@/utils/types/geo'

export type IPlace = {
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

export type IPlaceMeta = {
    ownReview: IReview | null
    isSaved: boolean
    isVisited: boolean
}

export type IPlacePreview = {
    id: IPlace['id']
    title: IPlace['title']
    cover: IPlace['cover']
    avgRating: IPlace['avgRating']
    reviewsCount: IPlace['reviewsCount']
    countryCode: IPlace['countryCode']
    isVisited: IPlaceMeta['isVisited']
    isSaved: IPlaceMeta['isSaved']
    coordinates: number[]
}

export type IRandomPlace = {
    id: IPlace['id']
    title: IPlace['title']
    description: IPlace['description']
    cover: IPlace['cover']
    avgRating: IPlace['avgRating']
    reviewsCount: IPlace['reviewsCount']
    countryCode: IPlace['countryCode']
    isSaved: IPlaceMeta['isSaved']
    coordinates: number[]
}

export type IPlaceNearby = {
    id: IPlace['id']
    title: IPlace['title']
    cover: IPlace['cover']
    avgRating: IPlace['avgRating']
    reviewsCount: IPlace['reviewsCount']
    distance: number
}

export type ILocationPreview = {
    coordinates: LngLat
}

export type CreatePlaceInputs = {
    title: IPlace['title']
    description: IPlace['description']
    cover: IPlace['cover']
    categories: IPlace['categories']
    location: string
    photos: string[]
}

export type UpdatePlaceInputs = {
    title: IPlace['title']
    description: IPlace['description']
    cover: IPlace['cover']
    categories: IPlace['categories']
    placeId: number
    location: string
    photos: string[]
}
