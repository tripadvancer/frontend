'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { ArrowRightIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { closeMapPopups } from '@/redux/features/map-slice'
import { getWidgetState, setWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetListsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from '../widget-message'
import { WidgetSavedList } from './widget-saved-list'
import { WidgetSavedListFavorites } from './widget-saved-list-favorites'
import { WidgetSavedListVisited } from './widget-saved-list-visited'

export const WidgetSaved = ({ isAuth }: { isAuth: boolean }) => {
    const t = useI18n()
    const dialog = useDialog()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    const defaultLists = [
        { id: WidgetListsEnum.FAVORITES, caption: t('widget.saved.lists.favorites.title') },
        { id: WidgetListsEnum.VISITED, caption: t('widget.saved.lists.visited.title') },
    ]

    if (!isAuth) {
        return (
            <WidgetMessage
                message={t('widget.saved.not_logged_in', { br: <br /> })}
                actionCaption={t('common.link.sign_in')}
                onAction={() => dialog.open(<SignIn />)}
            />
        )
    }

    if (widgetState.activeList === WidgetListsEnum.FAVORITES) {
        return (
            <WidgetSavedList caption={t('widget.saved.lists.favorites.title')} isAuth={isAuth}>
                <WidgetSavedListFavorites isAuth={isAuth} />
            </WidgetSavedList>
        )
    }

    if (widgetState.activeList === WidgetListsEnum.VISITED) {
        return (
            <WidgetSavedList caption={t('widget.saved.lists.visited.title')} isAuth={isAuth}>
                <WidgetSavedListVisited isAuth={isAuth} />
            </WidgetSavedList>
        )
    }

    const handleListClick = (listId: WidgetListsEnum) => {
        dispatch(setWidgetActiveList(listId))
        dispatch(closeMapPopups())
    }

    return (
        <div className="flex flex-col gap-y-4">
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
            <p className="text-center text-small text-black-40">{t('widget.saved.lists.info')}</p>
        </div>
    )
}
