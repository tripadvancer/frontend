import { FillLayer, SymbolLayer } from 'react-map-gl/maplibre'

export const placesLayer: SymbolLayer = {
    id: 'places-layer',
    source: 'places-source',
    type: 'symbol',
    layout: {
        // prettier-ignore
        'icon-image': [
            'case',
            ['==', ['get', 'isSaved'], true], 'pin-blue', // 'pin-blue' if place is favorite
            ['==', ['get', 'isVisited'],  true], 'pin-gray', // 'pin-gray' if place is visited
            'pin-orange',                                    // 'pin-orange' by default
        ],
        'icon-size': 0.75,
        'icon-allow-overlap': false,
        'icon-ignore-placement': true,
    },
}

export const visitedPlacesLayer: SymbolLayer = {
    id: 'visited-places-layer',
    source: 'visited-places-source',
    type: 'symbol',
    layout: {
        'icon-image': 'pin-gray',
        'icon-size': 0.75,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
    },
}

export const savedPlacesLayer: SymbolLayer = {
    id: 'saved-places-layer',
    source: 'saved-places-source',
    type: 'symbol',
    layout: {
        'icon-image': 'pin-blue',
        'icon-size': 0.75,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
    },
}

export const randomPlacesLayer: SymbolLayer = {
    id: 'random-places-layer',
    source: 'random-places-source',
    type: 'symbol',
    layout: {
        'icon-image': 'pin-orange',
        'icon-size': 0.75,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
    },
}

export const circleLayer: FillLayer = {
    id: 'circle',
    type: 'fill',
    source: 'circle-source',
    paint: {
        'fill-color': '#ff7d00',
        'fill-opacity': 0.25,
    },
}
