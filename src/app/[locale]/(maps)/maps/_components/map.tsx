'use client'

import { useCallback, useEffect, useState } from 'react'
import { Layer, Map as MapBox, MapEvent, Source, ViewState, ViewStateChangeEvent } from 'react-map-gl'

import { useRouter, useSearchParams } from 'next/navigation'

import { strToViewState, viewStateToStr } from '../_utils/helpers'
import { clusterCount, clusters, unclusteredPoint } from '../_utils/layers'

const defaultViewState: ViewState = {
    latitude: 54.887928,
    longitude: 25.954196,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
}

export const Map = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [viewState, setViewState] = useState<ViewState>(defaultViewState)

    useEffect(() => {
        const vs = searchParams.get('vs')

        if (vs) {
            const updatedViewState = strToViewState(vs)
            setViewState(updatedViewState)
            return
        }

        const updatedQuery = viewStateToStr(viewState)
        router.replace(`/maps?vs=${updatedQuery}`)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleMove = useCallback((event: ViewStateChangeEvent) => {
        setViewState(event.viewState)
    }, [])

    const handleMoveEnd = useCallback(
        (event: ViewStateChangeEvent) => {
            const vs = viewStateToStr(event.viewState)
            router.replace(`/maps?vs=${vs}`)
        },
        [router],
    )

    return (
        <div className="h-screen w-screen">
            <MapBox
                {...viewState}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onMove={handleMove}
                onMoveEnd={handleMoveEnd}
                reuseMaps
            >
                <Source
                    id="places-source"
                    type="geojson"
                    data={{ type: 'FeatureCollection', features: [] }}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={40}
                    clusterProperties={{ isFavorite: ['any', ['==', ['get', 'isFavorite'], true], false] }}
                >
                    <Layer {...clusters} />
                    <Layer {...clusterCount} />
                    <Layer {...unclusteredPoint} />
                </Source>
            </MapBox>
        </div>
    )
}
