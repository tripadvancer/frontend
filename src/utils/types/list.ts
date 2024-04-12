import type { IPlacePreview } from './place'

export type IList = {
    id: number
    name: string
    description: string | null
    index: number
    addedAt: string
    isPublic: boolean
}

export type ISavedPlace = {
    index: number
    place: IPlacePreview
}

export type IListInfo = Pick<IList, 'id' | 'name' | 'description' | 'index' | 'addedAt' | 'isPublic'> & {
    userId: number
    places: ISavedPlace[]
}

export type CreateListInputs = Pick<IList, 'name' | 'description'>

export type UpdateListInputs = Pick<IList, 'id' | 'name' | 'description' | 'isPublic'> & {
    placesOrder: number[]
}
