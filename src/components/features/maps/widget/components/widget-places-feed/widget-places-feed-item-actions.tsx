'use client'

import { useTranslations } from 'next-intl'

import { ChooseNavigationApp } from '@/components/features/dialogs/choose-navigation-app/choose-navigation-app'
import { PlaceButtonRoute } from '@/components/features/maps/place-route-button/place-route-button'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { BookmarkFillIcon16, BookmarkIcon16, PinIcon16, RouteIcon16, ShareIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useSavePlace } from '@/utils/hooks/use-save-place'
import { useSharePlace } from '@/utils/hooks/use-share-place'
import { useShowOnMap } from '@/utils/hooks/use-show-on-map'

type WidgetPlacesFeedItemActionsProps = {
    id: number
    title: string
    cover: string | null
    avgRating: number | null
    reviewsCount: number
    countryCode: string | null
    isVisited: boolean
    isSaved: boolean
    coordinates: number[]
}

export const WidgetPlacesFeedItemActions = (props: WidgetPlacesFeedItemActionsProps) => {
    const t = useTranslations()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(props.coordinates)

    const { savePlace } = useSavePlace(props.id)
    const { showOnMap } = useShowOnMap(props)
    const { sharePlace } = useSharePlace(props)

    const items: DropdownItemProps[] = [
        {
            caption: props.isSaved ? t('common.action.place.saved') : t('common.action.place.save'),
            value: 'save',
            icon: props.isSaved ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />,
            onClick: savePlace,
        },
        {
            caption: t('common.action.place.navigate'),
            value: 'navigate',
            icon: <RouteIcon16 />,
            onClick: () => dialog.open(<ChooseNavigationApp lngLat={lngLat} />),
        },
        {
            caption: t('common.action.place.showOnMap'),
            value: 'showOnMap',
            icon: <PinIcon16 />,
            onClick: showOnMap,
        },
        {
            caption: t('common.action.place.share'),
            value: 'share',
            icon: <ShareIcon16 />,
            onClick: sharePlace,
        },
    ]

    return (
        <div className="flex gap-x-1">
            <PlaceButtonRoute lngLat={arrayToLngLat(props.coordinates)} />
            <Dropdown items={items} />
        </div>
    )
}
