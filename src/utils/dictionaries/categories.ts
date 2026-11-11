type CategoryDict = {
    id: number
    code: string
    name: string
}

export const categoriesDictionary: CategoryDict[] = [
    {
        id: 1,
        code: 'ABANDONED',
        name: 'Abandoned',
    },
    {
        id: 2,
        code: 'ADVENTURE_ACTIVITIES',
        name: 'Adventure',
    },
    {
        id: 3,
        code: 'ARCHITECTURE',
        name: 'Architecture',
    },
    {
        id: 4,
        code: 'CAMPING_SITES',
        name: 'Camping',
    },
    {
        id: 5,
        code: 'HISTORICAL',
        name: 'Historical',
    },
    {
        id: 6,
        code: 'LANDMARKS',
        name: 'Landmarks',
    },
    {
        id: 7,
        code: 'NATURAL_ATTRACTIONS',
        name: 'Natural',
    },
    {
        id: 8,
        code: 'OFF_ROAD',
        name: 'Off-road',
    },
    {
        id: 9,
        code: 'RECREATIONAL_AREAS',
        name: 'Recreation',
    },
    {
        id: 10,
        code: 'SCENIC_VIEWS',
        name: 'Scenic',
    },
    {
        id: 11,
        code: 'MUSEUMS',
        name: 'Museums',
    },
    {
        id: 12,
        code: 'HIKING',
        name: 'Hiking',
    },
]

export const getSortedCategories = (): CategoryDict[] => {
    return [...categoriesDictionary].sort((a, b) => a.name.localeCompare(b.name))
}
