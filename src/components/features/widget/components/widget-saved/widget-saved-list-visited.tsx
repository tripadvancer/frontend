'use client'

import { visitedAPI } from '@/redux/services/visited-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from '../widget-message'
import { WidgetPlacesFeed } from '../widget-places-feed/widget-places-feed'
import { WidgetPlacesFeedSkeleton } from '../widget-places-feed/widget-places-feed-skeleton'

export const WidgetSavedListVisited = ({ isAuth }: { isAuth: boolean }) => {
    const t = useI18n()
    const response = visitedAPI.useGetVisitedQuery(undefined, { skip: !isAuth })
    const places = response.data?.features.map(({ properties }) => properties) ?? []

    if (response.isError) {
        return <WidgetMessage onAction={response.refetch} isLoading={response.isLoading} />
    }

    if (response.isSuccess && response.data.features.length === 0) {
        return <WidgetMessage message={t('widget.saved.lists.visited.empty_message', { br: <br /> })} />
    }

    if (response.isSuccess && response.data.features.length > 0) {
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacesFeedSkeleton />
}
