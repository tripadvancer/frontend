'use client'

import { useTranslations } from 'next-intl'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/providers/dialog-provider'
import { getWidgetActiveList } from '@/redux/features/widget-slice'
import { useAppSelector } from '@/redux/hooks'

import { WidgetMessage } from '../widget-message'
import { WidgetSavedListAddButton } from './widget-saved-list-add-button'
import { WidgetSavedLists } from './widget-saved-lists'
import { WidgetSavedListsView } from './widget-saved-lists-view'

export const WidgetSaved = ({ isAuth }: { isAuth: boolean }) => {
    const t = useTranslations()
    const dialog = useDialog()
    const widgetActiveList = useAppSelector(getWidgetActiveList)

    if (!isAuth) {
        return (
            <WidgetMessage
                message={t.rich('map.widget.tabs.savedPlaces.notLoggedIn', {
                    br: () => <br />,
                    signInLink: signInLink => (
                        <span className="link" onClick={() => dialog.open(<SignIn />)}>
                            {signInLink}
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
