'use client'

import { visitedAPI } from '@/redux/services/visited-api'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { WidgetMessage } from './widget-message'
import { WidgetPlacesFeed } from './widget-places-feed'
import { WidgetPlacesPlaceSkeleton } from './widget-places-place-skeleton'

export const WidgetPlacesSavedListVisited = () => {
    const t = useI18n()
    const supertokens = useSupertokens()
    const response = visitedAPI.useGetVisitedQuery(undefined, { skip: !supertokens.isAuth })
    const places = response.data?.features.map(({ properties }) => properties) ?? []

    if (response.isError) {
        return <WidgetMessage onAction={response.refetch} isLoading={response.isLoading} />
    }

    if (response.isSuccess && response.data.features.length === 0) {
        return <WidgetMessage message={t('widget.places.saved_places.visited.empty_message', { br: <br /> })} />
    }

    if (response.isSuccess && response.data.features.length > 0) {
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacesPlaceSkeleton />
}
