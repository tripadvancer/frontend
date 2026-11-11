'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { useDialog } from '@/components/providers/dialog-provider'
import { getWidgetActiveList } from '@/utils/redux/features/widget-slice'
import { useAppSelector } from '@/utils/redux/hooks'

import { WidgetMessage } from '../widget-message'
import { WidgetSavedListAddButton } from './widget-saved-list-add-button'
import { WidgetSavedLists } from './widget-saved-lists'
import { WidgetSavedListsView } from './widget-saved-lists-view'

export const WidgetSaved = ({ isAuth }: { isAuth: boolean }) => {
    const dialog = useDialog()
    const widgetActiveList = useAppSelector(getWidgetActiveList)

    if (!isAuth) {
        return (
            <WidgetMessage
                message={
                    <>
                        You are not logged in.
                        <br />
                        {
                            <span className="link" onClick={() => dialog.open(<SignIn />)}>
                                Sign in
                            </span>
                        }{' '}
                        to see saved places.
                    </>
                }
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
