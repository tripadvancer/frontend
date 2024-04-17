'use client'

import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetState, setWidgetRandomRadius } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around-api'

import { WidgetRandomButton } from './widget-random-button'
import { WidgetRandomResults } from './widget-random-results'
import { WidgetRandomSlider } from './widget-random-slider'

export const WidgetRandom = () => {
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)
    const userLocation = useAppSelector(getUserLocation)

    const [searchRandomPlace, { data, error, isFetching, isSuccess }] = placesAroundAPI.useLazyGetRandomPlaceQuery()

    const handleRandomClick = () => {
        if (userLocation) {
            searchRandomPlace({
                ...userLocation,
                radius: widgetState.randomRadius * 1000, // km to m
                categories: widgetState.selectedCategories,
            })
        }
    }

    return (
        // prettier-ignore
        <div className="flex flex-1 flex-col gap-y-4 sm:gap-y-8">
            <WidgetRandomSlider
                value={widgetState.randomRadius}
                onChange={value => dispatch(setWidgetRandomRadius(value))}
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
