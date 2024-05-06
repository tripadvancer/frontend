import type { IPlacePreview } from './place'

export type IList = {
    id: number
    name: string
    description: string | null
    index: number
    addedAt: string
    isPublic: boolean
    listToPlace: {
        placeId: number
    }[]
    _count: {
        listToPlace: number
    }
}

export type IListInfo = Pick<IList, 'id' | 'name' | 'description' | 'index' | 'addedAt' | 'isPublic'> & {
    userId: number
}

export type CreateListInputs = Pick<IList, 'name'>

export type UpdateListInputs = Pick<IList, 'id' | 'name' | 'description' | 'isPublic'> & {
    placesOrder: number[]
}

export type UpdateListsByPlaceIdInputs = {
    placeId: number
    listIds: string[]
    newList: CreateListInputs
}
