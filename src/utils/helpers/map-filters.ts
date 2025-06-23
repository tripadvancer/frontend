import { categoriesDictionary } from '@/utils/dictionaries/categories'
import { countriesDictionary } from '@/utils/dictionaries/countries'

export interface MapFiltersState {
    lng: number
    lat: number
    zoom: number
    country: string
    user: string
    categories: number[]
    skipVisited: boolean
    nearbyOnly: boolean
    radius: number
    showOnlySaved: boolean
}

const DEFAULT_RADIUS = 1000

const VALID_CATEGORY_IDS = new Set(categoriesDictionary.map(c => c.id))
const VALID_COUNTRY_CODES = new Set(countriesDictionary.map(c => c.code.toLowerCase()))

export const safeParseBoolean = (val: string | null): boolean => {
    return val === 'true'
}

export const safeParseNumber = (val: string | null, fallback: number): number => {
    const parsed = parseInt(val || '', 10)
    return isNaN(parsed) || parsed <= 0 ? fallback : parsed
}

export const safeParseCategories = (raw: string | null): number[] => {
    if (!raw) return []
    return raw
        .split(',')
        .map(id => parseInt(id, 10))
        .filter(id => !isNaN(id) && VALID_CATEGORY_IDS.has(id))
}

export const safeParseCountry = (val: string): string => {
    if (!val) return ''
    const normalized = val.toLowerCase()
    return VALID_COUNTRY_CODES.has(normalized) ? normalized : ''
}

export const safeParseUser = (val: string | null): string => {
    if (!val) return ''
    const trimmed = val.trim()
    return trimmed.length > 0 ? trimmed : ''
}

export function parseFiltersFromSearchParams(params: URLSearchParams): MapFiltersState {
    return {
        lng: safeParseNumber(params.get('lng'), 0),
        lat: safeParseNumber(params.get('lat'), 0),
        zoom: safeParseNumber(params.get('zoom'), 10),
        country: safeParseCountry(params.get('country') || ''),
        user: safeParseUser(params.get('user') || ''),
        categories: safeParseCategories(params.get('categories')),
        skipVisited: safeParseBoolean(params.get('skip_visited')),
        nearbyOnly: safeParseBoolean(params.get('nearby_only')),
        radius: safeParseNumber(params.get('radius'), DEFAULT_RADIUS),
        showOnlySaved: safeParseBoolean(params.get('show_only_saved')),
    }
}

export function buildFiltersQueryString(filters: MapFiltersState): string {
    const params = new URLSearchParams()

    if (filters.country) {
        params.set('country', filters.country)
    }

    if (filters.user) {
        params.set('user', filters.user)
    }

    if (filters.categories.length > 0) {
        params.set('categories', filters.categories.join(','))
    }

    if (filters.skipVisited) {
        params.set('skip_visited', 'true')
    }

    if (filters.nearbyOnly) {
        params.set('nearby_only', 'true')
        if (filters.radius !== DEFAULT_RADIUS) {
            params.set('radius', filters.radius.toString())
        }
    }

    if (filters.showOnlySaved) {
        params.set('show_only_saved', 'true')
    }

    return params.toString()
}
