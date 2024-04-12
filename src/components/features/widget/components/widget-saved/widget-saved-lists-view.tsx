'use client'

import type { IPlacePreview } from '@/utils/types/place'

import { ArrowLeftIcon16 } from '@/components/ui/icons'
import { closeMapPopups } from '@/redux/features/map-slice'
import { resetWidgetActiveList, toggleWidgetShowOnlySavedPlaces } from '@/redux/features/widget-slice'
import { useAppDispatch } from '@/redux/hooks'
import { listAPI } from '@/redux/services/list-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetMessage } from '../widget-message'
import { WidgetSavedListsViewPlaces } from './widget-saved-lists-view-places'

export const WidgetSavedListsView = ({ listId }: { listId: number }) => {
    const t = useI18n()
    const dispatch = useAppDispatch()

    const { data: list, isError, isLoading, isSuccess, refetch } = listAPI.useGetListInfoQuery(listId)

    const handleBackClick = () => {
        dispatch(resetWidgetActiveList())
        dispatch(closeMapPopups())
    }

    const handleShowOnlySavedPlacesChange = () => {
        dispatch(toggleWidgetShowOnlySavedPlaces())
        dispatch(closeMapPopups())
    }

    if (isError) {
        return <WidgetMessage onAction={refetch} isLoading={isLoading} />
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col gap-y-4 sm:gap-y-8">
                <div className="flex items-center justify-between">
                    <div
                        role="back"
                        className="hover-animated flex cursor-pointer items-center gap-x-2 text-big-bold hover:text-blue-active"
                        onClick={handleBackClick}
                    >
                        <ArrowLeftIcon16 />
                        {list.name}
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

                <WidgetSavedListsViewPlaces places={[] as IPlacePreview[]} />
            </div>
        )
    }

    return null
}
