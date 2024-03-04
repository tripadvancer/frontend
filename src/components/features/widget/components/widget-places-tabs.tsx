'use client'

import classNames from 'classnames'

import { FormSwitcher } from '@/components/ui/form-switcher'
import { closeMapPopups } from '@/redux/features/map-slice'
import {
    getWidgetState,
    setWidgetPlacesActiveTab,
    toggleWidgetPlacesShowOnlySavedPlaces,
} from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

type TabType = {
    id: WidgetTabsEnum
    caption: string
}

export const WidgetPLacesTabs = () => {
    const t = useI18n()
    const supertokens = useSupertokens()
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    const tabs: TabType[] = [
        { id: WidgetTabsEnum.ALL, caption: t('widget.places.all_places.title') },
        { id: WidgetTabsEnum.SAVED, caption: t('widget.places.saved_places.title') },
    ]

    const handleTabClick = (tab: TabType) => {
        dispatch(setWidgetPlacesActiveTab(tab.id))
        dispatch(closeMapPopups())
    }

    const handleShowOnlySavedPlacesChange = () => {
        dispatch(toggleWidgetPlacesShowOnlySavedPlaces())
        dispatch(closeMapPopups())
    }

    return (
        <div className="flex items-center justify-between">
            <ul className="flex gap-x-4">
                {tabs.map(tab => (
                    <li
                        key={tab.id}
                        className={classNames(
                            'hover-animated cursor-pointer text-big-bold text-blue-100 hover:text-blue-active',
                            {
                                'border-b-2 border-black-100 !text-black-100': widgetState.places.activeTab === tab.id,
                            },
                        )}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.caption}
                    </li>
                ))}
            </ul>

            {supertokens.isAuth && widgetState.places.activeList && (
                <div className="flex items-center gap-x-2">
                    <div onClick={() => dispatch(toggleWidgetPlacesShowOnlySavedPlaces())} className="cursor-pointer">
                        {t('widget.places.saved_places.show_on_the_map')}
                    </div>
                    <FormSwitcher
                        checked={widgetState.places.isShowOnlySavedPlaces}
                        onChange={handleShowOnlySavedPlacesChange}
                    />
                </div>
            )}
        </div>
    )
}
