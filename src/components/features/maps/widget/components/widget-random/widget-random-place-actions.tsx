'use client'

import { LocateFixedIcon } from 'lucide-react'

import { PlaceButtonRoute } from '@/components/features/maps/place-route-button/place-route-button'
import { FormButton } from '@/components/ui/form-button'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useShowOnMap } from '@/utils/hooks/use-show-on-map'

type WidgetRandomPlaceActionsProps = {
    id: number
    title: string
    description: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    isSaved: boolean
    coordinates: number[]
}

export const WidgetRandomPlaceActions = (props: WidgetRandomPlaceActionsProps) => {
    const { showOnMap } = useShowOnMap(props)

    return (
        <div className="flex gap-x-1">
            <FormButton
                type="stroke"
                size="small"
                icon={<LocateFixedIcon size={16} />}
                className="flex-none"
                onClick={showOnMap}
            />
            <PlaceButtonRoute lngLat={arrayToLngLat(props.coordinates)} />
        </div>
    )
}
