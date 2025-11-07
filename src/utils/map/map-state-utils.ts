import * as yup from 'yup'

export const DEFAULT_MAP_STATE = {
    lng: 37.6176,
    lat: 55.7558,
    zoom: 10,
}

export const DEFAULT_RADIUS = 1000
export const VALID_CATEGORY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const filterSchema = yup
    .object({
        categories: yup
            .array()
            .of(yup.number().oneOf(VALID_CATEGORY_IDS))
            .default([])
            .transform((arr: (number | undefined)[]) => arr.filter((v): v is number => v !== undefined)),
        skipVisited: yup.boolean().default(false),
        nearbyOnly: yup.boolean().default(false),
        radius: yup.number().min(100).max(20000).default(DEFAULT_RADIUS),
        showOnlySaved: yup.boolean().default(false),
    })
    .noUnknown(true)
    .defined()

export const mapStateSchema = yup
    .object({
        lng: yup.number().min(-180).max(180).default(DEFAULT_MAP_STATE.lng),
        lat: yup.number().min(-90).max(90).default(DEFAULT_MAP_STATE.lat),
        zoom: yup.number().min(1).max(22).default(DEFAULT_MAP_STATE.zoom),
        filters: filterSchema.default(filterSchema.getDefault()),
    })
    .noUnknown(true)
    .defined()

export type FiltersType = yup.InferType<typeof filterSchema>
export type MapStateType = yup.InferType<typeof mapStateSchema>

export function encodeMapState(state: MapStateType): string {
    try {
        return btoa(JSON.stringify(state))
    } catch {
        return ''
    }
}

export function decodeMapState(raw: string | null): MapStateType {
    if (!raw) return mapStateSchema.getDefault()
    try {
        const decoded = JSON.parse(atob(raw))
        return mapStateSchema.validateSync(decoded, { stripUnknown: true })
    } catch (err) {
        console.warn('Invalid map state in URL, using defaults:', err)
        return mapStateSchema.getDefault()
    }
}
