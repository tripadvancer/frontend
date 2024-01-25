export type GeoJsonCollection<T> = {
    type: 'FeatureCollection'
    features: GeoJsonFeature<T>[]
}

export type GeoJsonFeature<T> = {
    type: 'Feature'
    geometry: GeoJsonPoint
    properties: T
}

export type GeoJsonPoint = {
    type: 'Point'
    coordinates: CoordinatesTuple
}

export type CoordinatesTuple = [number, number]

export type ICoordinates = {
    lng: number
    lat: number
}
