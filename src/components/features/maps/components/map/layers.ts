import { SymbolLayer } from 'react-map-gl/maplibre'

export const placesLayer: SymbolLayer = {
    id: 'icon-layer',
    source: 'places-source',
    type: 'symbol',
    layout: {
        'icon-image': 'place-pin',
        'icon-size': 0.75,
        'icon-allow-overlap': false,
        'icon-ignore-placement': false,
    },
}
