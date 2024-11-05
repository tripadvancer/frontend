import { IList } from '@/utils/types/common'
import { GeoJsonCollection } from '@/utils/types/geo'

export type GetListsResponse = IList[]

export type GetListPlaces = GeoJsonCollection<{
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

export type CreateListInputs = {
    name: string
    description: string
}

export type UpdateListInputs = {
    id: number
    name: string
    description: string
    isPublic: boolean
}

export type UpdatePlaceInListsInputs = {
    placeId: number
    listIds: number[]
}

export type UpdateListResponse = IList
