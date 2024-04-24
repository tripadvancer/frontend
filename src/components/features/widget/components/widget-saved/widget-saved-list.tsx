'use client'

import { FormSwitcher } from '@/components/ui/form-switcher'
import { ArrowLeftIcon16 } from '@/components/ui/icons'
import { closeMapPopups } from '@/redux/features/map-slice'
import { getWidgetState, resetWidgetActiveList, toggleWidgetShowOnlySavedPlaces } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'

type WidgetSavedListProps = {
    children: React.ReactNode
    caption: string
    isAuth: boolean
}

export const WidgetSavedList = ({ children, caption, isAuth }: WidgetSavedListProps) => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

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
                    {caption}
                </div>

                {isAuth && widgetState.activeTab === WidgetTabsEnum.SAVED && widgetState.activeList && (
                    <div className="flex items-center gap-x-2">
                        <div onClick={() => dispatch(toggleWidgetShowOnlySavedPlaces())} className="cursor-pointer">
                            {t('widget.saved.lists.show_only_list')}
                        </div>
                        <FormSwitcher
                            checked={widgetState.isShowOnlySavedPlaces}
                            onChange={handleShowOnlySavedPlacesChange}
                        />
                    </div>
                )}
            </div>

            {children}
        </div>
    )
}
