import { LngLat } from '@/utils/types/geo'

// Place in map collections, lists and search results
export type IPlacePreview = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    isVisited: boolean
    isSaved: boolean
    coordinates: number[]
}

export type ILocationPreview = {
    coordinates: LngLat
}
