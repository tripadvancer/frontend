'use client'

import { useEffect, useState } from 'react'
import { GeoJSONSource, useMap } from 'react-map-gl/maplibre'

import { circle } from '@turf/turf'

import { useToast } from '@/providers/toast-provider'
import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { LngLatToArray, getBoundsFromCoordinates, getMapFlyToOptions } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetRandomButton } from './widget-random-button'
import { WidgetRandomResults } from './widget-random-results'
import { WidgetRandomSlider } from './widget-random-slider'

export const WidgetRandom = () => {
    const t = useI18n()
    const toast = useToast()
    const widgetState = useAppSelector(getWidgetState)
    const userLocation = useAppSelector(getUserLocation)

    const { map } = useMap()

    const [radius, setRadius] = useState<number>(15)
    const [searchRandomPlace, { data, error, isFetching, isSuccess }] = placesAroundAPI.useLazyGetRandomPlaceQuery()

    useEffect(() => {
        if (userLocation) {
            const geoJson = circle(LngLatToArray(userLocation), radius, {
                steps: 50,
                units: 'kilometers',
            })

            const bounds = getBoundsFromCoordinates(geoJson.geometry.coordinates[0])
            map?.fitBounds(bounds)

            const source = map?.getSource('circle-source') as GeoJSONSource
            source?.setData(geoJson)
        }
    }, [map, userLocation, radius])

    const handleRandomClick = async () => {
        if (userLocation) {
            try {
                const randomPlace = await searchRandomPlace({
                    ...userLocation,
                    radius: radius * 1000, // km to m
                    categories: widgetState.selectedCategories,
                }).unwrap()

                if (randomPlace) {
                    const source = map?.getSource('random-places-source') as GeoJSONSource
                    source.setData({
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: randomPlace.coordinates,
                                },
                                properties: randomPlace,
                            },
                        ],
                    })
                }
            } catch {
                toast.error(t('common.error'))
            }
        }
    }

    return (
        // prettier-ignore
        <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
            <WidgetRandomSlider
                value={radius}
                onChange={setRadius}
            />
            <WidgetRandomButton
                isLoading={isFetching}
                isUserLocated={!!userLocation}
                onClick={handleRandomClick}
            />
            <WidgetRandomResults
                place={data}
                isSuccess={isSuccess}
                isError={!!error}
                isUserLocated={!!userLocation}
            />
        </div>
    )
}
