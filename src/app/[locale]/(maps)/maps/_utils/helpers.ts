import { ViewState } from 'react-map-gl'

export const viewStateToStr = (viewState: ViewState) => {
    const { latitude, longitude, zoom } = viewState

    const formattedLongitude = longitude.toFixed(6)
    const formattedLatitude = latitude.toFixed(6)
    const formattedZoom = zoom.toFixed(2)

    return `${formattedLongitude},${formattedLatitude},${formattedZoom}`
}

export const strToViewState = (str: string): ViewState => {
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
