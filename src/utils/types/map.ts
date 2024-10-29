import { ILocationPreview } from '@/utils/types/place'

export type IPlacePopupInfo = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    isSaved: boolean
    coordinates: number[]
}

export type ILocationPopupInfo = ILocationPreview
