export type IList = {
    id: number
    name: string
    description: string
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

export type IListPreview = Pick<IList, 'id' | 'name' | 'index' | 'isPublic' | 'listToPlace' | '_count'>

export type IListInfo = Pick<IList, 'id' | 'name' | 'description' | 'index' | 'addedAt' | 'isPublic'> & {
    userId: number
}

export type CreateListInputs = Pick<IList, 'name'>

export type UpdateListInputs = Pick<IList, 'id' | 'name' | 'description' | 'isPublic'>

export type UpdatePlaceInListsInputs = {
    placeId: number
    listIds: number[]
}
