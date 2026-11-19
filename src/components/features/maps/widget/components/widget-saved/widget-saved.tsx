'use client'

import { SignIn } from '@/components/features/auth/sign-in'
import { SavedListAddButton } from '@/components/features/common/saved/saved-list-add-button'
import { SavedLists } from '@/components/features/common/saved/saved-lists'
import { useDialog } from '@/components/providers/dialog-provider'
import { getWidgetActiveList, setWidgetActiveList } from '@/utils/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

import { WidgetMessage } from '../widget-message'
import { WidgetSavedListsView } from './widget-saved-lists-view'

export const WidgetSaved = ({ isAuth }: { isAuth: boolean }) => {
    const dialog = useDialog()
    const dispatch = useAppDispatch()
    const widgetActiveList = useAppSelector(getWidgetActiveList)

    if (!isAuth) {
        return (
            <WidgetMessage
                message={
                    <>
                        You are not logged in.
                        <br />
                        <span className="link" onClick={() => dialog.open(<SignIn />)}>
                            Sign in
                        </span>{' '}
                        to see saved places.
                    </>
                }
            />
        )
    }

    if (widgetActiveList) {
        return <WidgetSavedListsView list={widgetActiveList} />
    }

    return (
        <div className="flex flex-col">
            <SavedListAddButton />
            <SavedLists onSelect={list => dispatch(setWidgetActiveList(list))} />
        </div>
    )
}
