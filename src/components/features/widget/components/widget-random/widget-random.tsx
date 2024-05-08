'use client'

import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl/maplibre'

import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around-api'
import { getMapFlyToOptions } from '@/utils/helpers/maps'

import { WidgetRandomButton } from './widget-random-button'
import { WidgetRandomResults } from './widget-random-results'
import { WidgetRandomSlider } from './widget-random-slider'

export const WidgetRandom = () => {
    const widgetState = useAppSelector(getWidgetState)
    const userLocation = useAppSelector(getUserLocation)

    const { map } = useMap()

    const [radius, setRadius] = useState(15)
    const [searchRandomPlace, { data, error, isFetching, isSuccess }] = placesAroundAPI.useLazyGetRandomPlaceQuery()

    useEffect(() => {
        if (userLocation) {
            map?.flyTo(getMapFlyToOptions(userLocation))
        }
    }, [map, userLocation])

    const handleRandomClick = () => {
        if (userLocation) {
            searchRandomPlace({
                ...userLocation,
                radius: radius * 1000, // km to m
                categories: widgetState.selectedCategories,
            })
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
