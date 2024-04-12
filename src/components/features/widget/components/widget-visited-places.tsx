'use client'

import { useDialog } from '@/providers/dialog-provider'
import { visitedAPI } from '@/redux/services/visited-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SignIn } from '../../auth/sign-in'
import { WidgetMessage } from './widget-message'
import { WidgetPlacesFeed } from './widget-places-feed/widget-places-feed'
import { WidgetPlacesFeedSkeleton } from './widget-places-feed/widget-places-feed-skeleton'

export const WidgetVisitedPlaces = ({ isAuth }: { isAuth: boolean }) => {
    const t = useI18n()
    const dialog = useDialog()

    const { data, isError, isLoading, isSuccess, refetch } = visitedAPI.useGetVisitedQuery(undefined, { skip: !isAuth })

    const places = data?.features.map(({ properties }) => properties) ?? []

    if (!isAuth) {
        return (
            <WidgetMessage
                message={t('widget.visited_places.not_logged_in', { br: <br /> })}
                actionCaption={t('common.link.sign_in')}
                onAction={() => dialog.open(<SignIn />)}
            />
        )
    }

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess && places.length === 0) {
        return <WidgetMessage message={t('widget.visited_places.empty_message', { br: <br /> })} />
    }

    if (isSuccess && places.length > 0) {
        return <WidgetPlacesFeed places={places} />
    }

    return <WidgetPlacesFeedSkeleton />
}
