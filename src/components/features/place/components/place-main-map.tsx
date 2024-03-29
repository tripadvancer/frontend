'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { toggleWidget } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

export const PlaceMainMap = (place: IPlace) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const supertokens = useSupertokens()
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    const longitude = place.location.coordinates[0]
    const latitude = place.location.coordinates[1]
    const placeMetaResponse = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !supertokens.isAuth })

    const handleShowOnMap = () => {
        dispatch(
            setMapViewState({
                latitude,
                longitude,
                zoom: parseInt(process.env.NEXT_PUBLIC_MAP_FLY_TO_ZOOM || '16', 10),
            }),
        )
        dispatch(
            setMapPlacePopupInfo({
                ...place,
                coordinates: place.location.coordinates,
                isFavorite: placeMetaResponse.data?.isFavorite || false,
                isVisited: placeMetaResponse.data?.isVisited || false,
            }),
        )
        dispatch(toggleWidget())
        router.push('/maps')
    }

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="text-h5-m sm:text-h5">{t('pages.place.map.title', { place_name: place.title })}</h2>
            <Image
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+ff7d00(${longitude},${latitude})/${longitude},${latitude},12,0.00/640x320@2x?access_token=${mapboxAccessToken}`}
                width={640}
                height={320}
                className="w-full cursor-pointer rounded-2xl"
                alt={t('pages.place.map.alt', { place_name: place.title })}
                onClick={handleShowOnMap}
            />
        </section>
    )
}
