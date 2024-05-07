type CategoryDict = {
    id: number
    name: string
    localizedName: {
        [locale: string]: string
    }
}

export const categoriesDictionary: CategoryDict[] = [
    {
        id: 1,
        name: 'ABANDONED',
        localizedName: {
            en: 'Abandoned',
            ru: 'Заброшки',
        },
    },
    {
        id: 2,
        name: 'ADVENTURE_ACTIVITIES',
        localizedName: {
            en: 'Adventure',
            ru: 'Приключения',
        },
    },
    {
        id: 3,
        name: 'ARCHITECTURE',
        localizedName: {
            en: 'Architecture',
            ru: 'Архитектура',
        },
    },
    {
        id: 4,
        name: 'CAMPING_SITES',
        localizedName: {
            en: 'Camping',
            ru: 'Кемпинги',
        },
    },
    {
        id: 5,
        name: 'HISTORICAL',
        localizedName: {
            en: 'Historical',
            ru: 'История',
        },
    },
    {
        id: 6,
        name: 'LANDMARKS',
        localizedName: {
            en: 'Landmarks',
            ru: 'Достопримечательности',
        },
    },
    {
        id: 7,
        name: 'NATURAL_ATTRACTIONS',
        localizedName: {
            en: 'Natural',
            ru: 'Природа',
        },
    },
    {
        id: 8,
        name: 'OFF_ROAD',
        localizedName: {
            en: 'Off-road',
            ru: 'Офф-роуд',
        },
    },
    {
        id: 9,
        name: 'RECREATIONAL_AREAS',
        localizedName: {
            en: 'Recreation',
            ru: 'Места отдыха',
        },
    },
    {
        id: 10,
        name: 'SCENIC_VIEWS',
        localizedName: {
            en: 'Scenic',
            ru: 'Красивые виды',
        },
    },
    {
        id: 11,
        name: 'MUSEUMS',
        localizedName: {
            en: 'Museums',
            ru: 'Музеи',
        },
    },
    {
        id: 12,
        name: 'HIKING',
        localizedName: {
            en: 'Hiking',
            ru: 'Пешие тропы',
        },
    },
]

export const getSortedCategories = (locale: string): CategoryDict[] => {
    return categoriesDictionary.sort((a, b) => a.localizedName[locale].localeCompare(b.localizedName[locale]))
}
