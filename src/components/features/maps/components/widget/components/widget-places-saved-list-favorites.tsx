'use client'

import { favoritesAPI } from '@/redux/services/favorites-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from './widget-message'
import { WidgetPlacePreviewSkeleton } from './widget-place-preview-skeleton'
import { WidgetPlacesFeed } from './widget-places-feed'

export const WidgetPlacesSavedListFavorites = () => {
    const t = useI18n()
    const response = favoritesAPI.useGetFavoritesQuery()
    const places = response.data?.features.map(({ properties }) => properties) ?? []

    if (response.isError) {
        return <WidgetMessage onReload={response.refetch} isLoading={response.isLoading} />
    }

    if (response.isSuccess && response.data.features.length === 0) {
        return <WidgetMessage message={t('widget.saved_places.favorites.empty', { br: <br /> })} />
    }

    if (response.isSuccess && response.data.features.length > 0) {
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacePreviewSkeleton />
}
