export interface MapFiltersState {
    categories: number[]
    skipVisited: boolean
    nearbyOnly: boolean
    radius: number
    showOnlySaved: boolean
}

const DEFAULT_RADIUS = 1000
const VALID_CATEGORY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const safeParseBoolean = (val: string | null): boolean => {
    return val === 'true'
}

const safeParseNumber = (val: string | null, fallback: number): number => {
    const parsed = parseInt(val || '', 10)
    return isNaN(parsed) || parsed <= 0 ? fallback : parsed
}

function safeParseCategories(raw: string | null): number[] {
    if (!raw) return []

    return raw
        .split(',')
        .map(id => parseInt(id, 10))
        .filter(id => !isNaN(id) && VALID_CATEGORY_IDS.includes(id))
}

export function parseFiltersFromSearchParams(params: URLSearchParams): MapFiltersState {
    return {
        categories: safeParseCategories(params.get('categories')),
        skipVisited: safeParseBoolean(params.get('skip_visited')),
        nearbyOnly: safeParseBoolean(params.get('nearby_only')),
        radius: safeParseNumber(params.get('radius'), DEFAULT_RADIUS),
        showOnlySaved: safeParseBoolean(params.get('show_only_saved')),
    }
}

export function buildFiltersQueryString(filters: MapFiltersState): string {
    const params = new URLSearchParams()

    if (filters.categories.length > 0) {
        params.set('categories', filters.categories.join(','))
    }

    if (filters.skipVisited === true) {
        params.set('skip_visited', 'true')
    }

    if (filters.nearbyOnly === true) {
        params.set('nearby_only', 'true')
        if (filters.radius !== DEFAULT_RADIUS) {
            params.set('radius', filters.radius.toString())
        }
    }

    if (filters.showOnlySaved === true) {
        params.set('show_only_saved', 'true')
    }

    return params.toString()
}
