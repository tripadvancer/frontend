import { SymbolLayer } from 'react-map-gl/maplibre'

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
