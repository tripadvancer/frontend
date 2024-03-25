'use client'

import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState, setWidgetRandomRadius } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around-api'

import { WidgetPlacesRandomButton } from './widget-places-random-button'
import { WidgetPlacesRandomResults } from './widget-places-random-results'
import { WidgetPlacesRandomSlider } from './widget-places-random-slider'

export const WidgetPlacesRandom = () => {
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)
    const userLocation = useAppSelector(getUserLocation)

    const [searchRandomPlace, { data, error, isFetching, isSuccess }] = placesAroundAPI.useLazyGetRandomPlaceQuery()

    const handleRandomClick = () => {
        if (userLocation) {
            searchRandomPlace({
                lat: userLocation.lat,
                lng: userLocation.lng,
                radius: widgetState.randomRadius * 1000, // km to m
                categories: widgetState.selectedCategories,
            })
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
            <WidgetPlacesRandomSlider
                value={widgetState.randomRadius}
                onChange={value => dispatch(setWidgetRandomRadius(value))}
            />
            <WidgetPlacesRandomButton
                isLoading={isFetching}
                isUserLocated={!!userLocation}
                onClick={handleRandomClick}
            />
            <WidgetPlacesRandomResults
                place={data}
                isSuccess={isSuccess}
                isError={!!error}
                isUserLocated={!!userLocation}
            />
        </div>
    )
}
