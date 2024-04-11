'use client'

import { useRouter } from 'next/navigation'

import { IRandomPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16 } from '@/components/ui/icons'
import { setMapPlacePopupInfo, setMapViewState } from '@/redux/features/map-slice'
import { closeWidget } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { getCountryByCode } from '@/services/countries'
import { useI18n } from '@/utils/i18n/i18n.client'

type LandingRandomPlaceActionsType = IRandomPlace

export const LandingRandomPlaceActions = (place: LandingRandomPlaceActionsType) => {
    const t = useI18n()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleShowOnMap = () => {
        dispatch(
            setMapViewState({
                latitude: place.coordinates[1],
                longitude: place.coordinates[0],
                zoom: parseInt(process.env.NEXT_PUBLIC_MAP_DEFAULT_ZOOM || '16', 10),
            }),
        )
        dispatch(setMapPlacePopupInfo(place))
        dispatch(closeWidget())
        router.push('/maps')
    }

    return (
        <div className="flex flex-col gap-2 sm:flex-row">
            {place.countryCode && (
                <FormButton
                    className="sm:basis-1/2"
                    onClick={() => router.push(`/countries/${getCountryByCode(place.countryCode)?.slug}`)}
                >
                    {t('common.action.view_all_places')}
                </FormButton>
            )}
            <FormButton className="sm:basis-1/2" type="stroke" icon={<MapIcon16 />} onClick={handleShowOnMap}>
                {t('common.action.go_to_map')}
            </FormButton>
        </div>
    )
}
