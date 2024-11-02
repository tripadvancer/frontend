import { GeoJsonCollection } from '@/utils/types/geo'

type VisitedPlace = {
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

export type GetVisitedResponse = GeoJsonCollection<VisitedPlace>
