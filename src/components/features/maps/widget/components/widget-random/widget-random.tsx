'use client'

import { GeoJSONSource, useMap } from 'react-map-gl/maplibre'

import { useTranslations } from 'next-intl'

import { useToast } from '@/providers/toast-provider'
import { getUserLocation } from '@/redux/features/user-slice'
import { getWidgetRandomRadius, getWidgetSelectedCategories } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { placesAroundAPI } from '@/redux/services/places-around.api'

import { WidgetRandomButton } from './widget-random-button'
import { WidgetRandomResults } from './widget-random-results'
import { WidgetRandomSlider } from './widget-random-slider'

export const WidgetRandom = () => {
    const t = useTranslations()
    const toast = useToast()
    const userLocation = useAppSelector(getUserLocation)
    const categories = useAppSelector(getWidgetSelectedCategories)
    const radius = useAppSelector(getWidgetRandomRadius)

    const { map } = useMap()

    const [searchRandomPlace, { data, error, isFetching, isSuccess }] = placesAroundAPI.useLazyGetRandomPlaceQuery()

    const handleRandomClick = async () => {
        if (userLocation) {
            try {
                const randomPlace = await searchRandomPlace({
                    ...userLocation,
                    radius: radius * 1000, // convert to meters
                    categories,
                }).unwrap()

                if (randomPlace) {
                    const source = map?.getSource('random-place-source') as GeoJSONSource
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
            } catch (error) {
                toast.error(t('common.error'))
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-6 sm:gap-y-8">
            <div className="text-caps uppercase">{t('map.widget.random.distance.title')}</div>
            <WidgetRandomSlider />
            {/* prettier-ignore */}
            <WidgetRandomButton
                isLoading={isFetching}
                isUserLocated={!!userLocation}
                onClick={handleRandomClick}
            />
            {/* prettier-ignore */}
            <WidgetRandomResults
                place={data}
                isSuccess={isSuccess}
                isError={!!error}
                isUserLocated={!!userLocation}
            />
        </div>
    )
}
