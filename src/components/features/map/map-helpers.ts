import { ViewState } from 'react-map-gl/maplibre'

export function viewStateToStr(viewState: Partial<ViewState>): string {
    const { latitude, longitude, zoom } = viewState

    const formattedLongitude = longitude?.toFixed(6)
    const formattedLatitude = latitude?.toFixed(6)
    const formattedZoom = zoom?.toFixed(2)

    return `${formattedLongitude},${formattedLatitude},${formattedZoom}`
}

export function strToViewState(str: string): ViewState {
    const [longitude, latitude, zoom] = str.split(',').map(parseFloat)

    return {
        longitude,
        latitude,
        zoom,
        bearing: 0,
        pitch: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
    }
}

export function createQueryString(name: string, value: string, searchParams: URLSearchParams): string {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return params.toString()
}
