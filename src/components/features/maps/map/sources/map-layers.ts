import { FillLayerSpecification, SymbolLayerSpecification } from 'react-map-gl/maplibre'

export const placesLayer: SymbolLayerSpecification = {
    id: 'places-layer',
    source: 'places-source',
    type: 'symbol',
    layout: {
        // prettier-ignore
        'icon-image': [
            'case',
            // ['==', ['get', 'isSaved'], true], 'pin-blue', // 'pin-blue' if place is favorite
            ['==', ['get', 'isVisited'],  true], 'pin-gray', // 'pin-gray' if place is visited
            'pin-orange',                                    // 'pin-orange' by default
        ],
        'icon-size': 0.75,
        'icon-allow-overlap': false,
        'icon-ignore-placement': true,
        'icon-offset': [0, -15],
    },
}

export const circleLayer: FillLayerSpecification = {
    id: 'circle',
    type: 'fill',
    source: 'circle-source',
    paint: {
        'fill-color': '#ff7d00',
        'fill-opacity': 0.25,
    },
}
