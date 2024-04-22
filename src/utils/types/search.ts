import type { LngLat } from 'react-map-gl/maplibre'

import type { ILocationPreview, IPlacePreview } from './place'

export type ISearchItem<T> = {
    title: string
    info: string
    coordinates: LngLat
    type: 'place' | 'location'
    properties: T
}

export type ISearchResult = {
    coordinates: ISearchItem<ILocationPreview>[]
    places: ISearchItem<IPlacePreview>[]
    locations: ISearchItem<ILocationPreview>[]
    users: any[]
}

export type SearchInputs = {
    query: string
}
