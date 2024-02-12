import { SymbolLayer } from 'react-map-gl'

export const placesLayer: SymbolLayer = {
    id: 'icon-layer',
    source: 'places-source',
    type: 'symbol',
    layout: {
        // prettier-ignore
        'icon-image': [
            'case',
            ['==', ['get', 'isFavorite'], true], 'pin-blue', // 'pin-blue' if place is favorite
            ['==', ['get', 'isVisited'],  true], 'pin-gray', // 'pin-gray' if place is visited
            'pin-orange',                                    // 'pin-orange' by default
        ],
        'icon-size': 0.75,
        'icon-allow-overlap': false,
        'icon-ignore-placement': false,
    },
}

export const visitedPlacesLayer: SymbolLayer = {
    id: 'icon-layer',
    source: 'places-source',
    type: 'symbol',
    layout: {
        'icon-image': 'pin-gray',
        'icon-size': 0.75,
        'icon-allow-overlap': false,
        'icon-ignore-placement': false,
    },
}

export const favoritesPlacesLayer: SymbolLayer = {
    id: 'icon-layer',
    source: 'places-source',
    type: 'symbol',
    layout: {
        'icon-image': 'pin-blue',
        'icon-size': 0.75,
        'icon-allow-overlap': false,
        'icon-ignore-placement': false,
    },
}
