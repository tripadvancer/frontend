import { IList } from '@/utils/types/common'
import { GeoJsonCollection } from '@/utils/types/geo'
import { IPlacePreview } from '@/utils/types/place'

export type GetListsResponse = IList[]

export type GetListPlaces = GeoJsonCollection<IPlacePreview>

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
