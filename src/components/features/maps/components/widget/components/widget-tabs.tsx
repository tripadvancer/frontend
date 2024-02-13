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

export const WidgetTabs = () => {
    const dispatch = useAppDispatch()
    const activeTab = useAppSelector(getWidgetActiveTab)
    const showOnlySavedPlaces = useAppSelector(getShowOnlySavedPlaces)

    const tabs = [
        { id: WidgetTabsEnum.ALL, caption: 'All places' },
        { id: WidgetTabsEnum.SAVED, caption: 'Saved' },
    ]

    const toggleShowPlaces = () => {
        dispatch(toggleShowOnlySavedPlaces())
    }

    return (
        <div className="flex items-center justify-between">
            <ul className="flex gap-x-4">
                {tabs.map(tab => (
                    <li
                        key={tab.id}
                        className={classNames('cursor-pointer text-big-bold text-blue-100', {
                            'border-b-2 border-black-100 !text-black-100': activeTab === tab.id,
                        })}
                        onClick={() => dispatch(setWidgetActiveTab(tab.id))}
                    >
                        {tab.caption}
                    </li>
                ))}
            </ul>

            {activeTab === WidgetTabsEnum.SAVED && (
                <div className="flex items-center gap-x-2">
                    Show only saved places
                    <FormSwitcher checked={showOnlySavedPlaces} onChange={toggleShowPlaces} />
                </div>
            )}
        </div>
    )
}
