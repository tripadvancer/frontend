import { LineLayer, SymbolLayer } from 'react-map-gl/maplibre'

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
        'icon-size': 0.85,
        'icon-allow-overlap': false,
        'icon-ignore-placement': true,
    },
}

export const visitedPlacesLayer: SymbolLayer = {
    id: 'visited-places-layer',
    source: 'places-source',
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
    source: 'places-source',
    type: 'symbol',
    layout: {
        'icon-image': 'pin-blue',
        'icon-size': 0.75,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
    },
}

export const routeLayer: LineLayer = {
    id: 'route-layer',
    source: 'route-source',
    type: 'line',
    layout: {
        'line-join': 'round',
        'line-cap': 'round',
    },
    paint: {
        'line-color': '#1373cc',
        'line-width': 4,
    },
}
