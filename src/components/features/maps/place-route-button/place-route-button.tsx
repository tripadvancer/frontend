'use client'

import { useTranslations } from 'next-intl'

import { FormButton } from '@/components/ui/form-button'
import { getIsRoutingDisabled } from '@/redux/features/route-slice'
import { useAppSelector } from '@/redux/hooks'
import { useMapRoute } from '@/utils/hooks/use-map-route'
import { LngLat } from '@/utils/types/geo'

type PlaceButtonRouteProps = {
    lngLat: LngLat
}

export const PlaceButtonRoute = ({ lngLat }: PlaceButtonRouteProps) => {
    const t = useTranslations()
    const isRoutingDisabled = useAppSelector(getIsRoutingDisabled)
    const { buildRoute, isRouting } = useMapRoute()

    return (
        <FormButton
            type="stroke"
            size="small"
            isLoading={isRouting}
            isDisabled={isRoutingDisabled}
            onClick={() => buildRoute(lngLat)}
        >
            {t('common.action.route')}
        </FormButton>
    )
}
