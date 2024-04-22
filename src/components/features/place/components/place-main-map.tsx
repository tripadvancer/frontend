'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import type { IPlace } from '@/utils/types/place'

import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { closeWidget } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { placesAPI } from '@/redux/services/places-api'
import { arrayToLngLat, getFlyToViewState } from '@/utils/helpers/maps'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

export const PlaceMainMap = (place: IPlace) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const supertokens = useSupertokens()
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    const lngLat = arrayToLngLat(place.location.coordinates)
    const placeMetaResponse = placesAPI.useGetPlaceMetaByIdQuery(place.id, { skip: !supertokens.isAuth })

    const handleShowOnMap = () => {
        const lngLat = arrayToLngLat(place.location.coordinates)
        const viewState = getFlyToViewState(lngLat)
        dispatch(setMapViewState(viewState))
        dispatch(
            setMapPlacePopupInfo({
                ...place,
                coordinates: place.location.coordinates,
                isFavorite: placeMetaResponse.data?.isFavorite || false,
            }),
        )
        dispatch(closeWidget())
        router.push('/maps')
    }

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="h5">{t('pages.place.map.title', { place_name: place.title })}</h2>
            <Image
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+ff7d00(${lngLat.lng},${lngLat.lat})/${lngLat.lng},${lngLat.lat},12,0.00/640x320@2x?access_token=${mapboxAccessToken}`}
                width={640}
                height={320}
                className="w-full cursor-pointer rounded-2xl"
                alt={t('pages.place.map.alt', { place_name: place.title })}
                onClick={handleShowOnMap}
            />
        </section>
    )
}
