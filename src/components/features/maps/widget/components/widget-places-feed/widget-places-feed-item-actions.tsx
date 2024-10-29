'use client'

import { useTranslations } from 'next-intl'

import { ChooseNavigationApp } from '@/components/features/dialogs/choose-navigation-app/choose-navigation-app'
import { Dropdown, DropdownItemProps } from '@/components/ui/dropdown'
import { BookmarkFillIcon16, BookmarkIcon16, PinIcon16, RouteIcon16, ShareIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { arrayToLngLat } from '@/utils/helpers/maps'
import { useSavePlace } from '@/utils/hooks/use-save-place'
import { useSharePlace } from '@/utils/hooks/use-share-place'
import { useShowOnMap } from '@/utils/hooks/use-show-on-map'
import { IPlacePreview } from '@/utils/types/place'

export const WidgetPlacesFeedItemActions = (place: IPlacePreview) => {
    const t = useTranslations()
    const dialog = useDialog()
    const lngLat = arrayToLngLat(place.coordinates)

    const { savePlace } = useSavePlace(place.id)
    const { showOnMap } = useShowOnMap(place)
    const { sharePlace } = useSharePlace(place)

    const items: DropdownItemProps[] = [
        {
            caption: place.isSaved ? t('common.action.place.saved') : t('common.action.place.save'),
            value: 'save',
            icon: place.isSaved ? <BookmarkFillIcon16 /> : <BookmarkIcon16 />,
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
            <Dropdown items={items} />
        </div>
    )
}
