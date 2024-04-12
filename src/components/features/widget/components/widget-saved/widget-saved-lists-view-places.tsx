'use client'

import type { IPlacePreview } from '@/utils/types/place'

import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from '../widget-message'
import { WidgetPlacesFeed } from '../widget-places-feed/widget-places-feed'

export const WidgetSavedListsViewPlaces = ({ places }: { places: IPlacePreview[] }) => {
    const t = useI18n()

    if (places.length === 0) {
        return <WidgetMessage message={t('widget.saved.lists.empty_message', { br: <br /> })} />
    }

    return <WidgetPlacesFeed places={places} />
}
