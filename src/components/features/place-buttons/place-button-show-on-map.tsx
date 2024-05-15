'use client'

import { IPlacePreview, IRandomPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { PinIcon16 } from '@/components/ui/icons'
import { useShowOnMap } from '@/utils/hooks/use-show-on-map'

export const PlaceButtonShowOnMap = (place: IPlacePreview | IRandomPlace) => {
    const { onShowOnMap } = useShowOnMap(place)

    return <FormButton type="stroke" size="small" icon={<PinIcon16 />} className="flex-none" onClick={onShowOnMap} />
}
