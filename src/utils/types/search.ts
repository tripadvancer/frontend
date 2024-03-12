import type { LngLat } from 'react-map-gl'

import type { ILocationPreview, IPlacePreview } from './place'

/**
 * Search item interface.
 * @property {string} title - Title of search item.
 * @property {string} info - Additional info of search item.
 * @property {T} properties - Properties of search item.
 */
export type ISearchItem<T> = {
    title: string
    info: string
    coordinates: LngLat
    type: 'place' | 'location'
    properties: T
}

/**
 * Response for search request.
 */
export type ISearchResult = {
    coordinates: ISearchItem<ILocationPreview>[]
    places: ISearchItem<IPlacePreview>[]
    locations: ISearchItem<ILocationPreview>[]
    users: any[]
}

/**
 * Request body for search request.
 * @property {string} query - Text to search.
 */
export type SearchInputs = {
    query: string
}
