'use client'

import classNames from 'classnames'

import { getWidgetActiveTab, setWidgetActiveTab } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetTabsEnum } from '@/utils/enums'

export const WidgetTabs = () => {
    const dispath = useAppDispatch()
    const activeTab = useAppSelector(getWidgetActiveTab)

    const tabs = [
        { id: WidgetTabsEnum.ALL, caption: 'All places' },
        { id: WidgetTabsEnum.SAVED, caption: 'Saved' },
    ]

    return (
        <ul className="flex gap-x-4">
            {tabs.map(tab => (
                <li
                    key={`inline-tab-${tab.id}`}
                    className={classNames(
                        'cursor-pointer text-big-bold',
                        `${activeTab === tab.id ? 'border-b-2 border-black-100' : 'text-blue-100'}`,
                    )}
                    onClick={() => dispath(setWidgetActiveTab(tab.id))}
                >
                    {tab.caption}
                </li>
            ))}
        </ul>
    )
}
