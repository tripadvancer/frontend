'use client'

import classNames from 'classnames'

import { FormSwitcher } from '@/components/ui/form-switcher'
import {
    getShowOnlySavedPlaces,
    getWidgetActiveTab,
    setWidgetActiveTab,
    toggleShowOnlySavedPlaces,
} from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'

type TabType = {
    id: WidgetTabsEnum
    caption: string
    authRequired?: boolean
}

export const WidgetTabs = () => {
    const dispatch = useAppDispatch()
    const activeTab = useAppSelector(getWidgetActiveTab)
    const showOnlySavedPlaces = useAppSelector(getShowOnlySavedPlaces)

    const tabs: TabType[] = [
        { id: WidgetTabsEnum.ALL, caption: 'All places' },
        { id: WidgetTabsEnum.SAVED, caption: 'Saved', authRequired: true },
    ]

    const toggleShowPlaces = () => {
        dispatch(toggleShowOnlySavedPlaces())
    }

    const handleTabClick = (tab: TabType) => {
        dispatch(setWidgetActiveTab(tab.id))
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
                                'border-b-2 border-black-100 !text-black-100': activeTab === tab.id,
                            },
                        )}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.caption}
                    </li>
                ))}
            </ul>

            {activeTab === WidgetTabsEnum.SAVED && (
                <div className="flex items-center gap-x-2">
                    <div onClick={toggleShowPlaces} className="cursor-pointer">
                        Show on the map
                    </div>
                    <FormSwitcher checked={showOnlySavedPlaces} onChange={toggleShowPlaces} />
                </div>
            )}
        </div>
    )
}
