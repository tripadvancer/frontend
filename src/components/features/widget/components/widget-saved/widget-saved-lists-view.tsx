'use client'

import type { IList } from '@/utils/types/list'

import { ArrowLeftIcon16 } from '@/components/ui/icons'
import { closeMapPopups } from '@/redux/features/map-slice'
import { resetWidgetActiveList, toggleWidgetShowOnlySavedPlaces } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'

import { WidgetSavedListsViewPlaces } from './widget-saved-lists-view-places'

export const WidgetSavedListsView = ({ id, name }: IList) => {
    const dispatch = useAppDispatch()

    const handleBackClick = () => {
        dispatch(resetWidgetActiveList())
        dispatch(closeMapPopups())
    }

    const handleShowOnlySavedPlacesChange = () => {
        dispatch(toggleWidgetShowOnlySavedPlaces())
        dispatch(closeMapPopups())
    }

    return (
        <div className="flex flex-col gap-y-4 sm:gap-y-8">
            <div className="flex items-center justify-between">
                <div
                    role="back"
                    className="hover-animated flex cursor-pointer items-center gap-x-2 text-big-bold hover:text-blue-active"
                    onClick={handleBackClick}
                >
                    <ArrowLeftIcon16 />
                    {name}
                </div>

                {/* {supertokens.isAuth && widgetState.activeTab === WidgetTabsEnum.SAVED && widgetState.activeList && (
                    <div className="flex items-center gap-x-2">
                        <div onClick={() => dispatch(toggleWidgetShowOnlySavedPlaces())} className="cursor-pointer">
                            {t('widget.places.saved.show_on_the_map')}
                        </div>
                        <FormSwitcher
                            checked={widgetState.isShowOnlySavedPlaces}
                            onChange={handleShowOnlySavedPlacesChange}
                        />
                    </div>
                )} */}
            </div>

            <WidgetSavedListsViewPlaces listId={id} />
        </div>
    )
}
