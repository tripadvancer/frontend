import type { ILocationPreview, IPlace, IPlaceMeta } from '@/utils/types/place'

export type IPlacePopupInfo = Pick<IPlace, 'id' | 'title' | 'cover' | 'avgRating' | 'reviewsCount'> &
    Pick<IPlaceMeta, 'isFavorite'> & {
        coordinates: number[]
    }

export type ILocationPopupInfo = ILocationPreview
