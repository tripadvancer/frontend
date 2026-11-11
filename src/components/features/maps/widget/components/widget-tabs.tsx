'use client'

import classNames from 'classnames'

import { WidgetTabs as WidgetTabsEnum } from '@/utils/enums'
import { getWidgetState, setWidgetActiveTab } from '@/utils/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

type TabType = {
    id: WidgetTabsEnum
    caption: string
}

export const WidgetTabs = () => {
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    const tabs: TabType[] = [
        { id: WidgetTabsEnum.ALL, caption: 'All places' },
        { id: WidgetTabsEnum.SAVED, caption: 'Saved' },
    ]

    const handleTabClick = (tab: TabType) => {
        dispatch(setWidgetActiveTab(tab.id))
    }

    return (
        <ul className="flex gap-x-4">
            {tabs.map(tab => (
                <li
                    key={`widget-tab-${tab.id}`}
                    className={classNames(
                        'hover-animated cursor-pointer text-big-bold text-blue-100 hover:text-blue-active',
                        {
                            'border-b-2 border-black-100 !text-black-100': widgetState.activeTab === tab.id,
                        },
                    )}
                    onClick={() => handleTabClick(tab)}
                >
                    {tab.caption}
                </li>
            ))}
        </ul>
    )
}
