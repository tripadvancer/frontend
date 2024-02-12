import { useAppSelector } from '@/redux/hooks'
import { visitedAPI } from '@/redux/services/visited-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from './widget-message'
import { WidgetPlacePreviewSkeleton } from './widget-place-preview-skeleton'
import { WidgetPlacesFeed } from './widget-places-feed'

export const WidgetPlacesSavedListVisited = () => {
    const t = useI18n()
    const response = visitedAPI.useGetVisitedQuery()

    if (response.isError) {
        return <WidgetMessage onReload={response.refetch} isLoading={response.isLoading} />
    }

    if (response.isSuccess && response.data.features.length === 0) {
        return <WidgetMessage message={t('widget.places_all.no_places', { br: <br /> })} />
    }

    if (response.isSuccess && response.data.features.length > 0) {
        return <WidgetPlacesFeed geoJson={response.data ?? { type: 'FeatureCollection', features: [] }} />
    }

    return <WidgetPlacePreviewSkeleton />
}
