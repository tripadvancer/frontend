import { LngLatBounds } from 'react-map-gl/maplibre'

import { PlaceReviewStatus } from '@/utils/enums'
import { IReview } from '@/utils/types/common'
import { GeoJsonCollection } from '@/utils/types/geo'
import { IPlacePreview } from '@/utils/types/place'

export type GetPlacesParams = {
    mapBounds: LngLatBounds | undefined
    selectedCategories: number[]
}

export type GetPlacesResponse = GeoJsonCollection<IPlacePreview>

export type GetPlaceMetaByIdResponse = {
    ownReview: IReview | null
    isSaved: boolean
    isVisited: boolean
}

export type CreatePlaceInputs = {
    title: string
    description: string
    categories: number[]
    location: string
    photos: {
        url: string
        isCover: boolean
    }[]
    isVisited: boolean
}

export type UpdatePlaceInputs = CreatePlaceInputs & {
    placeId: number
}

export type CreatePlaceResponse = {
    id: number
    countryCode: string | null
}

export type UpdatePlaceResponse = CreatePlaceResponse

export type UpdateReviewStatusInputs = {
    placeId: number
    reviewStatus: PlaceReviewStatus
    reviewMessage: string
}

export type UpdateReviewStatusResponse = {
    reviewStatus: PlaceReviewStatus
    reviewMessage: string | null
}

export type ImageUploadResponse = {
    url: string
}
