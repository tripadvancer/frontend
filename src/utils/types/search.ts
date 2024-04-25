import type { ICountryDict } from '@/utils/types/country'
import type { LngLat } from '@/utils/types/geo'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'

export type ISearchItem<T> = {
    title: string
    info: string
    coordinates: LngLat
    type: 'place' | 'location' | 'country'
    properties: T
}

export type ISearchResult = {
    countries: ISearchItem<ICountryDict>[]
    coordinates: ISearchItem<ILocationPreview>[]
    places: ISearchItem<IPlacePreview>[]
    locations: ISearchItem<ILocationPreview>[]
    users: any[]
}

export type SearchInputs = {
    query: string
}
