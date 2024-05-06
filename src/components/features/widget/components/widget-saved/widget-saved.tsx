'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'
import { getWidgetState } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from '../widget-message'
import { WidgetSavedLists } from './widget-saved-lists'
import { WidgetSavedListsAdd } from './widget-saved-lists-add'
import { WidgetSavedListsView } from './widget-saved-lists-view'

export const WidgetSaved = ({ isAuth }: { isAuth: boolean }) => {
    const t = useI18n()
    const dialog = useDialog()
    const widgetState = useAppSelector(getWidgetState)

    if (!isAuth) {
        return (
            <WidgetMessage
                message={t('widget.saved.not_logged_in', {
                    br: <br />,
                    sign_in_link: (
                        <span className="link" onClick={() => dialog.open(<SignIn />)}>
                            {t('widget.sign_in_link')}
                        </span>
                    ),
                })}
            />
        )
    }

    if (widgetState.activeList) {
        return <WidgetSavedListsView {...widgetState.activeList} />
    }

    return (
        <div className="flex flex-col">
            <WidgetSavedListsAdd />
            <WidgetSavedLists />
        </div>
    )
}
