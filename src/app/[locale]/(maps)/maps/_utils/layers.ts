import { CircleLayer, SymbolLayer } from 'react-map-gl'

export const clusters: CircleLayer = {
    id: 'clusters',
    source: 'places-source',
    type: 'circle',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['case', ['all', ['get', 'isFavorite']], '#46a6ff', '#ff7d00'],
        'circle-radius': 14,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
    },
}

export const clusterCount: SymbolLayer = {
    id: 'cluster-count',
    source: 'places-source',
    type: 'symbol',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-size': 12,
    },
    paint: {
        'text-color': '#fff',
    },
}

export const unclusteredPoint: CircleLayer = {
    id: 'unclustered-point',
    source: 'places-source',
    type: 'circle',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': [
            'case',
            ['==', ['get', 'isFavorite'], true],
            '#46a6ff',
            ['==', ['get', 'isVisited'], true],
            '#9a9fa3',
            '#ff7d00',
        ],
        'circle-radius': 10,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
    },
}

export const unclusteredPointIcon: SymbolLayer = {
    id: 'unclustered-point-icon',
    source: 'places-source',
    type: 'symbol',
    filter: ['!', ['has', 'point_count']],
    layout: {
        'icon-image': [
            'case',
            ['==', ['get', 'isFavorite'], true],
            'bookmark-pin',
            ['==', ['get', 'isVisited'], true],
            'flag-pin',
            'place-pin',
        ],
        'icon-size': 0.35,
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
    },
}
