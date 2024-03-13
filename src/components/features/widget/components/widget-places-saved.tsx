'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { ArrowRightIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { closeMapPopups } from '@/redux/features/map-slice'
import { getWidgetState, setWidgetPlacesActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetListsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { WidgetMessage } from './widget-message'
import { WidgetPlacesSavedList } from './widget-places-saved-list'
import { WidgetPlacesSavedListFavorites } from './widget-places-saved-list-favorites'
import { WidgetPlacesSavedListVisited } from './widget-places-saved-list-visited'

export const WidgetPlacesSaved = () => {
    const t = useI18n()
    const supertokens = useSupertokens()
    const dialog = useDialog()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    const defaultLists = [
        { id: WidgetListsEnum.FAVORITES, caption: t('widget.places.saved_places.favorites.title') },
        { id: WidgetListsEnum.VISITED, caption: t('widget.places.saved_places.visited.title') },
    ]

    if (!supertokens.isAuth) {
        return (
            <WidgetMessage
                message={t('widget.places.saved_places.error.not_logged_in', { br: <br /> })}
                actionCaption={t('common.link.sign_in')}
                onAction={() => dialog.open(<SignIn />)}
            />
        )
    }

    if (widgetState.places.activeList === WidgetListsEnum.FAVORITES) {
        return (
            <WidgetPlacesSavedList caption={t('widget.places.saved_places.favorites.title')}>
                <WidgetPlacesSavedListFavorites />
            </WidgetPlacesSavedList>
        )
    }

    if (widgetState.places.activeList === WidgetListsEnum.VISITED) {
        return (
            <WidgetPlacesSavedList caption={t('widget.places.saved_places.visited.title')}>
                <WidgetPlacesSavedListVisited />
            </WidgetPlacesSavedList>
        )
    }

    const handleListClick = (listId: WidgetListsEnum) => {
        dispatch(setWidgetPlacesActiveList(listId))
        dispatch(closeMapPopups())
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div>
                {defaultLists.map(list => (
                    <div
                        key={`widget-list-${list.id}`}
                        className="hover-animated flex cursor-pointer items-center justify-between border-t border-blue-20 py-2 text-big-bold last:border-b hover:text-blue-active sm:py-4"
                        onClick={() => handleListClick(list.id)}
                    >
                        {list.caption}
                        <ArrowRightIcon16 />
                    </div>
                ))}
            </div>
            <p className="text-center text-small text-black-40">{t('widget.places.saved_places.info')}</p>
        </div>
    )
}
