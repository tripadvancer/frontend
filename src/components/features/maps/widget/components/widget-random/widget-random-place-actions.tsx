'use client'

import { LocateFixedIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ChooseNavigationApp } from '@/components/features/dialogs/choose-navigation-app/choose-navigation-app'
import { useDialog } from '@/components/providers/dialog-provider'
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
    const t = useTranslations()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(props.coordinates)

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
            <FormButton
                type="stroke"
                size="small"
                onClick={() => dialog.open(<ChooseNavigationApp lngLat={lngLat} />)}
                className="flex-none"
            >
                {t('common.action.route')}
            </FormButton>
        </div>
    )
}
