import { ILocationPreview, IPlace, IPlaceMeta } from '@/utils/types/place'

export type IPlacePopupInfo = {
    id: IPlace['id']
    title: IPlace['title']
    cover: IPlace['cover']
    avgRating: IPlace['avgRating']
    reviewsCount: IPlace['reviewsCount']
    isSaved: IPlaceMeta['isSaved']
    coordinates: number[]
}

export type ILocationPopupInfo = ILocationPreview
