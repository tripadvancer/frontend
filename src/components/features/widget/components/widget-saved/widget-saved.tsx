'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'
import { getWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from '../widget-message'
import { WidgetSavedListAddButton } from './widget-saved-list-add-button'
import { WidgetSavedLists } from './widget-saved-lists'
import { WidgetSavedListsView } from './widget-saved-lists-view'

export const WidgetSaved = ({ isAuth }: { isAuth: boolean }) => {
    const t = useI18n()
    const dialog = useDialog()
    const widgetActiveList = useAppSelector(getWidgetActiveList)

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

    if (widgetActiveList) {
        return <WidgetSavedListsView {...widgetActiveList} />
    }

    return (
        <div className="flex flex-col">
            <WidgetSavedListAddButton />
            <WidgetSavedLists />
        </div>
    )
}
