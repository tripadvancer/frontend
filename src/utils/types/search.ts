import { ICountryDict } from '@/utils/types/country'
import { LngLat } from '@/utils/types/geo'
import { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import { IUserPreview } from '@/utils/types/user'

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
    users: ISearchItem<IUserPreview>[]
}

export type SearchInputs = {
    query: string
}
