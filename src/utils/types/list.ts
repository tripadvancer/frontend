export type IList = {
    id: number
    name: string
    description: string
    isPublic: boolean
    listToPlace: {
        placeId: number
    }[]
    _count: {
        listToPlace: number
    }
}

export type CreateListInputs = Pick<IList, 'name' | 'description'>

export type UpdateListInputs = Pick<IList, 'id' | 'name' | 'description' | 'isPublic'>

export type UpdatePlaceInListsInputs = {
    placeId: number
    listIds: number[]
}
